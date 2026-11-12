"""Offline regression tests for the downloadable CSV import example."""

import csv
import gzip
import hashlib
import importlib.util
import io
from pathlib import Path
import sqlite3
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location("csv_example", ROOT / "public/examples/import-csc-csv.py")
EXAMPLE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(EXAMPLE)


class CsvImportTests(unittest.TestCase):
    """Exercise real SQLite constraints and publication against temporary CSV inputs."""

    def setUp(self):
        """Create a small Unicode fixture with a quoted name and a valid null state."""
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        self.output = self.directory / "locations.sqlite"
        self.rows = {
            "countries.csv": [["id", "name", "iso2"], [101, "India", "IN"], [244, "Western Sahara", "EH"]],
            "states.csv": [["id", "name", "country_id", "iso2"], [4008, "Maharashtra", 101, "MH"]],
            "cities.csv.gz": [["id", "name", "country_id", "state_id"], [133024, 'मुंबई, "Mumbai"', 101, 4008], [67127, "Gueltat Zemmour", 244, ""]],
        }

    def write_fixtures(self):
        """Pin fixture checksums so data-quality tests reach the CSV and SQL boundaries."""
        files = {}
        for name, rows in self.rows.items():
            text = io.StringIO(newline="")
            csv.writer(text).writerows(rows)
            data = text.getvalue().encode("utf-8-sig")
            if name.endswith(".gz"):
                data = gzip.compress(data)
            (self.directory / name).write_bytes(data)
            files[name] = (len(data), hashlib.sha256(data).hexdigest())
        return patch.object(EXAMPLE, "FILES", files)

    def test_unicode_null_links_and_queries(self):
        """Preserve names and IDs, retain null-state rows, and run the shipped SQL."""
        with self.write_fixtures():
            counts = EXAMPLE.import_csv(self.directory, self.output)
        self.assertEqual(counts["cities"], 2)
        self.assertEqual(counts["cities_without_state"], 1)
        with sqlite3.connect(self.output) as db:
            self.assertEqual(db.execute("SELECT name FROM cities WHERE id = 133024").fetchone()[0], 'मुंबई, "Mumbai"')
            self.assertIsNone(db.execute("SELECT state_id FROM cities WHERE id = 67127").fetchone()[0])
            self.assertEqual(db.execute("SELECT COUNT(*) FROM cities c LEFT JOIN states s ON s.id=c.state_id AND s.country_id=c.country_id").fetchone()[0], 2)
            self.assertEqual(db.execute("SELECT COUNT(*) FROM cities c JOIN states s ON s.id=c.state_id AND s.country_id=c.country_id").fetchone()[0], 1)
            db.executescript((ROOT / "public/examples/csc-location-queries.sql").read_text())
            self.assertEqual(db.execute("SELECT release FROM import_info").fetchone()[0], EXAMPLE.RELEASE)

    def test_existing_destination_is_preserved(self):
        """Never overwrite an existing database or unrelated destination file."""
        self.output.write_bytes(b"keep this file")
        with self.assertRaises(FileExistsError):
            EXAMPLE.import_csv(self.directory, self.output)
        self.assertEqual(self.output.read_bytes(), b"keep this file")

    def test_dangling_destination_symlink_is_preserved(self):
        """Do not follow an existing dangling output symlink to create an unexpected file."""
        target = self.directory / "elsewhere.sqlite"
        self.output.symlink_to(target)
        with self.assertRaises(FileExistsError):
            EXAMPLE.import_csv(self.directory, self.output)
        self.assertTrue(self.output.is_symlink())
        self.assertFalse(target.exists())

    def test_destination_created_during_import_is_preserved(self):
        """An output created after the precondition check must also remain untouched."""
        real_link = EXAMPLE.os.link

        def competing_output(source, destination):
            """Simulate another importer publishing to the same destination first."""
            self.output.write_bytes(b"another import finished first")
            return real_link(source, destination)

        with self.write_fixtures(), patch.object(EXAMPLE.os, "link", side_effect=competing_output):
            with self.assertRaises(FileExistsError):
                EXAMPLE.import_csv(self.directory, self.output)
        self.assertEqual(self.output.read_bytes(), b"another import finished first")
        self.assertEqual(list(self.directory.glob(".csc-import-*")), [])

    def test_checksum_mismatch_never_publishes(self):
        """Reject changed source bytes before constructing a database."""
        with self.write_fixtures():
            (self.directory / "countries.csv").write_bytes(b"changed")
            with self.assertRaisesRegex(ValueError, "SHA-256 mismatch"):
                EXAMPLE.import_csv(self.directory, self.output)
        self.assertFalse(self.output.exists())

    def test_bad_relationships_and_duplicate_ids_never_publish(self):
        """Reject orphan countries, orphan states, cross-country states and duplicate IDs."""
        for row in [[999, "Bad country", 999, ""], [999, "Bad state", 101, 999],
                    [999, "Wrong country", 244, 4008], [133024, "Duplicate", 101, 4008]]:
            with self.subTest(row=row):
                self.rows["cities.csv.gz"] = self.rows["cities.csv.gz"][:3] + [row]
                with self.write_fixtures(), self.assertRaisesRegex(ValueError, "constraint failed"):
                    EXAMPLE.import_csv(self.directory, self.output)
                self.assertFalse(self.output.exists())
                self.assertEqual(list(self.directory.glob(".csc-import-*")), [])

    def test_invalid_identifiers_and_headers_never_publish(self):
        """Malformed IDs and missing/duplicate CSV headers must fail without partial output."""
        for value in ["", "0", "-1", "1.5", "1;DROP TABLE cities", str(2**63)]:
            with self.subTest(value=value):
                self.rows["cities.csv.gz"][1][0] = value
                with self.write_fixtures(), self.assertRaisesRegex(ValueError, "invalid id"):
                    EXAMPLE.import_csv(self.directory, self.output)
                self.assertFalse(self.output.exists())
        for header in [["id", "name", "country_id"], ["id", "id", "country_id", "state_id"]]:
            self.rows["cities.csv.gz"][0] = header
            with self.write_fixtures(), self.assertRaisesRegex(ValueError, "headers"):
                EXAMPLE.import_csv(self.directory, self.output)
            self.assertFalse(self.output.exists())


if __name__ == "__main__":
    unittest.main()

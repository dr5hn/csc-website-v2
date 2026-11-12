#!/usr/bin/env python3
"""Import a verified CSC CSV snapshot into a new, local SQLite projection."""

import argparse
import csv
import gzip
import hashlib
import io
import json
import os
from pathlib import Path
import re
import sqlite3
import tempfile

RELEASE = "v5.2.0-export.1"
SOURCE_COMMIT = "9b255c45fc53e02a8dff547d88558d4fe91784d5"
# File sizes bound reads; hashes verify the exact bytes that the CSV parser uses.
FILES = {
    "countries.csv": (108781, "64af092ba77e0b53324c29a264c50fbeb9e8d5210db99d7a98c834d68e89a1e1"),
    "states.csv": (665924, "86606b87ede32f867898a343197c1374c4ed9a1692ee24dcc214739451cbbf3c"),
    "cities.csv.gz": (5099371, "1721f5b70527fb712777fb1915da42795a3c0d3855f9c055276c6d9b889ec3ac"),
}
SCHEMA = """
CREATE TABLE countries (
  id INTEGER PRIMARY KEY CHECK (id > 0), name TEXT NOT NULL,
  iso2 TEXT NOT NULL UNIQUE CHECK (iso2 GLOB '[A-Z][A-Z]')
);
CREATE TABLE states (
  id INTEGER PRIMARY KEY CHECK (id > 0), name TEXT NOT NULL,
  country_id INTEGER NOT NULL REFERENCES countries(id), iso2 TEXT NOT NULL,
  UNIQUE (id, country_id), UNIQUE (country_id, iso2)
);
CREATE TABLE cities (
  id INTEGER PRIMARY KEY CHECK (id > 0), name TEXT NOT NULL,
  country_id INTEGER NOT NULL REFERENCES countries(id), state_id INTEGER,
  FOREIGN KEY (state_id, country_id) REFERENCES states(id, country_id)
);
CREATE INDEX states_country ON states(country_id);
CREATE INDEX cities_country_state ON cities(country_id, state_id);
CREATE TABLE import_info (release TEXT NOT NULL, source_commit TEXT NOT NULL);
"""


def verified_files(directory):
    """Read only the expected size and verify each source before parsing any CSV."""
    result = {}
    for name, (size, digest) in FILES.items():
        with (directory / name).open("rb") as handle:
            content = handle.read(size + 1)
        if len(content) != size or hashlib.sha256(content).hexdigest() != digest:
            raise ValueError(f"{name}: size or SHA-256 mismatch; use the pinned source")
        result[name] = content
    return result


def csv_rows(content, filename, columns, nullable=()):
    """Parse UTF-8 CSV safely, preserving names and converting only identifier fields."""
    binary = io.BytesIO(content)
    if filename.endswith(".gz"):
        binary = gzip.GzipFile(fileobj=binary)
    with io.TextIOWrapper(binary, encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle, strict=True)
        fields = reader.fieldnames or []
        if len(fields) != len(set(fields)) or not set(columns).issubset(fields):
            raise ValueError(f"{filename}: missing or duplicate CSV headers")
        for row in reader:
            if None in row or any(value is None for value in row.values()):
                raise ValueError(f"{filename}: malformed CSV row {reader.line_num}")
            values = []
            for column in columns:
                value = row[column]
                if column == "id" or column.endswith("_id"):
                    if not value and column in nullable:
                        values.append(None)
                    elif re.fullmatch(r"[0-9]+", value) and 0 < int(value) < 2**63:
                        values.append(int(value))
                    else:
                        raise ValueError(f"{filename}: invalid {column} at row {reader.line_num}")
                elif not value.strip() or "\x00" in value:
                    raise ValueError(f"{filename}: empty or invalid {column} at row {reader.line_num}")
                else:
                    values.append(value)
            yield tuple(values)


def import_csv(directory, output):
    """Build privately, enforce relationships, then publish without replacing an existing file."""
    directory, output = Path(directory), Path(output).absolute()
    if output.exists() or output.is_symlink():
        raise FileExistsError(f"Destination already exists: {output}")
    sources = verified_files(directory)
    with tempfile.TemporaryDirectory(prefix=".csc-import-", dir=output.parent) as work:
        database = Path(work) / "locations.sqlite"
        connection = sqlite3.connect(database)
        try:
            connection.execute("PRAGMA foreign_keys = ON")
            if connection.execute("PRAGMA foreign_keys").fetchone() != (1,):
                raise RuntimeError("SQLite foreign-key enforcement is unavailable")
            connection.executescript(SCHEMA)
            with connection:
                # Parent tables first. SQL identifiers are fixed; CSV values are bound parameters.
                for name, columns, statement, nullable in [
                    ("countries.csv", ("id", "name", "iso2"), "INSERT INTO countries VALUES (?, ?, ?)", ()),
                    ("states.csv", ("id", "name", "country_id", "iso2"), "INSERT INTO states VALUES (?, ?, ?, ?)", ()),
                    ("cities.csv.gz", ("id", "name", "country_id", "state_id"), "INSERT INTO cities VALUES (?, ?, ?, ?)", ("state_id",)),
                ]:
                    try:
                        connection.executemany(statement, csv_rows(sources[name], name, columns, nullable))
                    except sqlite3.IntegrityError as error:
                        raise ValueError(f"{name}: key or relationship constraint failed: {error}") from error
                connection.execute("INSERT INTO import_info VALUES (?, ?)", (RELEASE, SOURCE_COMMIT))
                if connection.execute("PRAGMA foreign_key_check").fetchall():
                    raise ValueError("Foreign-key verification failed")
            counts = {table: connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
                      for table in ("countries", "states", "cities")}
            counts["cities_without_state"] = connection.execute("SELECT COUNT(*) FROM cities WHERE state_id IS NULL").fetchone()[0]
        finally:
            connection.close()
        os.chmod(database, 0o600)
        # A same-filesystem hard link publishes atomically and fails if output now exists.
        os.link(database, output)
    return {"release": RELEASE, **counts}


def main():
    """Run the local import; report a specific failure without publishing a partial database."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path, help="Directory containing the three pinned CSV files")
    parser.add_argument("output", type=Path, help="New SQLite file; existing files are never replaced")
    args = parser.parse_args()
    try:
        print(json.dumps(import_csv(args.directory, args.output), indent=2))
    except (OSError, ValueError, RuntimeError, csv.Error, sqlite3.Error) as error:
        parser.exit(1, f"Import failed: {error}\n")


if __name__ == "__main__":
    main()

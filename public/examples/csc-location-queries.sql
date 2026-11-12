PRAGMA foreign_keys = ON;

-- Keep cities that have no state. This join returns one row per imported city.
SELECT city.id, city.name AS city, state.name AS state, country.name AS country
FROM cities AS city
JOIN countries AS country ON country.id = city.country_id
LEFT JOIN states AS state
  ON state.id = city.state_id AND state.country_id = city.country_id
ORDER BY city.id
LIMIT 10;

-- Country + state lookup: codes are scoped by country, names are not unique keys.
SELECT city.id, city.name
FROM cities AS city
JOIN countries AS country ON country.id = city.country_id
JOIN states AS state
  ON state.id = city.state_id AND state.country_id = city.country_id
WHERE country.iso2 = 'IN' AND state.iso2 = 'MH' AND city.name = 'Mumbai';

-- These rows are valid records, not broken foreign keys.
SELECT id, name, country_id FROM cities WHERE state_id IS NULL ORDER BY id;

-- No rows means every non-null relationship is valid.
PRAGMA foreign_key_check;

-- Identify the pinned snapshot represented by this database.
SELECT release, source_commit FROM import_info;

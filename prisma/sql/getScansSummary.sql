-- These are equivalent SQL statements but the second one is
-- slightly faster (at least with small amounts of data) and
-- definitely "cleaner" looking.  If we end up with performance
-- problems, we can look at using the first one.

-- SELECT
--    "Target"."name"          AS name,
--    "Target"."root"          AS path,   
--    "Scan"."matches"         AS matches,
--    "Scan"."start_time"      AS start_time,
--    "Scan"."end_time"        AS end_time,
--    "Scan"."gigs_per_second" AS gigs_per_second, 
--    (SELECT COUNT(*) AS count FROM "ScanError" WHERE "scanId" = "Scan".id)  AS error_count
-- FROM "Scan"
-- JOIN (
--    SELECT "Scan".id AS scan_id
--    FROM "Scan"
--    INNER JOIN (SELECT MAX("targeted_date") AS tdate FROM "Scan" GROUP BY "targetId") newest_scan
--    ON "Scan".targeted_date = newest_scan.tdate
-- ) s
-- ON s.scan_id = "Scan".id
-- INNER JOIN "Target" ON "Scan"."targetId" = "Target".id

SELECT 
   t.name AS name,
   t.root AS path,
   s.matches AS matches,
   s.start_time AS start_time,
   s.end_time as end_time,
   s.gigs_per_second AS gigs_per_second,
   (SELECT COUNT(*) AS count FROM "ScanError" WHERE "scanId" = s.id) AS error_count
FROM "Target" t
LEFT JOIN 
    (SELECT *, row_number() OVER (PARTITION BY "targetId" ORDER BY targeted_date DESC) rn FROM "Scan") s
ON t.id = s."targetId" AND rn = 1
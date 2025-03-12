-- These are equivalent SQL statements but the second one is
-- slightly faster (at least with small amounts of data) and
-- definitely "cleaner" looking.  If we end up with performance
-- problems, we can look at using the first one.

-- SELECT COUNT(DISTINCT "hash") AS count
-- FROM "ScanResult"
-- JOIN (
--     SELECT "Scan".id AS scan_id
--     FROM "Scan"
--     INNER JOIN (
--         SELECT MAX("end_time") AS "end_time" FROM "Scan" GROUP BY "targetId" 
--     ) newest_scan
--     ON "Scan".end_time = newest_scan.end_time
-- ) s
-- ON s.scan_id = "ScanResult"."scanId"
-- WHERE NOT "confidence" = 'NONE'

SELECT COUNT(DISTINCT("hash")) AS count
FROM "ScanResult"
INNER JOIN (SELECT id, row_number() OVER (PARTITION BY "targetId" ORDER BY targeted_date DESC) rn FROM "Scan") s
ON rn = 1 AND "ScanResult"."scanId" = s.id
WHERE NOT "confidence" = 'NONE'
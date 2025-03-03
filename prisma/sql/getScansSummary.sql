SELECT
   "Agent"."name"           AS name,
   "Scan"."root_path"       AS path,
   "Scan"."matches"         AS matches,
   "Scan"."start_time"      AS start_time,
   "Scan"."end_time"        AS end_time,
   "Scan"."gigs_per_second" AS gigs_per_second, 
   (SELECT COUNT(*) AS count FROM "ScanError" WHERE "scanId" = "Scan"."id")  AS error_count
FROM "Scan"
JOIN (
   SELECT "Scan".id AS scan_id
   FROM "Scan"
   INNER JOIN (SELECT MAX("end_time") AS "end_time" FROM "Scan" GROUP BY "agentId") newest_scan
   ON "Scan".end_time = newest_scan.end_time
) c
ON c."scan_id" = "Scan"."id"
INNER JOIN "Agent" ON "Agent"."id" = "Scan"."agentId"
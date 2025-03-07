SELECT
   "Agent"."name"           AS name,
   "Target"."roots"         AS paths,   
   "Scan"."matches"         AS matches,
   "Scan"."start_time"      AS start_time,
   "Scan"."end_time"        AS end_time,
   "Scan"."gigs_per_second" AS gigs_per_second, 
   (SELECT COUNT(*) AS count FROM "ScanError" WHERE "scanId" = "Scan"."id")  AS error_count
FROM "Scan"
JOIN (
   SELECT "Scan".id AS scan_id
   FROM "Scan"
   INNER JOIN (SELECT MAX("end_time") AS "end_time" FROM "Scan" GROUP BY "targetId") newest_scan
   ON "Scan".end_time = newest_scan.end_time
) c
ON c."scan_id" = "Scan"."id"
INNER JOIN "Target" ON "Scan"."targetId" = "Target"."id"
INNER JOIN "Agent"  ON "Agent"."id" = "Target"."agentId"
    SELECT "Agent"."name" AS name, "Agent"."path" AS path, "Scan"."matches" AS matches,
           "Scan"."start_time" AS start_time, "Scan"."end_time" AS end_time, "Scan"."gigs_per_second" AS gigs_per_second, 
         (
            SELECT COUNT(*) AS count FROM "ScanError" WHERE "scanId" = "Scan"."id"
         )  AS error_count
      FROM "Scan" 
INNER JOIN "Agent" ON "Agent"."id" = "Scan"."agentId"
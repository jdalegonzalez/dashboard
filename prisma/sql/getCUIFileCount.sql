SELECT COUNT(DISTINCT "hash") AS count
FROM "ScanResult"
JOIN (
    SELECT "Scan".id AS scan_id
    FROM "Scan"
    INNER JOIN (
        SELECT MAX("end_time") AS "end_time" FROM "Scan" GROUP BY "targetId" 
    ) newest_scan
    ON "Scan".end_time = newest_scan.end_time
) s
ON s.scan_id = "ScanResult"."scanId"
WHERE NOT "confidence" = 'NONE'

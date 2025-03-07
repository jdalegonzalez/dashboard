SELECT SUM(CARDINALITY(unsupported_files)) AS count 
FROM "Crawl"
JOIN (
    SELECT "Crawl".id AS crawl_id
    FROM "Crawl"
    INNER JOIN (
        SELECT MAX("end_time") AS "end_time" FROM "Crawl" GROUP BY "targetId" 
    ) newest_crawl
    ON "Crawl".end_time = newest_crawl.end_time
) c
ON c.crawl_id = "Crawl".id

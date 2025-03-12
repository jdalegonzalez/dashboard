-- These are equivalent SQL statements but the second one is
-- slightly faster (at least with small amounts of data) and
-- definitely "cleaner" looking.  If we end up with performance
-- problems, we can look at using the first one.

-- SELECT SUM(CARDINALITY(unsupported_files)) AS count 
-- FROM "Crawl"
-- JOIN (
--     SELECT "Crawl".id AS crawl_id
--     FROM "Crawl"
--     INNER JOIN (
--         SELECT MAX("end_time") AS "end_time" FROM "Crawl" GROUP BY "targetId" 
--     ) newest_crawl
--     ON "Crawl".end_time = newest_crawl.end_time
-- ) c
-- ON c.crawl_id = "Crawl".id

SELECT SUM(CARDINALITY(unsupported_files)) AS count 
FROM "Crawl"
INNER JOIN (SELECT id, row_number() OVER (PARTITION BY "targetId" ORDER BY targeted_date DESC) rn FROM "Crawl") c
ON rn = 1 AND "Crawl".id = c.id

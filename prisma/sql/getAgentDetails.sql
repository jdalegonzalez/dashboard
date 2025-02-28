SELECT 
           "Agent"."id" AS "agent_id",
           "Agent"."name",
           "Agent"."location",
           "Agent"."path",
           "Agent"."directory",
           "Agent"."use_history",
           "Agent"."status",
           "Scan"."id" AS "scan_id",
           "Scan"."root_path",
           "Scan"."start_time" AS "scan_start_time",
           "Scan"."end_time" AS "scan_end_time",
           "Scan"."matches",
           "Scan"."timeouts",
           "Scan"."gigs_per_second",
           (SELECT COUNT(*) FROM "ScanError" WHERE "Scan"."id" = "ScanError"."scanId")::INT AS "scan_errors", 
           (SELECT COUNT(*) FROM "CrawlError" WHERE "Crawl"."id" = "CrawlError"."crawlId")::INT AS "crawl_errors",
           "Crawl"."id" AS "crawl_id",
           "Crawl"."created_at",
           "Crawl"."updated_at",
           "Crawl"."root_path",
           "Crawl"."file_count",
           "Crawl"."dir_count",
           "Crawl"."total_size",
           "Crawl"."scan_size",
           "Crawl"."largest_file_size",
           "Crawl"."largest_file_path",
           "Crawl"."start_time" AS "crawl_start_time",
           "Crawl"."end_time" AS "crawl_end_time",
           "Crawl"."throughput"
FROM       "Agent" 
INNER JOIN "Scan" ON "Agent"."id" = "Scan"."agentId"
INNER JOIN "Crawl" ON "Agent"."id" = "Crawl"."agentId"
WHERE "Agent"."id" = $1 OR $1 = '';

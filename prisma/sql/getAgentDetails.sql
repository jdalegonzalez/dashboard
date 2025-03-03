SELECT 
    "Agent"."id" AS "agent_id",
    name,
    location,
    status,
    arch,
    cores,
    logical_cpus,
    os,
    os_version,
    processor,
    ram_gb,
    scan_id,
    scan_root_path,
    scan_start_time,
    scan_end_time,
    matches,
    timeouts,
    gigs_per_second,
    scan_errors,
    crawl_id,
    crawl_root_path,
    crawl_start_time,
    crawl_end_time,
    use_history,
    file_count,
    dir_count,
    total_size,
    scan_size AS crawl_scan_size,
    largest_file_size,
    largest_file_path,
    throughput
FROM "Agent" 
JOIN (
    SELECT
        "Scan".id            AS scan_id,
        "Scan".root_path     AS scan_root_path,
        "Scan".result_folder AS scan_folder,
        "Scan".start_time    AS scan_start_time,
        "Scan".end_time      AS scan_end_time,
        "Scan".matches,
        "Scan".timeouts,
        "Scan".gigs_per_second,
        "Scan"."agentId",
        (SELECT COUNT(*) FROM "ScanError" WHERE "Scan"."id" = "ScanError"."scanId")::INT AS scan_errors
    FROM "Scan"
    INNER JOIN (
        SELECT MAX("end_time") AS "end_time" FROM "Scan" GROUP BY "agentId" 
    ) newest_scan
    ON "Scan".end_time = newest_scan.end_time
) s 
ON s."agentId" = "Agent".id
JOIN (
    SELECT
        "Crawl".id            AS crawl_id,
        "Crawl".root_path     AS crawl_root_path,
        "Crawl".result_folder AS crawl_folder,
        "Crawl".start_time    AS crawl_start_time,
        "Crawl".end_time      AS crawl_end_time,
        "Crawl".use_history,
        "Crawl"."file_count",
        "Crawl"."dir_count",
        "Crawl"."total_size",
        "Crawl"."scan_size",
        "Crawl"."largest_file_size",
        "Crawl"."largest_file_path",
        "Crawl"."throughput",
        "Crawl"."agentId",
        (SELECT COUNT(*) FROM "CrawlError" WHERE "Crawl"."id" = "CrawlError"."crawlId")::INT AS crawl_errors
    FROM "Crawl"
    INNER JOIN (
        SELECT MAX("end_time") AS "end_time" FROM "Crawl" GROUP BY "agentId" 
    ) newest_crawl
    ON "Crawl".end_time = newest_crawl.end_time
) c 
ON c."agentId" = "Agent".id
WHERE "Agent"."id" = $1 OR $1 = ''
;
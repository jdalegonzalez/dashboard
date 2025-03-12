SELECT 
    t.id,
    t.name,
    root,
    skip_completed,
    max_workers,
    mem_thresh,
    t.use_history,
    default_timeout,
    s.id AS scan_id,
    s.root_path AS scan_root_path,
    s.start_time AS scan_start_time,
    s.end_time AS scan_end_time,
    matches,
    timeouts,
    gigs_per_second,
    (SELECT COUNT(*) FROM "ScanError" WHERE s."id" = "ScanError"."scanId")::INT AS scan_errors,
    c.id AS crawl_id,
    c.root_path AS crawl_root_path,
    c.start_time AS crawl_start_time,
    c.end_time AS crawl_end_time,
    file_count,
    dir_count,
    total_size,
    scan_size AS crawl_scan_size,
    largest_file_size,
    largest_file_path,
    throughput,
    c.use_history AS crawl_used_history,
    (SELECT COUNT(*) FROM "CrawlError" WHERE c."id" = "CrawlError"."crawlId")::INT AS crawl_errors
FROM "Target" t
LEFT JOIN 
    (SELECT *, row_number() OVER (PARTITION BY "targetId" ORDER BY targeted_date DESC) rn FROM "Crawl") c
ON t.id = c."targetId" AND rn = 1
LEFT JOIN "Scan" s ON s."targetId" = t.id AND s.result_folder = c.result_folder
WHERE t."id" = $1 OR $1 = ''
"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.getTotalFileCount = /*#__PURE__*/ $mkFactory("SELECT SUM(CARDINALITY(file_paths)) AS count\nFROM \"CrawlHash\"\nJOIN (\nSELECT \"Crawl\".id AS crawl_id\nFROM \"Crawl\"\nINNER JOIN (\nSELECT MAX(\"end_time\") AS \"end_time\" FROM \"Crawl\" GROUP BY \"agentId\"\n) newest_crawl\nON \"Crawl\".end_time = newest_crawl.end_time\n) c\nON c.crawl_id = \"CrawlHash\".\"crawlId\"")

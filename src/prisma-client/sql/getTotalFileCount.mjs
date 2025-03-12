import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const getTotalFileCount = /*#__PURE__*/ $mkFactory("\n\nSELECT SUM(CARDINALITY(file_paths)) AS count\nFROM \"CrawlHash\"\nINNER JOIN (SELECT id, row_number() OVER (PARTITION BY \"targetId\" ORDER BY targeted_date DESC) rn FROM \"Crawl\") c\nON rn = 1 AND \"CrawlHash\".\"crawlId\" = c.id")

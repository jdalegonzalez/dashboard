import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const getDeDuplicateFileCount = /*#__PURE__*/ $mkFactory("\n\nSELECT COUNT(DISTINCT(\"hash\")) AS count\nFROM \"CrawlHash\"\nINNER JOIN (SELECT id, row_number() OVER (PARTITION BY \"targetId\" ORDER BY targeted_date DESC) rn FROM \"Crawl\") c\nON rn = 1 AND \"CrawlHash\".\"crawlId\" = c.id")

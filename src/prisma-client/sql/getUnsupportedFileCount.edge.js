"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.getUnsupportedFileCount = /*#__PURE__*/ $mkFactory("\n\nSELECT SUM(CARDINALITY(unsupported_files)) AS count\nFROM \"Crawl\"\nINNER JOIN (SELECT id, row_number() OVER (PARTITION BY \"targetId\" ORDER BY targeted_date DESC) rn FROM \"Crawl\") c\nON rn = 1 AND \"Crawl\".id = c.id")

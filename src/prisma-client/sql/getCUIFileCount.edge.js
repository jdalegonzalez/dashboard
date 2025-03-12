"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.getCUIFileCount = /*#__PURE__*/ $mkFactory("\n\nSELECT COUNT(DISTINCT(\"hash\")) AS count\nFROM \"ScanResult\"\nINNER JOIN (SELECT id, row_number() OVER (PARTITION BY \"targetId\" ORDER BY targeted_date DESC) rn FROM \"Scan\") s\nON rn = 1 AND \"ScanResult\".\"scanId\" = s.id\nWHERE NOT \"confidence\" = 'NONE'")

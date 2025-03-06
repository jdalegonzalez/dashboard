"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.getCUIFileCount = /*#__PURE__*/ $mkFactory("SELECT COUNT(DISTINCT \"hash\") AS count\nFROM \"ScanResult\"\nJOIN (\nSELECT \"Scan\".id AS scan_id\nFROM \"Scan\"\nINNER JOIN (\nSELECT MAX(\"end_time\") AS \"end_time\" FROM \"Scan\" GROUP BY \"agentId\"\n) newest_scan\nON \"Scan\".end_time = newest_scan.end_time\n) s\nON s.scan_id = \"ScanResult\".\"scanId\"\nWHERE NOT \"confidence\" = 'NONE'")

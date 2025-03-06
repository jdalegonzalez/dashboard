import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const getScansSummary = /*#__PURE__*/ $mkFactory("SELECT\n\"Agent\".\"name\"           AS name,\n\"Scan\".\"root_path\"       AS path,\n\"Scan\".\"matches\"         AS matches,\n\"Scan\".\"start_time\"      AS start_time,\n\"Scan\".\"end_time\"        AS end_time,\n\"Scan\".\"gigs_per_second\" AS gigs_per_second,\n(SELECT COUNT(*) AS count FROM \"ScanError\" WHERE \"scanId\" = \"Scan\".\"id\")  AS error_count\nFROM \"Scan\"\nJOIN (\nSELECT \"Scan\".id AS scan_id\nFROM \"Scan\"\nINNER JOIN (SELECT MAX(\"end_time\") AS \"end_time\" FROM \"Scan\" GROUP BY \"agentId\") newest_scan\nON \"Scan\".end_time = newest_scan.end_time\n) c\nON c.\"scan_id\" = \"Scan\".\"id\"\nINNER JOIN \"Agent\" ON \"Agent\".\"id\" = \"Scan\".\"agentId\"")

"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.getScansSummary = /*#__PURE__*/ $mkFactory("\n\nSELECT\nt.name AS name,\nt.root AS path,\ns.matches AS matches,\ns.start_time AS start_time,\ns.end_time as end_time,\ns.gigs_per_second AS gigs_per_second,\n(SELECT COUNT(*) AS count FROM \"ScanError\" WHERE \"scanId\" = s.id) AS error_count\nFROM \"Target\" t\nLEFT JOIN\n(SELECT *, row_number() OVER (PARTITION BY \"targetId\" ORDER BY targeted_date DESC) rn FROM \"Scan\") s\nON t.id = s.\"targetId\" AND rn = 1")

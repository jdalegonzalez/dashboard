"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.getTargetsForAgent = /*#__PURE__*/ $mkFactory("SELECT id, name FROM \"Target\"\nJOIN \"AgentsToTarget\" art ON art.\"targetId\" = \"Target\".id\nWHERE art.\"agentId\" = $1 OR $1 = ''")

"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.getAgentsForTarget = /*#__PURE__*/ $mkFactory("SELECT id, name FROM \"Agent\"\nJOIN \"AgentsToTarget\" art ON art.\"agentId\" = \"Agent\".id\nWHERE art.\"targetId\" = $1 OR $1 = ''")

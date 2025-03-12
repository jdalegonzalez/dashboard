import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const getAgentsForTarget = /*#__PURE__*/ $mkFactory("SELECT id, name FROM \"Agent\"\nJOIN \"AgentsToTarget\" art ON art.\"agentId\" = \"Agent\".id\nWHERE art.\"targetId\" = $1 OR $1 = ''")

SELECT id, name FROM "Agent"
JOIN "AgentsToTarget" art ON art."agentId" = "Agent".id
WHERE art."targetId" = $1 OR $1 = ''
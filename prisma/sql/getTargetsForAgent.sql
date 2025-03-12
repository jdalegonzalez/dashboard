SELECT id, name FROM "Target"
JOIN "AgentsToTarget" art ON art."targetId" = "Target".id
WHERE art."agentId" = $1 OR $1 = ''
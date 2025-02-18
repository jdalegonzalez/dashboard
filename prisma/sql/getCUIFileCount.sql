SELECT COUNT(DISTINCT "hash") AS count
FROM "ScanResult"
WHERE NOT "confidence" = 'NONE'

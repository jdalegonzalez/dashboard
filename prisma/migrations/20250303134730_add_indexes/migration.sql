-- CreateIndex
CREATE INDEX "Crawl_end_time_agentId_idx" ON "Crawl"("end_time", "agentId");

-- CreateIndex
CREATE INDEX "Scan_end_time_agentId_idx" ON "Scan"("end_time", "agentId");

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CRAWLING', 'SCANNING', 'IDLE', 'ERRORED', 'MISSING', 'PENDING', 'STOPPED');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('HINT', 'WARNING', 'ERROR', 'FATAL');

-- CreateEnum
CREATE TYPE "Confidence" AS ENUM ('HIGH', 'MEDIUM', 'LOW', 'NONE');

-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roots" TEXT[],
    "skip_completed" BOOLEAN NOT NULL,
    "max_workers" INTEGER NOT NULL,
    "mem_thresh" INTEGER NOT NULL,
    "use_history" BOOLEAN NOT NULL,
    "default_timeout" INTEGER NOT NULL,
    "agentId" TEXT NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'IDLE',
    "os" TEXT NOT NULL,
    "os_version" TEXT NOT NULL,
    "arch" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "cores" INTEGER NOT NULL,
    "logical_cpus" INTEGER NOT NULL,
    "ram_gb" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crawl" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targeted_date" TIMESTAMP(3) NOT NULL,
    "result_folder" TEXT NOT NULL,
    "root_path" TEXT NOT NULL,
    "use_history" BOOLEAN NOT NULL DEFAULT true,
    "file_count" INTEGER NOT NULL,
    "dir_count" INTEGER NOT NULL,
    "total_size" BIGINT NOT NULL,
    "scan_size" BIGINT NOT NULL,
    "largest_file_size" BIGINT NOT NULL,
    "largest_file_path" TEXT NOT NULL,
    "extensions" TEXT[],
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "throughput" DOUBLE PRECISION NOT NULL,
    "unsupported_files" TEXT[],
    "targetId" TEXT NOT NULL,

    CONSTRAINT "Crawl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrawlError" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error_name" TEXT NOT NULL,
    "error_desc" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "crawlId" TEXT NOT NULL,

    CONSTRAINT "CrawlError_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrawlHash" (
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_paths" TEXT[],
    "bsize" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "crawlId" TEXT NOT NULL,

    CONSTRAINT "CrawlHash_pkey" PRIMARY KEY ("crawlId","hash")
);

-- CreateTable
CREATE TABLE "Scan" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targeted_date" TIMESTAMP(3) NOT NULL,
    "result_folder" TEXT NOT NULL,
    "root_path" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "matches" INTEGER NOT NULL,
    "timeouts" INTEGER NOT NULL,
    "gigs_per_second" DOUBLE PRECISION NOT NULL,
    "targetId" TEXT NOT NULL,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanError" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "severity" "Severity" NOT NULL,
    "error_name" TEXT NOT NULL,
    "error_desc" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,

    CONSTRAINT "ScanError_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanResult" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "bsize" INTEGER NOT NULL,
    "processed" BOOLEAN NOT NULL,
    "errored" BOOLEAN NOT NULL,
    "match" TEXT[],
    "confidence" "Confidence" NOT NULL,
    "scanId" TEXT NOT NULL,

    CONSTRAINT "ScanResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Target_agentId_roots_key" ON "Target"("agentId", "roots");

-- CreateIndex
CREATE INDEX "Crawl_updated_at_idx" ON "Crawl"("updated_at");

-- CreateIndex
CREATE INDEX "Crawl_result_folder_targetId_idx" ON "Crawl"("result_folder", "targetId");

-- CreateIndex
CREATE INDEX "Crawl_end_time_targetId_idx" ON "Crawl"("end_time", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "Crawl_targetId_result_folder_key" ON "Crawl"("targetId", "result_folder");

-- CreateIndex
CREATE INDEX "Scan_updated_at_idx" ON "Scan"("updated_at");

-- CreateIndex
CREATE INDEX "Scan_result_folder_targetId_idx" ON "Scan"("result_folder", "targetId");

-- CreateIndex
CREATE INDEX "Scan_end_time_targetId_idx" ON "Scan"("end_time", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "Scan_targetId_result_folder_key" ON "Scan"("targetId", "result_folder");

-- CreateIndex
CREATE INDEX "ScanResult_confidence_idx" ON "ScanResult"("confidence");

-- CreateIndex
CREATE INDEX "ScanResult_hash_id_confidence_idx" ON "ScanResult"("hash", "id", "confidence");

-- CreateIndex
CREATE INDEX "ScanResult_updated_at_idx" ON "ScanResult"("updated_at");

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crawl" ADD CONSTRAINT "Crawl_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawlError" ADD CONSTRAINT "CrawlError_crawlId_fkey" FOREIGN KEY ("crawlId") REFERENCES "Crawl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawlHash" ADD CONSTRAINT "CrawlHash_crawlId_fkey" FOREIGN KEY ("crawlId") REFERENCES "Crawl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanError" ADD CONSTRAINT "ScanError_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanResult" ADD CONSTRAINT "ScanResult_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;


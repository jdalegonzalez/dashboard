/*
  Warnings:

  - You are about to drop the column `duration` on the `Crawl` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Scan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Crawl" DROP COLUMN "duration";

-- AlterTable
ALTER TABLE "Scan" DROP COLUMN "duration";

-- CreateIndex
CREATE INDEX "ScanResult_hash_id_confidence_idx" ON "ScanResult"("hash", "id", "confidence");

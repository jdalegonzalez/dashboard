import { NextRequest, NextResponse } from 'next/server';
import { prisma, resultCount } from '@/app/lib/prisma';
import {
    getCUIFileCount,
    getDeDuplicateFileCount,
    getTotalFileCount,
    getUnsupportedFileCount,
} from '@/prisma-client/sql'

const summaryJson = async () => {
    const [agentCount, warningInfo, errorCount, unsupportedInfo, totalFilesInfo, deDupedFilesInfo] = await Promise.all([
        prisma.agent.count(),
        prisma.$queryRawTyped(getCUIFileCount()),
        prisma.scanError.count(),
        prisma.$queryRawTyped(getUnsupportedFileCount()),
        prisma.$queryRawTyped(getTotalFileCount()),
        prisma.$queryRawTyped(getDeDuplicateFileCount())
      ]);
    return ({
        agentCount: agentCount,
        warningCount: resultCount(warningInfo),
        errorCount: errorCount,
        unsupportedFilesCount: resultCount(unsupportedInfo),
        totalFilesCount: resultCount(totalFilesInfo),
        dedupedFilesCount: resultCount(deDupedFilesInfo)
    });
}

(BigInt.prototype as any).toJSON = function() {
    return Number(this);
}

export async function GET(req: NextRequest) {
    const res = await summaryJson();
    return NextResponse.json(res);
}

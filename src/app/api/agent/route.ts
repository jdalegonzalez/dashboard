import { NextRequest, NextResponse } from 'next/server';
import { prisma, resultCount } from '@/app/lib/prisma';
import {
    getCUIFileCount,
    getDeDuplicateFileCount,
    getTotalFileCount,
    getUnsupportedFileCount
} from '@prisma/client/sql'

export interface AgentAPIResults {
    agentCount: number;
    warningCount: number;
    errorCount: number;
    unsupportedFilesCount: number;
    totalFilesCount: number;
    dedupedFilesCount: number;
}

export async function GET(request: NextRequest) {
    const [agentCount, warningInfo, errorCount, unsupportedInfo, totalFilesInfo, deDupedFilesInfo] = await Promise.all([
        prisma.agent.count(),
        prisma.$queryRawTyped(getCUIFileCount()),
        prisma.scanError.count(),
        prisma.$queryRawTyped(getUnsupportedFileCount()),
        prisma.$queryRawTyped(getTotalFileCount()),
        prisma.$queryRawTyped(getDeDuplicateFileCount())
      ]);

    const res: AgentAPIResults = {
        agentCount: agentCount,
        warningCount: resultCount(warningInfo),
        errorCount: errorCount,
        unsupportedFilesCount: resultCount(unsupportedInfo),
        totalFilesCount: resultCount(totalFilesInfo),
        dedupedFilesCount: resultCount(deDupedFilesInfo)
    }

    return NextResponse.json(res);
}

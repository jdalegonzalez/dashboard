import { NextRequest, NextResponse } from 'next/server';
import { prisma, resultCount } from '@/app/lib/prisma';
import {
    getCUIFileCount,
    getDeDuplicateFileCount,
    getTotalFileCount,
    getUnsupportedFileCount,
    getAgentDetails
} from '@prisma/client/sql'
import { booleanParam, idParam } from '@/app/lib/fetch';

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

const detailsJson = async (agentId: string = '') => {
    return await prisma.$queryRawTyped(getAgentDetails(agentId));
}

export async function GET(req: NextRequest) {
    const showDetails = booleanParam(req,'details');
    const agentId = idParam(req, 'agentId')??'';
    const res = showDetails ? await detailsJson(agentId) : await summaryJson();
    return NextResponse.json(res);
}

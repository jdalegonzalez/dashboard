import { NextRequest, NextResponse } from 'next/server';
import { prisma, resultCount } from '@/app/lib/prisma';
import {
    getCUIFileCount,
    getDeDuplicateFileCount,
    getTotalFileCount,
    getUnsupportedFileCount,
    getAgentDetails
} from '@prisma/client/sql'
import { booleanParam, unpagedUrl } from '@/app/lib/fetch';

export interface AgentAPIResults {
    agentCount: number;
    warningCount: number;
    errorCount: number;
    unsupportedFilesCount: number;
    totalFilesCount: number;
    dedupedFilesCount: number;
}

export type AgentAPIDetailResults = getAgentDetails.Result[];
export const fetchPath = (details:boolean = false) => {
    return unpagedUrl(import.meta.url, details ? {details} : undefined)
}

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

const detailsJson = async () => {
    return await prisma.$queryRawTyped(getAgentDetails());
}

export async function GET(req: NextRequest) {
    const showDetails = booleanParam(req,'details');    
    const res = showDetails ? await detailsJson() : await summaryJson();
    return NextResponse.json(res);
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Confidence } from '@prisma/client';
interface AgentAPIResults {
    agentCount: number;
    warningCount: number;
    errorCount: number;
}

export async function GET(request: NextRequest) {
    const [agentCount, warningCount, errorCount] = await Promise.all([
        prisma.agent.count(),
        prisma.scanResult.count({
            'where': {'confidence': {'not': Confidence.NONE}}
        }),
        prisma.agent.count()
      ])
    const res: AgentAPIResults = {agentCount, warningCount, errorCount}
    return NextResponse.json(res);
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getAgentAndTarget } from '@/prisma-client/sql';
import { booleanParam, idParam } from '@/app/lib/fetch';

(BigInt.prototype as any).toJSON = function() {
    return Number(this);
}

const extendedJson = async (agentId: string | null = '') => {
    return await prisma.$queryRawTyped(getAgentAndTarget(agentId??''));
}

export async function GET(req: NextRequest) {
    const extended = booleanParam(req, "extended")
    const agentId = idParam(req, 'agentId')
    const res = extended ? await extendedJson(agentId) : await prisma.agent.findMany({ orderBy: {name: 'asc' }})
    return NextResponse.json(res);
}

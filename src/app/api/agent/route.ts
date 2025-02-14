import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
    console.log("I'VE BEEN CALLED")
    const agentCount = await prisma.agent.count();
    return NextResponse.json({agentCount});
}

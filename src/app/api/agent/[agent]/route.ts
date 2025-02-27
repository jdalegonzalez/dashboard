import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/app/lib/prisma';
import { IAgentResult } from '@/app/lib/fetch';

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {

    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const res:IAgentResult|null = await prisma.agent.findUnique({
        where: {
            id
        },
        include: {
            scans: {
                select: {id: true }
            },
            crawls: {
                select: {id: true}
            }
        }
    });
    // TODO: If res is empty, respond with 404
    return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
    
    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const data = await req.json();
    const {updated_at, ...cleaned} = data
    const res = await prisma.agent.update({
        data: cleaned,
        where: {
            id
        }
    });

    return NextResponse.json(res);
}
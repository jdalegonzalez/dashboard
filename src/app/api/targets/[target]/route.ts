import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/app/lib/prisma';
import { ITargetResult } from '@/app/lib/fetch';
import path from "path";
import { readFile, mkdir, writeFile, open } from "fs/promises";
import lockfile from 'proper-lockfile';
import { Agent, Status } from "@/prisma-client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {

    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const res:ITargetResult|null = await prisma.target.findUnique({
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
    const {_updated_at, ...cleaned} = data
    const res = await prisma.target.update({
        data: cleaned,
        where: {
            id
        }
    });

    return NextResponse.json(res);
}

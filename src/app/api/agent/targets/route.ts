import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/app/lib/prisma';

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {

    const paths = req.nextUrl.pathname
    const res = await prisma.target.findMany({});

    // TODO: If res is empty, respond with 404
    return NextResponse.json(res);
}

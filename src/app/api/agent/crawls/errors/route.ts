import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { pagingParams, defaultRows } from '@/app/lib/fetch';

export async function GET(req: NextRequest) {
    const { skip, rowsPerPage } = pagingParams(req, defaultRows);

    const sortOrder = { file: 'asc' as const}
    const whereClause = {};

    const [totalRows, results] = await prisma.$transaction([
        prisma.crawlError.count({ where: whereClause }),
        prisma.crawlError.findMany( {where: whereClause, skip: skip, take: rowsPerPage, orderBy: sortOrder })
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 5 seconds delay

    const pages = Math.ceil(totalRows / rowsPerPage);

    return NextResponse.json({rowsPerPage, skip, totalRows, pages, results});
}

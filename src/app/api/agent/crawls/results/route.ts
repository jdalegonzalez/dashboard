import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { pagingParams, defaultRows, idParam } from '@/app/lib/fetch';

export async function GET(req: NextRequest) {
    const { skip, rowsPerPage } = pagingParams(req, defaultRows);
    const crawlId = idParam(req, 'crawlId');
    const idPart = crawlId ?  {crawlId: crawlId } : {}
    const sortOrder = { hash: 'asc' as const}
    const whereClause = {...idPart };
    console.log(whereClause)
    const [totalRows, results] = await prisma.$transaction([
        prisma.crawlHash.count({ where: whereClause }),
        prisma.crawlHash.findMany( {where: whereClause, skip: skip, take: rowsPerPage, orderBy: sortOrder })
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 5 seconds delay

    const pages = Math.ceil(totalRows / rowsPerPage);

    return NextResponse.json({rowsPerPage, skip, totalRows, pages, results});
}

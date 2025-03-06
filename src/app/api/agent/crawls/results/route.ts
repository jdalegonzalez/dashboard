import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { pagingParams, defaultRows, idParam, crawlIdFilter as idFilter } from '@/app/lib/fetch';


export async function GET(req: NextRequest) {
    const { skip, rowsPerPage } = pagingParams(req, defaultRows);
    const crawlId = idParam(req, 'crawlId');

    // TODO: This has to query to get the newest date.  It 
    // would be great to find a way to do it all in one fetch of 
    // the server.
    const idPart = await idFilter(prisma, crawlId)

    const sortOrder = { hash: 'asc' as const}
    const whereClause = {...idPart };
    const [totalRows, results] = await prisma.$transaction([
        prisma.crawlHash.count({ where: whereClause }),
        prisma.crawlHash.findMany({ where: whereClause, skip: skip, take: rowsPerPage, orderBy: sortOrder })
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 5 seconds delay

    const pages = Math.ceil(totalRows / rowsPerPage);

    return NextResponse.json({rowsPerPage, skip, totalRows, pages, results});
}

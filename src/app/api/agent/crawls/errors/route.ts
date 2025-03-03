import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { pagingParams, defaultRows, idParam, crawlIdFilter as idFilter } from '@/app/lib/fetch';

export async function GET(req: NextRequest) {
    const { skip, rowsPerPage } = pagingParams(req, defaultRows);
    const crawlId = idParam(req, 'crawlId');

    // If we don't have a specific ID that we're looking for, then
    // we will  limit our results to the "newest" crawl for all agents.
    // There is probably a fancy way to do this in a single SQL query either
    // in prisma syntax or using TypedSQL. But in the interest of time,
    // We'll start by finding the newest date without the fancy bit.
    
    // TODO: Rewrite as a single query.
    const idPart = await idFilter(prisma, crawlId)

    const sortOrder = { file: 'asc' as const}
    const whereClause = {...idPart };

    const [totalRows, results] = await prisma.$transaction([
        prisma.crawlError.count({ where: whereClause }),
        prisma.crawlError.findMany( {where: whereClause, skip: skip, take: rowsPerPage, orderBy: sortOrder })
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 5 seconds delay

    const pages = Math.ceil(totalRows / rowsPerPage);

    return NextResponse.json({rowsPerPage, skip, totalRows, pages, results});
}

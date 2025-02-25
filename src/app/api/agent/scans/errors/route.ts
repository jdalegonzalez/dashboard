import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { type ScanError } from '@prisma/client';
import { pagingParams, pagedUrl, type PagedAPIResults, booleanParam } from '@/app/lib/fetch';

export const defaultRows = 25;

export type ErrorAPIResults = PagedAPIResults<ScanError>;

export const fetchPath = (rows: number = defaultRows, page: number = 1) => {
    return pagedUrl(import.meta.url, rows, page)
}

export async function GET(req: NextRequest) {
    const { skip, rowsPerPage } = pagingParams(req, defaultRows);

    const sortOrder = { file: 'asc' as const}
    const whereClause = {};

    const [totalRows, results] = await prisma.$transaction([
        prisma.scanError.count({ where: whereClause }),
        prisma.scanError.findMany( {where: whereClause, skip: skip, take: rowsPerPage, orderBy: sortOrder })
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 5 seconds delay

    const pages = Math.ceil(totalRows / rowsPerPage);

    return NextResponse.json({rowsPerPage, skip, totalRows, pages, results});
}

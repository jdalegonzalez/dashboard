import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Confidence } from '@prisma/client';
import { type ScanResult } from '@prisma/client';
import { pagingParams, pagedUrl, type PagedAPIResults, booleanParam, idParam } from '@/app/lib/fetch';

export const defaultRows = 25;

export type FindingsAPIResults = PagedAPIResults<ScanResult>;

export const fetchPath = (rows: number = defaultRows, page: number = 1, extraArgs?:{}) => {
    return pagedUrl(import.meta.url, rows, page, extraArgs)
}

export async function GET(request: NextRequest) {
    const { skip, rowsPerPage } = pagingParams(request, defaultRows);
    const allRows = booleanParam(request, 'allResults');
    const scanId = idParam(request, 'scanId');
    const idPart = scanId ?  {scanId: scanId } : {}
    const confPart = !allRows ? {confidence: { not: Confidence.NONE}} : {};
    const whereClause = {...idPart, ...confPart};
    console.log(whereClause)
    const sortOrder = { file_path: 'asc' as const}

    const [totalRows, results] = await prisma.$transaction([
        prisma.scanResult.count({ where: whereClause }),
        prisma.scanResult.findMany( {where: whereClause, skip: skip, take: rowsPerPage, orderBy: sortOrder })
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 5 seconds delay

    const pages = Math.ceil(totalRows / rowsPerPage);

    return NextResponse.json({rowsPerPage, skip, totalRows, pages, results});
}

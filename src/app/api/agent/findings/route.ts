import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Confidence } from '@prisma/client';
import { pagingParams, defaultRows, booleanParam, idParam, enumParam, enumWhere } from '@/app/lib/fetch';

export async function GET(request: NextRequest) {
    const { skip, rowsPerPage } = pagingParams(request, defaultRows);
    const allRows = booleanParam(request, 'allResults');
    const scanId = idParam(request, 'scanId');
    const confidences = enumParam(request, 'confidence', Confidence);
    const confPart = enumWhere('confidence', confidences, !allRows ? {confidence: { not: Confidence.NONE}} : {});
    const idPart = scanId ?  {scanId: scanId } : {}
    const whereClause = {...idPart, ...confPart};

    const sortOrder = { file_path: 'asc' as const}

    const [totalRows, results] = await prisma.$transaction([
        prisma.scanResult.count({ where: whereClause }),
        prisma.scanResult.findMany( {where: whereClause, skip: skip, take: rowsPerPage, orderBy: sortOrder })
    ]);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 5 seconds delay
    const pages = Math.ceil(totalRows / rowsPerPage);

    return NextResponse.json({rowsPerPage, skip, totalRows, pages, results});
}

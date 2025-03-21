import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getScansSummary } from '@/prisma-client/sql'
import { ScanSummaryAPIResults } from '@/app/lib/fetch';

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const summaryData = await prisma.$queryRawTyped(getScansSummary());
 
    const series = [
        {name:"Discoveries", data:[] as number[]},
        {name:"Errors",      data:[] as number[]}
    ];

    const paths: string[] = [];
    const targets: string[] = [];
    const durations: number[] = [];
    const gigs_per_second: number[] = [];
    summaryData.forEach(row => {
        series[0].data.push(row.matches??0);
        series[1].data.push(-1 * Number(row.error_count));
        paths.push(row.path);
        targets.push(row.name);
        durations.push((row.end_time && row.start_time) ? Number(row.end_time) - Number(row.start_time) : 0) 
        gigs_per_second.push(row.gigs_per_second??0)
      });

    const res: ScanSummaryAPIResults = {
        series,
        paths,
        targets,
        durations,
        gigs_per_second
    }

    return NextResponse.json(res);
}

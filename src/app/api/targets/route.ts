import { idParam } from "@/app/lib/fetch";
import { prisma } from "@/app/lib/prisma";
import { getTargetDetails } from "@/prisma-client/sql";
import { NextRequest, NextResponse } from "next/server";


(BigInt.prototype as any).toJSON = function() {
    return Number(this);
}

const detailsJson = async (targetId: string = '') => {
    return await prisma.$queryRawTyped(getTargetDetails(targetId));
}

export async function GET(req: NextRequest) {
    const targetId = idParam(req, 'targetId')??'';
    const res = await detailsJson(targetId);
    return NextResponse.json(res);
}

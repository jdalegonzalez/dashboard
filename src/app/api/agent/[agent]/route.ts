import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/app/lib/prisma';
import { IAgentResult } from '@/app/lib/fetch';
import path from "path";
import { readFile, mkdir, writeFile, open } from "fs/promises";
import lockfile from 'proper-lockfile';
import { Status } from "@/prisma-client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {

    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const res:IAgentResult|null = await prisma.agent.findUnique({
        where: {
            id
        },
        include: {
            scans: {
                select: {id: true }
            },
            crawls: {
                select: {id: true}
            }
        }
    });
    // TODO: If res is empty, respond with 404
    return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
    
    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const data = await req.json();
    const {updated_at, ...cleaned} = data
    const res = await prisma.agent.update({
        data: cleaned,
        where: {
            id
        }
    });

    return NextResponse.json(res);
}


interface IQueueEntry {
    root: string,
    status: string
}

interface IQueue {
    targets: IQueueEntry[]
}

const getLock = async (queueFolder: string, file:string) => {
    // Try to get a lock.  If we can't lock the file,
    // we'll just return undefined and the PUT function
    // we'll live to fight another day.
    const queueFile = path.join(queueFolder,file)

    // Create the file if it doesn't exist.
    const fd = await open(queueFile, 'a+');
    fd.close();

    try {
        const release = await lockfile.lock(queueFile, {lockfilePath: path.join(queueFolder,'queue.lock')});
        return release
    }
    catch (e) {
        console.log(e)
        return undefined
    }
}

const readExistingQueue = async (queueFile: string) => {
    // We'll return the JSON from the existing queue
    // or an empty array if the file isn't found.
    // Any other error just gets thrown.
    const emptyTarget: IQueue = { targets: [] }
    try {
        const fileContent = await readFile(queueFile, {encoding: 'utf-8'});
        if (!fileContent) return emptyTarget;
        return JSON.parse(fileContent) as IQueue;
    }
    catch (e: any) {
        if (e.code === 'ENOENT') return emptyTarget;
        throw e;
    }
}

export async function PUT(req: NextRequest) {

    const target = process.env.TERAMIS_SCAN_TARGET

    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const data = await req.json();
    const pathToScan = data?.pathToScan ?? ''

    if (!id) {
        console.error('Agent ID is undefined',404);
        return NextResponse.json(
            {error: 'Agent ID is not present on the request.'},
            {status: 404, statusText:'Internal Server Error - no Agent ID'}
        )
    }

    if (!target) {
        console.error('TERAMIS_SCAN_TARGET is undefined',500);
        return NextResponse.json(
            {error: 'TERAMIS_SCAN_TARGET unset in the environment'},
            {status: 500, statusText:'Internal Server Error - no TERAMIS_SCAN_TARGET'}
        )
    }

    if (!pathToScan) {
        console.error('pathToScan was not present on the request',404);
        return NextResponse.json(
            {error: 'No path to scan provided'},
            {status: 404, statusText:'Internal Server Error - no path to scan'}
        )
    }

    const queueFolder = path.join(target, id)
    const queueFile = path.join(queueFolder,'queue.json')

    // Try to create the queue folder, we're not going to worry if we can't
    // because apparently the Node way is to just try it.  Passing recursive
    // here means we don't get an error if it already exists.  Yay.
    await mkdir(queueFolder, {recursive: true} )
    
    const releaseLock = await getLock(queueFolder,'queue.json');
    if (!releaseLock) {
        console.info(`Couldn't aquire lock for '${queueFile}'`)
        return NextResponse.json(
            {response: "Can't get lock for agent queue"},
            {status: 202, statusText: `Can't get lock queue for agent '${id}'`}
        )
    }

    try {
        const queue = await readExistingQueue(queueFile);
        const existing = queue.targets.findIndex((e:IQueueEntry) => e.root === pathToScan);
        const stat = (existing >= 0) ? (queue.targets[existing]??'').status?.trim().toUpperCase() ?? '' : ''
        if (stat && !stat.startsWith('ERROR')) {
            return NextResponse.json(
                {response: `Path ${pathToScan}' already queued for agent: '${id}' (${stat}).`},
                {status: 200, statusText: `Path ${pathToScan}' already queued for agent: '${id}' (${stat}).`}
            )
        }
        if (existing >= 0) delete queue.targets[existing]
        queue.targets.push({
            root: pathToScan,
            status: 'queued'
        });
        await writeFile(queueFile, JSON.stringify(queue, undefined, 2), {encoding:'utf-8', flag:'w+'});
        // If we got here, we need to update the agent to let it know it's know crawling.
        const res = await prisma.agent.update({
            data: {status: Status.PENDING},
            where: {
                id
            }
        });
        return NextResponse.json(
            {response: `Path ${pathToScan}' queued for agent: '${id}'.`},
            {status: 201, statusText: `Path ${pathToScan}' queued for agent: '${id}'.`}
        )
    }
    catch (e:any) {
        if (!(e instanceof Error)) { e = new Error(e)}
        console.error(e);
        return NextResponse.json(
            {error: e.message},
            {status: 500, statusText: e.message}
        );
    }
    finally {
        releaseLock();
    }
}
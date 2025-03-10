import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/app/lib/prisma';
import { IAgentResult, IAgentWithComplete } from '@/app/lib/fetch';
import path from "path";
import { readFile, mkdir, writeFile, open } from "fs/promises";
import lockfile from 'proper-lockfile';
import { Agent, Status } from "@/prisma-client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {

    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const res:IAgentResult|null = await prisma.agent.findUnique({
        where: {
            id
        },
        include: {
            targets: {
                select: {
                    id: true,
                    scans: {
                        select: {id: true }
                    },
                    crawls: {
                        select: {id: true}
                    }
                }
            }
        }
    });

    // TODO: If res is empty, respond with 404
    const extendedAgent = await agentStatusAndComplete(res as IAgentWithComplete)
    return NextResponse.json(extendedAgent);
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
    status: string,
    settings?: {
        skip_completed?: boolean,
        max_workers?: number,
        mem_thresh?: number,
        use_history?: boolean,
        default_timeout?: number
    }    
}

const agentStatusAndComplete = async (agent:IAgentWithComplete) => {

    agent.percentComplete = 100
    if (agent.status === Status.IDLE) {
        // It could be that the agent hasn't picked 
        // up the queue request yet, so we need to see
        // if there are any queued requests.
        const queue = await readJsonFile<IQueue>(getQueueFile(agent.id),{ targets: [] });
        const queued = (queue?.targets??[]).some(itm => itm?.status === 'queued');
        if (queued) agent.status = Status.PENDING
    }
    else if (agent.status === Status.CRAWLING || agent.status === Status.SCANNING) {
        // If it's crawling or scanning, grab the % complete
        const status = await readJsonFile<IAgentStatus>(getStatusFile(agent.id),{task: 'Stopped', progress: '0%'})
        agent.percentComplete = Math.round(Number(status.progress.replace(/\D/g, '')));
    }

    return agent
}

interface IQueue {
    targets: IQueueEntry[]
}

interface IAgentStatus {
    task: string;
    progress: string;
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

const readJsonFile = async <T>(jsonFile: string, defaultJson: T) => {
    // We'll return the JSON from the existing queue
    // or an empty array if the file isn't found.
    // Any other error just gets thrown.
    try {
        const fileContent = await readFile(jsonFile, {encoding: 'utf-8'});
        if (!fileContent) return defaultJson;
        return JSON.parse(fileContent) as T;
    }
    catch (e: any) {
        if (e.code === 'ENOENT') return defaultJson;
        throw e;
    }
}

const getStatusFile = (id: string) => {
    const target = process.env.TERAMIS_SCAN_TARGET ?? ''
    const queueFolder = path.join(target, id)
    const queueFile = path.join(queueFolder,'agent_status.json')
    return queueFile
}

const getQueueFile = (id:string) => {
    const target = process.env.TERAMIS_SCAN_TARGET ?? ''
    const queueFolder = path.join(target, id)
    const queueFile = path.join(queueFolder,'queue.json')
    return queueFile
}

export async function PUT(req: NextRequest) {

    const target = process.env.TERAMIS_SCAN_TARGET

    const paths = req.nextUrl.pathname
    const id = paths.split('/').pop();
    const data = await req.json();

    console.log(data)
    const {
        skipCompleted: skip_completed,
        maxWorkers: max_workers,
        memoryThreshold: mem_thresh,
        useHistory: use_history,
        defaultTimeout: default_timeout
    } = data;
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
    const queueFile = getQueueFile(id)

    // Try to create the queue folder, we're not going to worry if we can't
    // because apparently the Node way is to just try it.  Passing recursive
    // here means we don't get an error if it already exists.  Yay.

    console.log(`Trying to create the queue folder "${queueFolder}"`)
    try {
        await mkdir(queueFolder, {recursive: true} )
    }
    catch (e) {
        console.log(e)
    }    
    
    const releaseLock = await getLock(queueFolder,'queue.json');
    if (!releaseLock) {
        console.info(`Couldn't aquire lock for '${queueFile}'`)
        return NextResponse.json(
            {response: "Can't get lock for agent queue"},
            {status: 202, statusText: `Can't get lock queue for agent '${id}'`}
        )
    }

    try {
        const queue = await readJsonFile<IQueue>(queueFile, { targets: [] });
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
            status: 'queued',
            settings: {
                skip_completed,
                max_workers,
                mem_thresh,
                use_history,
                default_timeout
            }
        });
        await writeFile(queueFile, JSON.stringify(queue, undefined, 2), {encoding:'utf-8', flag:'w+'});
        // If we got here, we need to update the agent to let it know it's know crawling.
        await prisma.agent.update({
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
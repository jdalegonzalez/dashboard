import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'
import { readFileSync, PathLike, readdirSync } from 'fs'
import path from 'path'
import { Agent, Status, Severity, Confidence, Prisma } from '@prisma/client'
import arg from 'arg'
import { parse } from 'date-fns';
import { UTCDate } from '@date-fns/utc';
import { parse as csvParse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const agentName = () => {
    return `${faker.word.adjective()}-${faker.animal.type().replace(/ /g,"_")}`;
}

const agentFromDirectory = (source: string) => {
    // Open up the craw_stats.txt file and get the path.
    const fileContent = readFileSync(path.join(source, 'crawl_stats.txt'), 'utf-8');
    const lines = fileContent.split(/\r?\n/);
    // Process each line as needed
    const agent:Prisma.AgentCreateInput = {
        name: agentName(),
        location: faker.system.networkInterface({ interfaceSchema: 'mac' }),
        path: "", 
        status: Status.IDLE
    };
    lines.forEach(line => {
        const [tag, value] = line.split(/:(.*)/);
        switch(tag.trim()) {
            case "":
                // So long as this is just the key, we can move on
                if (value && value.trim()) {
                    console.warn(`Found a value without a key "${value.trim()}"`)
                }
                break;
            case 'Root Directory':
                agent.path = value.trim()
                break;
            case 'Start Time':
                // The agent doesn't need this value.  It's
                // a function of the last crawl
            case 'End Time':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
            case 'Duration':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Throughput':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Root Size':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Directories':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Files':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Unsupported':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Unique Files':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Largest File':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Extensions':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                /* FALL THROUGH */
            case 'Errors':
                // The agent doesn't need this value.  It's necessary
                // for the crawl.
                
                // Those are the fields we expected to see.
                break;
            default:
                console.log(`Unmatched Agent key "${tag.trim()}"`);
                break;
        }
    });

    return agent
}

const gigsFromString = (str: string) => {
    // 1.64 GB per second
    const val = str.trim().split(/($[0-9\.]+)/)[0]
    return parseFloat(val)
}

const errorFromLogLine = (line: string) => {
    // 2025-02-04 11:41:57,361 - WARNING - Extraction error: document closed or encrypted - C:\Users\Nate\Documents\Convergent\spillage\lib_test_data\data_org\encrypted\1249.pdf
    const parts = line.split(" - ");
    const errorStrToEnum = (str:string) => {
        if (str.trim().toUpperCase() == 'HINT') return Severity.HINT;
        if (str.trim().toUpperCase() == 'WARNING') return Severity.WARNING;
        if (str.trim().toUpperCase() == 'ERROR') return Severity.ERROR;
        if (str.trim().toUpperCase() == 'FATAL') return Severity.FATAL;
        console.log(`Unknown error string "${str.trim()}"`);
        process.exit(1);
        return Severity.WARNING;
    }
    const [name, desc]  = parts[2].split(/:(.*)/);
    const file = (name == 'Timeout' || parts.length < 4) ? desc : parts[3];

    // There is an inconsistency with "Timeout" where there isn't a 3rd hyphen and instead
    // the filename is after the Timeout colon.
    return ({
        'occurred_at': parse(parts[0],'yyyy-MM-dd HH:mm:ss,SSS',new UTCDate(), {'locale': {'code': 'UTC'}}),
        'severity': errorStrToEnum(parts[1]),
        'error_name': name.trim(),
        'error_desc': (name.trim() == 'Timeout' || parts.length < 4) ? "" : desc.trim(),
        'file': file.trim()
    })
}

const scanErrorsFromDirectory = (source: string) => {
    const fileContent = readFileSync(path.join(source, 'errors.log'), 'utf-8');
    const lines = fileContent.split(/\r?\n/).filter(l => l && l.length);
    return lines.map(line => errorFromLogLine(line));
}

const scanResultsFromDirectory = (source: string) => {
    const csvFile = path.join(source, "output", "results.csv");
    const fileContent = readFileSync(csvFile, 'utf-8').replaceAll('\r', '');
    type csvRow = {
        'Hash': string,
        'Filepath': string,
        'MimeType': string,
        'Bsize': string,
        'Processed': string,
        'Error': string,
        'Match': string,
        'Confidence': string
    }
    const matchStringToArray = (val: string) => {
        return val
        .replace(/^\[/g,'')
        .replace(/\]$/g,'')
        .split(/^"|", "|"$/g).filter(e => e.length)
    }
    const confStringToEnum = (val: string) => {
        const t = val.trim().toUpperCase();
        if (t == 'HIGH') return Confidence.HIGH;
        if (t == 'MED') return Confidence.MEDIUM;
        if (t == 'LOW') return Confidence.LOW;
        if (t == 'NONE') return Confidence.NONE;
        console.log(`Unknown confidence "${t}" using High`);
        process.exit(1);
    }
    return csvParse(fileContent, {columns:true}).map((obj:csvRow) => {
        return({
            hash: obj.Hash,
            file_path: obj.Filepath,
            mime_type: obj.MimeType,
            bsize: parseInt(obj.Bsize),
            processed: obj.Processed.toUpperCase().trim() == "TRUE",
            errored: obj.Error.toUpperCase().trim() == "TRUE",
            match: matchStringToArray(obj.Match),
            confidence: confStringToEnum(obj.Confidence)
        });
    });
}

const scanFromDirectory = (agent: Agent, source: string) => {
    // Open up the craw_stats.txt file and get the path.
    const fileContent = readFileSync(path.join(source, 'scan_stats.txt'), 'utf-8');
    const lines = fileContent.split(/\r?\n/);
    // start_time      DateTime @default(now())
    // end_time        DateTime
    // Process each line as needed
    const scan:Prisma.ScanCreateInput = {
        root_path: "",
        matches: 0,
        timeouts: 0,
        gigs_per_second: 0,
        errors: { createMany: {data: scanErrorsFromDirectory(source)}},
        results: { createMany: {data: scanResultsFromDirectory(source)}},
        agent: { connect: { id: agent.id }},
    };

    lines.forEach(line => {
        const [tag, value] = line.split(/:(.*)/);
        switch(tag.trim()) {
            case "":
                // Blank line.
                if (value && value.trim().length) {
                    console.warn(`Ignoring value: "${value.trim()}" with no label.`)
                }
                break;
            case 'Root Directory':
                scan.root_path = value.trim();
                break;
            case 'Start Time':
                scan.start_time = new Date(value.trim());
                break;
            case 'End Time':
                scan.end_time = new Date(value.trim());
                break;
            case 'Matches': 
                scan.matches = parseInt(value.trim());
                break;
            case 'Timeout':
                scan.timeouts = parseInt(value.trim());
                break;
            case 'Scan Rate':
                scan.gigs_per_second = gigsFromString(value.trim());
                break;
            case 'Duration': 
                // Do nothing.  We can calculate the duration from 
                // the start and end times
                break;
            case 'Errors':
                // Do nothing.  We can count the number of errors
                // based on the errors.log file.
                break;
            default:
                console.log(`Unmatched Scan key "${tag.trim()}"`);
                break;
        }
    });
    
    return scan;
}

const crawlFromDirectory = (agent: Agent, source: string) => {

    const fileContent = readFileSync(path.join(source, 'crawl_dump.json'), 'utf-8');
    const json = JSON.parse(fileContent);
    const hashes = Object.entries(json.hash_map).map(([k, v]) => {
        const vobj = v as any;
        return ({
            hash: String(k),
            file_paths: vobj.fps,
            bsize: vobj.bsize,
            format: vobj.fmt            
        })
    })

    const crawl: Prisma.CrawlCreateInput = {
        root_path:           json.root_path         as string,
        file_count:          json.file_count        as number,
        dir_count:           json.dir_count         as number,
        total_size:          json.total_size        as bigint,
        scan_size:           json.scan_size         as bigint,
        largest_file_path:   json.largest_file_path as string,
        largest_file_size:   json.largest_file_size as bigint,
        extensions:          json.extensions        as string[],
        start_time: new Date(json.start_time)       as Date,
        end_time:   new Date(json.end_time)         as Date,
        throughput:          json.throughput        as number,
        unsupported_files:   json.unsupported       as string[],
        agent: { connect: { id: agent.id }},
        hashes: {
            createMany: {
                data: hashes
            } 
        }
    };

    return crawl

}

const agentFromDirectories = async (source: PathLike) => {
    for (const ent of readdirSync(source, {withFileTypes:true})
        .filter(ent => ent.isDirectory())) {
        const folder = path.join(ent.path, ent.name);
        console.log(folder);
        const agentData = agentFromDirectory(folder);
        const agent = await prisma.agent.create({data: agentData});
        // With the agent created, we can populate the crawl.
        await prisma.crawl.create({data: crawlFromDirectory(agent, folder)});
        await prisma.scan.create({data: scanFromDirectory(agent, folder)})
    }
}

async function main() {
    const args = arg({
        '--help': Boolean,
        '--no-init': Boolean,
        '--no-import': Boolean,
    })
    const noInit = args['--no-init'] ?? false
    const noImport = args['--no-import'] ?? false

    if (!noInit) {
        await prisma.scan.deleteMany()
        await prisma.crawl.deleteMany()
        await prisma.agent.deleteMany()
    }
    if (!noImport) {
        await agentFromDirectories(path.join(__dirname, "results"))
        const allCrawl = await prisma.crawl.findMany()
        console.log(allCrawl)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
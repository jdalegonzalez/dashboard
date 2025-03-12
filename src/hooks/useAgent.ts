import useSWR from 'swr';
import fetch, { updater } from '@/app/lib/fetch';
import fetcher, {AgentAPIResults} from '@/app/lib/fetch';
import { unpagedUrl } from '@/app/lib/fetch';
import { IAgentResult } from '@/app/lib/fetch';
import { Status } from '@/prisma-client';
import { getAgentAndTarget } from '@/prisma-client/sql';
import { string } from 'slate';

const emptyDate = new Date(0)

export const blankResult:IAgentResult = {
    id: 'loading',
    created_at: emptyDate,
    updated_at: emptyDate,
    name: '',
    location: '',
    os: '',
    os_version: '',
    arch: '',
    cores: 0,
    logical_cpus: 0,
    ram_gb: 0.0,
    processor: '',
    status: 'ERRORED',
    targets: []
}

const {id, ...rest} = blankResult;
const emptySize: any = 0;
export const blankExtendedResult: getAgentAndTarget.Result = {
    agent_id: id,
    ...rest,
    target_id: '',
    root: '',
    skip_completed: false,
    max_workers: 0,
    mem_thresh: 0,
    use_history: false,
    default_timeout: 0,
    scan_id: '',
    scan_root_path: '',
    scan_start_time: emptyDate,
    scan_end_time: null,
    matches: 0,
    timeouts: 0,
    gigs_per_second: 0,
    scan_errors: null,
    crawl_id: '',
    crawl_root_path: '',
    crawl_start_time: emptyDate,
    crawl_end_time: emptyDate,
    file_count: 0,
    dir_count: 0,
    total_size: emptySize,
    crawl_scan_size: emptySize,
    largest_file_size: emptySize,
    largest_file_path: '',
    throughput: 0,
    crawl_used_history: false,
    crawl_errors: null
}

export const blankResults:AgentAPIResults = [blankResult]
const apiPath = '/api/agents';

export const useAgentDetails = (id:string='') => {
    const idPiece = id ? {agentId: id} : {};
    const { data, error, isLoading } = useSWR<AgentAPIResults>(unpagedUrl(apiPath, {...idPiece}), fetch);
    const res: AgentAPIResults = data ?? blankResults;
    return {
        data: res,
        isLoading,
        isError: error
    }
}

export const useAgentAndTarget = (id:string='') => {
    const idPiece = id ? {agentId: id} : {};
    const { data, error, isLoading } = useSWR<getAgentAndTarget.Result[]>(unpagedUrl(apiPath, {extended: true, ...idPiece}), fetch);

    const res: getAgentAndTarget.Result[] = data ?? [blankExtendedResult];
    return {
        data: res,
        isLoading,
        isError: error
    }
}

export interface ITriggerPayload {
    status: Status;
    pathToScan: string;
    skipCompleted?: boolean;
    maxWorkers?: number;
    memoryThreshold?: number;
    useHistory?: boolean;
    defaultTimeout?: number;  
  }
  
async function scanTrigger(url: RequestInfo, data:Partial<ITriggerPayload>): Promise<JSON> {
    // TODO: There will need to be CORS and credentials added here.
    const options = {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'PUT',
        body: JSON.stringify(data)
    }
    return fetcher(url, options)
}

type TSavingStateAction = React.Dispatch<React.SetStateAction<boolean>>
export const useAgent = (id: string|string[]|undefined, setIsSaving?: TSavingStateAction, refreshInterval?:number) => {
    const path = apiPath + '/' + id;
    const options = refreshInterval ? {refreshInterval: refreshInterval} : {}
    const { data, error, isLoading, mutate } = useSWR<IAgentResult>(path, fetch, options);
    const performUpdate = async (newData:Partial<IAgentResult>) => {
        if (setIsSaving) setIsSaving(true);
        await updater<IAgentResult>(path, newData)
        mutate({...data, ...newData} as IAgentResult)
        if (setIsSaving) setIsSaving(false); 
    }
    const triggerScan = async (newData:ITriggerPayload) => {
        if (setIsSaving) setIsSaving(true);
        const {status, ...rest} = newData;
        await scanTrigger(path, rest)
        mutate({...data, status} as IAgentResult)
        if (setIsSaving) setIsSaving(false); 
    }
    return {
        data: data ?? blankResult,
        isLoading,
        isError: error,
        performUpdate,
        triggerScan
    }
}

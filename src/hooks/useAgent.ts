import useSWR from 'swr';
import fetch, { updater } from '@/app/lib/fetch';
import fetcher, {AgentAPIResults, AgentAPIDetailResults} from '@/app/lib/fetch';
import { unpagedUrl } from '@/app/lib/fetch';
import { getAgentDetails } from '@/prisma-client/sql';
import { IAgentResult } from '@/app/lib/fetch';
import { Status } from '@/prisma-client';

const emptyDate = new Date(0)

export const blankAgent:IAgentResult = {
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

const {id: agent_id, ...rest} = blankAgent;

export const blankResult:getAgentDetails.Result = {
    agent_id,
    ...rest,
    target_id: '',
    skip_completed: false,
    max_workers: 0,
    mem_thresh: 0,
    default_timeout: 0,
    scan_id: '',
    scan_start_time: emptyDate,
    scan_end_time: null,
    scan_root_path: '',
    crawl_scan_size: 0 as unknown as bigint,
    crawl_root_path: '',
    matches: 0,
    timeouts: 0,
    scan_errors: null,
    crawl_id:'',
    crawl_start_time: emptyDate,
    crawl_end_time: emptyDate,
    use_history: true,
    throughput: 0.0,
    gigs_per_second: 0,
    crawl_errors: null, 
    file_count: 0,
    dir_count: 0,
    total_size: 0 as unknown as bigint,
    largest_file_size: 0 as unknown as bigint,
    largest_file_path: ''
}

export const blankResults:AgentAPIDetailResults = [blankResult]
const apiPath = '/api/agent';

export const useAgentDetails = (id:string='') => {
    const idPiece = id ? {agentId: id} : {};
    const { data, error, isLoading } = useSWR<AgentAPIDetailResults>(unpagedUrl(apiPath, {'details': true, ...idPiece}), fetch);
    const res: AgentAPIDetailResults = data ?? blankResults;
    return {
        data: res,
        isLoading,
        isError: error
    }
}

async function scanTrigger<T = any>(url: RequestInfo, data:Partial<T>): Promise<JSON> {
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

interface ITriggerPayload {
  status: Status,
  pathToScan: string
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
        const {pathToScan, ...rest} = newData;
        await scanTrigger<ITriggerPayload>(path, {pathToScan})
        mutate({...data, ...rest} as IAgentResult)
        if (setIsSaving) setIsSaving(false); 
    }
    return {
        data: data ?? blankAgent,
        isLoading,
        isError: error,
        performUpdate,
        triggerScan
    }
}

export default function useAgentOverview() {
    const { data, error, isLoading } = useSWR<AgentAPIResults>(apiPath, fetch)
    return {
        agentInfo: data,
        isLoading,
        isError: error
    }
}

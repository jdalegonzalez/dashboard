import useSWR from 'swr';
import fetch, { updater } from '@/app/lib/fetch';
import {ITargetResult} from '@/app/lib/fetch';
import { unpagedUrl } from '@/app/lib/fetch';
import { getTargetDetails } from '@/prisma-client/sql';

const emptyDate = new Date(0)

export const blankTarget:ITargetResult = {
    id: 'loading',
    root: '',
    skip_completed: false,
    default_timeout: 0,
    max_workers: 0,
    mem_thresh: 0,
    use_history: false,
    created_at: emptyDate,
    updated_at: emptyDate,
    name: '',
    scans: [],
    crawls: [],
}


export const blankResult:getTargetDetails.Result = {
    ...blankTarget,
    root: '',
    skip_completed: false,
    default_timeout: 0,
    use_history: true,
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
    crawl_used_history: true,
    throughput: 0.0,
    gigs_per_second: 0,
    crawl_errors: null, 
    file_count: 0,
    dir_count: 0,
    total_size: 0 as unknown as bigint,
    largest_file_size: 0 as unknown as bigint,
    largest_file_path: ''
}

export const blankResults:getTargetDetails.Result[] = [blankResult]
const apiPath = '/api/targets';

export const useTargetDetails = (id:string='') => {
    const idPiece = id ? {id} : {};
    const { data, error, isLoading } = useSWR<getTargetDetails.Result[]>(unpagedUrl(apiPath, {...idPiece}), fetch);
    const res: getTargetDetails.Result[] = data ?? blankResults;
    return {
        data: res,
        isLoading,
        isError: error
    }
}

type TSavingStateAction = React.Dispatch<React.SetStateAction<boolean>>
export const useTarget = (id: string|string[]|undefined, setIsSaving?: TSavingStateAction) => {
    const path = apiPath + '/' + id;
    const { data, error, isLoading, mutate } = useSWR<ITargetResult>(path, fetch);
    const performUpdate = async (newData:Partial<ITargetResult>) => {
        if (setIsSaving) setIsSaving(true);
        await updater<ITargetResult>(path, newData)
        mutate({...data, ...newData} as ITargetResult)
        if (setIsSaving) setIsSaving(false); 
    }
    return {
        data: data ?? blankTarget,
        isLoading,
        isError: error,
        performUpdate
    }
}

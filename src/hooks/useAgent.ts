import useSWR from 'swr';
import fetch, { updater } from '@/app/lib/fetch';
import {AgentAPIResults, AgentAPIDetailResults} from '@/app/lib/fetch';
import { unpagedUrl } from '@/app/lib/fetch';
import { getAgentDetails } from '@prisma/client/sql';
import { IAgentResult } from '@/app/lib/fetch';
import SvgChevronDoubleLeft from '@/components/icon/heroicons/ChevronDoubleLeft';

const emptyDate = new Date(0)

export const blankAgent:IAgentResult = {
  id: 'loading',
  created_at: emptyDate,
  updated_at: emptyDate,
  name: '',
  location: '',
  path: '',
  directory: '',
  use_history: false,
  status: 'ERRORED',
  scans: [],
  crawls: []
}

const {id: agent_id, ...rest} = blankAgent;

export const blankResult:getAgentDetails.Result = {
  agent_id,
  ...rest,
  scan_id: '',
  scan_start_time: emptyDate,
  scan_end_time: null,
  scan_size: 0 as unknown as bigint,
  root_path: '',
  matches: 0,
  timeouts: 0,
  scan_errors: null,
  crawl_id:'',
  crawl_start_time: emptyDate,
  crawl_end_time: emptyDate,
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

export const useAgent = (id: string|string[]|undefined, setIsSaving?: React.Dispatch<React.SetStateAction<boolean>>) => {
  // TODO: We can optimize this when the request is also fetching or has fetched agent details by adding
  // "no-data" as a URL argment and letting the fetcher know not to actually fetch anything for "no-data" requests
  // I still need the call though to get the mutator.  HOWEVER, this will be a little tricky because I'll have to
  // use the top-level mutator to update the agent details in the agent overview bit.  (WHICH I might need to anyway.)

  // TODO: Verify that when this mutator is called, the agent name updates in the other cached requests.
  const path = apiPath + '/' + id;
  const { data, error, isLoading, mutate } = useSWR<IAgentResult>(path, fetch);
  const performUpdate = async (newData:Partial<IAgentResult>) => {
    if (setIsSaving) setIsSaving(true);
    await updater<IAgentResult>(path, newData)
    mutate({...data, ...newData} as IAgentResult)
    if (setIsSaving) setIsSaving(false); 
  }
  return {
    data: data ?? blankAgent,
    isLoading,
    isError: error,
    performUpdate
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

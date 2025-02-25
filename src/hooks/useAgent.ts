import useSWR from 'swr';
import fetch from '@/app/lib/fetch';
import {AgentAPIResults, AgentAPIDetailResults} from '@/app/api/agent/route';
import { unpagedUrl } from '@/app/lib/fetch';
import { getAgentDetails } from '@prisma/client/sql';


const emptyDate = new Date(0)
export const blankResult:getAgentDetails.Result = {
  agent_id: 'loading',
  created_at: emptyDate,
  updated_at: emptyDate,
  name: '',
  location: '',
  path: '',
  directory: '',
  use_history: false,
  status: 'ERRORED',
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

export const useAgentDetails = () => {
  const { data, error, isLoading} = useSWR<AgentAPIDetailResults>(unpagedUrl(apiPath, {'details': true}), fetch);
  return {
    data: data ?? blankResults,
    isLoading,
    isError: error
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

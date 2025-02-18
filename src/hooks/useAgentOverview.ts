import useSWR from 'swr';
import fetch from '@/app/lib/fetch';
import {AgentAPIResults} from '@/app/api/agent/route';

export default function useAgentOverview() {
    const { data, error, isLoading } = useSWR<AgentAPIResults>('/api/agent', fetch)
    return {
      agentInfo: data,
      isLoading,
      isError: error
    }
}
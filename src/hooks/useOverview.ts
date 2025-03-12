
import useSWR from 'swr';
import fetch, { TeramisAPIResults } from '@/app/lib/fetch';

const apiPath = '/api/overview';

export default function useTeramisOverview() {
    const { data, error, isLoading } = useSWR<TeramisAPIResults>(apiPath, fetch)
    return {
        agentInfo: data,
        isLoading,
        isError: error
    }
}

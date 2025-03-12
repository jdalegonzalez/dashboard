import * as $runtime from "../runtime/library"
import { $DbEnums } from "./$DbEnums"

/**
 * @param text
 */
export const getAgentAndTarget: (text: string) => $runtime.TypedSql<getAgentAndTarget.Parameters, getAgentAndTarget.Result>

export namespace getAgentAndTarget {
  export type Parameters = [text: string]
  export type Result = {
    agent_id: string
    name: string
    location: string
    status: $DbEnums.Status
    arch: string
    cores: number
    logical_cpus: number
    os: string
    os_version: string
    processor: string
    ram_gb: number
    target_id: string
    root: string
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    scan_id: string
    scan_root_path: string
    scan_start_time: Date
    scan_end_time: Date | null
    matches: number
    timeouts: number
    gigs_per_second: number
    scan_errors: number | null
    crawl_id: string
    crawl_root_path: string
    crawl_start_time: Date
    crawl_end_time: Date
    file_count: number
    dir_count: number
    total_size: bigint
    crawl_scan_size: bigint
    largest_file_size: bigint
    largest_file_path: string
    throughput: number
    crawl_used_history: boolean
    crawl_errors: number | null
  }
}

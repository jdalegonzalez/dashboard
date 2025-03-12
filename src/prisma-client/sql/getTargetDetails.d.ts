import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const getTargetDetails: (text: string) => $runtime.TypedSql<getTargetDetails.Parameters, getTargetDetails.Result>

export namespace getTargetDetails {
  export type Parameters = [text: string]
  export type Result = {
    id: string
    name: string
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

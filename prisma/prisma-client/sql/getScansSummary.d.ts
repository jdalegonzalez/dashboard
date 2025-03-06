import * as $runtime from "../runtime/library"

/**
 */
export const getScansSummary: () => $runtime.TypedSql<getScansSummary.Parameters, getScansSummary.Result>

export namespace getScansSummary {
  export type Parameters = []
  export type Result = {
    name: string
    path: string
    matches: number
    start_time: Date
    end_time: Date | null
    gigs_per_second: number
    error_count: bigint | null
  }
}

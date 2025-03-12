import * as $runtime from "../runtime/library"

/**
 */
export const getScansSummary: () => $runtime.TypedSql<getScansSummary.Parameters, getScansSummary.Result>

export namespace getScansSummary {
  export type Parameters = []
  export type Result = {
    name: string
    path: string
    matches: number | null
    start_time: Date | null
    end_time: Date | null
    gigs_per_second: number | null
    error_count: bigint | null
  }
}

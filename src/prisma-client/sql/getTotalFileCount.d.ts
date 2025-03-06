import * as $runtime from "../runtime/library"

/**
 */
export const getTotalFileCount: () => $runtime.TypedSql<getTotalFileCount.Parameters, getTotalFileCount.Result>

export namespace getTotalFileCount {
  export type Parameters = []
  export type Result = {
    count: bigint | null
  }
}

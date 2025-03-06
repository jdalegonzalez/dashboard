import * as $runtime from "../runtime/library"

/**
 */
export const getCUIFileCount: () => $runtime.TypedSql<getCUIFileCount.Parameters, getCUIFileCount.Result>

export namespace getCUIFileCount {
  export type Parameters = []
  export type Result = {
    count: bigint | null
  }
}

import * as $runtime from "../runtime/library"

/**
 */
export const getDeDuplicateFileCount: () => $runtime.TypedSql<getDeDuplicateFileCount.Parameters, getDeDuplicateFileCount.Result>

export namespace getDeDuplicateFileCount {
  export type Parameters = []
  export type Result = {
    count: bigint | null
  }
}

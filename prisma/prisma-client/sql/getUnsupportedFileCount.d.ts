import * as $runtime from "../runtime/library"

/**
 */
export const getUnsupportedFileCount: () => $runtime.TypedSql<getUnsupportedFileCount.Parameters, getUnsupportedFileCount.Result>

export namespace getUnsupportedFileCount {
  export type Parameters = []
  export type Result = {
    count: bigint | null
  }
}

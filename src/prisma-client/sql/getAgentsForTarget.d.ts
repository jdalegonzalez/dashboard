import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const getAgentsForTarget: (text: string) => $runtime.TypedSql<getAgentsForTarget.Parameters, getAgentsForTarget.Result>

export namespace getAgentsForTarget {
  export type Parameters = [text: string]
  export type Result = {
    id: string
    name: string
  }
}

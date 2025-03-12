import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const getTargetsForAgent: (text: string) => $runtime.TypedSql<getTargetsForAgent.Parameters, getTargetsForAgent.Result>

export namespace getTargetsForAgent {
  export type Parameters = [text: string]
  export type Result = {
    id: string
    name: string
  }
}

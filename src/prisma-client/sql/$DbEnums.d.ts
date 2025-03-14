export interface $DbEnums {}


export namespace $DbEnums {
  type Status = "CRAWLING" | "SCANNING" | "IDLE" | "ERRORED" | "MISSING" | "PENDING" | "STOPPED"
  type Severity = "HINT" | "WARNING" | "ERROR" | "FATAL"
  type Confidence = "HIGH" | "MEDIUM" | "LOW" | "NONE"
}


Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AgentsToTargetScalarFieldEnum = {
  targetId: 'targetId',
  agentId: 'agentId',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TargetScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  root: 'root',
  name: 'name',
  skip_completed: 'skip_completed',
  max_workers: 'max_workers',
  mem_thresh: 'mem_thresh',
  use_history: 'use_history',
  default_timeout: 'default_timeout'
};

exports.Prisma.AgentScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name: 'name',
  location: 'location',
  status: 'status',
  os: 'os',
  os_version: 'os_version',
  arch: 'arch',
  processor: 'processor',
  cores: 'cores',
  logical_cpus: 'logical_cpus',
  ram_gb: 'ram_gb'
};

exports.Prisma.CrawlScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  targeted_date: 'targeted_date',
  result_folder: 'result_folder',
  root_path: 'root_path',
  use_history: 'use_history',
  file_count: 'file_count',
  dir_count: 'dir_count',
  total_size: 'total_size',
  scan_size: 'scan_size',
  largest_file_size: 'largest_file_size',
  largest_file_path: 'largest_file_path',
  extensions: 'extensions',
  start_time: 'start_time',
  end_time: 'end_time',
  throughput: 'throughput',
  unsupported_files: 'unsupported_files',
  targetId: 'targetId'
};

exports.Prisma.CrawlErrorScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  error_name: 'error_name',
  error_desc: 'error_desc',
  file: 'file',
  crawlId: 'crawlId'
};

exports.Prisma.CrawlHashScalarFieldEnum = {
  hash: 'hash',
  created_at: 'created_at',
  updated_at: 'updated_at',
  file_paths: 'file_paths',
  bsize: 'bsize',
  format: 'format',
  crawlId: 'crawlId'
};

exports.Prisma.ScanScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  targeted_date: 'targeted_date',
  result_folder: 'result_folder',
  root_path: 'root_path',
  start_time: 'start_time',
  end_time: 'end_time',
  matches: 'matches',
  timeouts: 'timeouts',
  gigs_per_second: 'gigs_per_second',
  targetId: 'targetId'
};

exports.Prisma.ScanErrorScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  occurred_at: 'occurred_at',
  severity: 'severity',
  error_name: 'error_name',
  error_desc: 'error_desc',
  file: 'file',
  scanId: 'scanId'
};

exports.Prisma.ScanResultScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  hash: 'hash',
  file_path: 'file_path',
  mime_type: 'mime_type',
  bsize: 'bsize',
  processed: 'processed',
  errored: 'errored',
  match: 'match',
  confidence: 'confidence',
  scanId: 'scanId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Status = exports.$Enums.Status = {
  CRAWLING: 'CRAWLING',
  SCANNING: 'SCANNING',
  IDLE: 'IDLE',
  ERRORED: 'ERRORED',
  MISSING: 'MISSING',
  PENDING: 'PENDING',
  STOPPED: 'STOPPED'
};

exports.Severity = exports.$Enums.Severity = {
  HINT: 'HINT',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

exports.Confidence = exports.$Enums.Confidence = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
  NONE: 'NONE'
};

exports.Prisma.ModelName = {
  AgentsToTarget: 'AgentsToTarget',
  Target: 'Target',
  Agent: 'Agent',
  Crawl: 'Crawl',
  CrawlError: 'CrawlError',
  CrawlHash: 'CrawlHash',
  Scan: 'Scan',
  ScanError: 'ScanError',
  ScanResult: 'ScanResult'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

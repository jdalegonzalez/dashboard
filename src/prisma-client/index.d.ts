
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Target
 * 
 */
export type Target = $Result.DefaultSelection<Prisma.$TargetPayload>
/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model Crawl
 * 
 */
export type Crawl = $Result.DefaultSelection<Prisma.$CrawlPayload>
/**
 * Model CrawlError
 * 
 */
export type CrawlError = $Result.DefaultSelection<Prisma.$CrawlErrorPayload>
/**
 * Model CrawlHash
 * 
 */
export type CrawlHash = $Result.DefaultSelection<Prisma.$CrawlHashPayload>
/**
 * Model Scan
 * 
 */
export type Scan = $Result.DefaultSelection<Prisma.$ScanPayload>
/**
 * Model ScanError
 * 
 */
export type ScanError = $Result.DefaultSelection<Prisma.$ScanErrorPayload>
/**
 * Model ScanResult
 * 
 */
export type ScanResult = $Result.DefaultSelection<Prisma.$ScanResultPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Status: {
  CRAWLING: 'CRAWLING',
  SCANNING: 'SCANNING',
  IDLE: 'IDLE',
  ERRORED: 'ERRORED',
  MISSING: 'MISSING',
  PENDING: 'PENDING',
  STOPPED: 'STOPPED'
};

export type Status = (typeof Status)[keyof typeof Status]


export const Severity: {
  HINT: 'HINT',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

export type Severity = (typeof Severity)[keyof typeof Severity]


export const Confidence: {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
  NONE: 'NONE'
};

export type Confidence = (typeof Confidence)[keyof typeof Confidence]

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type Severity = $Enums.Severity

export const Severity: typeof $Enums.Severity

export type Confidence = $Enums.Confidence

export const Confidence: typeof $Enums.Confidence

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Targets
 * const targets = await prisma.target.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Targets
   * const targets = await prisma.target.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Executes a typed SQL query and returns a typed result
   * @example
   * ```
   * import { myQuery } from '@prisma/client/sql'
   * 
   * const result = await prisma.$queryRawTyped(myQuery())
   * ```
   */
  $queryRawTyped<T>(typedSql: runtime.TypedSql<unknown[], T>): Prisma.PrismaPromise<T[]>

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.target`: Exposes CRUD operations for the **Target** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Targets
    * const targets = await prisma.target.findMany()
    * ```
    */
  get target(): Prisma.TargetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.crawl`: Exposes CRUD operations for the **Crawl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crawls
    * const crawls = await prisma.crawl.findMany()
    * ```
    */
  get crawl(): Prisma.CrawlDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.crawlError`: Exposes CRUD operations for the **CrawlError** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CrawlErrors
    * const crawlErrors = await prisma.crawlError.findMany()
    * ```
    */
  get crawlError(): Prisma.CrawlErrorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.crawlHash`: Exposes CRUD operations for the **CrawlHash** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CrawlHashes
    * const crawlHashes = await prisma.crawlHash.findMany()
    * ```
    */
  get crawlHash(): Prisma.CrawlHashDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scan`: Exposes CRUD operations for the **Scan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scans
    * const scans = await prisma.scan.findMany()
    * ```
    */
  get scan(): Prisma.ScanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scanError`: Exposes CRUD operations for the **ScanError** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScanErrors
    * const scanErrors = await prisma.scanError.findMany()
    * ```
    */
  get scanError(): Prisma.ScanErrorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scanResult`: Exposes CRUD operations for the **ScanResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScanResults
    * const scanResults = await prisma.scanResult.findMany()
    * ```
    */
  get scanResult(): Prisma.ScanResultDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.1
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Target: 'Target',
    Agent: 'Agent',
    Crawl: 'Crawl',
    CrawlError: 'CrawlError',
    CrawlHash: 'CrawlHash',
    Scan: 'Scan',
    ScanError: 'ScanError',
    ScanResult: 'ScanResult'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "target" | "agent" | "crawl" | "crawlError" | "crawlHash" | "scan" | "scanError" | "scanResult"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Target: {
        payload: Prisma.$TargetPayload<ExtArgs>
        fields: Prisma.TargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          findFirst: {
            args: Prisma.TargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          findMany: {
            args: Prisma.TargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          create: {
            args: Prisma.TargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          createMany: {
            args: Prisma.TargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          delete: {
            args: Prisma.TargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          update: {
            args: Prisma.TargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          deleteMany: {
            args: Prisma.TargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TargetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>[]
          }
          upsert: {
            args: Prisma.TargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetPayload>
          }
          aggregate: {
            args: Prisma.TargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTarget>
          }
          groupBy: {
            args: Prisma.TargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<TargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.TargetCountArgs<ExtArgs>
            result: $Utils.Optional<TargetCountAggregateOutputType> | number
          }
        }
      }
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      Crawl: {
        payload: Prisma.$CrawlPayload<ExtArgs>
        fields: Prisma.CrawlFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrawlFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrawlFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          findFirst: {
            args: Prisma.CrawlFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrawlFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          findMany: {
            args: Prisma.CrawlFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>[]
          }
          create: {
            args: Prisma.CrawlCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          createMany: {
            args: Prisma.CrawlCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CrawlCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>[]
          }
          delete: {
            args: Prisma.CrawlDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          update: {
            args: Prisma.CrawlUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          deleteMany: {
            args: Prisma.CrawlDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CrawlUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CrawlUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>[]
          }
          upsert: {
            args: Prisma.CrawlUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          aggregate: {
            args: Prisma.CrawlAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrawl>
          }
          groupBy: {
            args: Prisma.CrawlGroupByArgs<ExtArgs>
            result: $Utils.Optional<CrawlGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrawlCountArgs<ExtArgs>
            result: $Utils.Optional<CrawlCountAggregateOutputType> | number
          }
        }
      }
      CrawlError: {
        payload: Prisma.$CrawlErrorPayload<ExtArgs>
        fields: Prisma.CrawlErrorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrawlErrorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrawlErrorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>
          }
          findFirst: {
            args: Prisma.CrawlErrorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrawlErrorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>
          }
          findMany: {
            args: Prisma.CrawlErrorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>[]
          }
          create: {
            args: Prisma.CrawlErrorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>
          }
          createMany: {
            args: Prisma.CrawlErrorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CrawlErrorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>[]
          }
          delete: {
            args: Prisma.CrawlErrorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>
          }
          update: {
            args: Prisma.CrawlErrorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>
          }
          deleteMany: {
            args: Prisma.CrawlErrorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CrawlErrorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CrawlErrorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>[]
          }
          upsert: {
            args: Prisma.CrawlErrorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlErrorPayload>
          }
          aggregate: {
            args: Prisma.CrawlErrorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrawlError>
          }
          groupBy: {
            args: Prisma.CrawlErrorGroupByArgs<ExtArgs>
            result: $Utils.Optional<CrawlErrorGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrawlErrorCountArgs<ExtArgs>
            result: $Utils.Optional<CrawlErrorCountAggregateOutputType> | number
          }
        }
      }
      CrawlHash: {
        payload: Prisma.$CrawlHashPayload<ExtArgs>
        fields: Prisma.CrawlHashFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrawlHashFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrawlHashFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>
          }
          findFirst: {
            args: Prisma.CrawlHashFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrawlHashFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>
          }
          findMany: {
            args: Prisma.CrawlHashFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>[]
          }
          create: {
            args: Prisma.CrawlHashCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>
          }
          createMany: {
            args: Prisma.CrawlHashCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CrawlHashCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>[]
          }
          delete: {
            args: Prisma.CrawlHashDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>
          }
          update: {
            args: Prisma.CrawlHashUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>
          }
          deleteMany: {
            args: Prisma.CrawlHashDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CrawlHashUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CrawlHashUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>[]
          }
          upsert: {
            args: Prisma.CrawlHashUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlHashPayload>
          }
          aggregate: {
            args: Prisma.CrawlHashAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrawlHash>
          }
          groupBy: {
            args: Prisma.CrawlHashGroupByArgs<ExtArgs>
            result: $Utils.Optional<CrawlHashGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrawlHashCountArgs<ExtArgs>
            result: $Utils.Optional<CrawlHashCountAggregateOutputType> | number
          }
        }
      }
      Scan: {
        payload: Prisma.$ScanPayload<ExtArgs>
        fields: Prisma.ScanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          findFirst: {
            args: Prisma.ScanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          findMany: {
            args: Prisma.ScanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          create: {
            args: Prisma.ScanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          createMany: {
            args: Prisma.ScanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          delete: {
            args: Prisma.ScanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          update: {
            args: Prisma.ScanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          deleteMany: {
            args: Prisma.ScanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          upsert: {
            args: Prisma.ScanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          aggregate: {
            args: Prisma.ScanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScan>
          }
          groupBy: {
            args: Prisma.ScanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanCountArgs<ExtArgs>
            result: $Utils.Optional<ScanCountAggregateOutputType> | number
          }
        }
      }
      ScanError: {
        payload: Prisma.$ScanErrorPayload<ExtArgs>
        fields: Prisma.ScanErrorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanErrorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanErrorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>
          }
          findFirst: {
            args: Prisma.ScanErrorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanErrorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>
          }
          findMany: {
            args: Prisma.ScanErrorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>[]
          }
          create: {
            args: Prisma.ScanErrorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>
          }
          createMany: {
            args: Prisma.ScanErrorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScanErrorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>[]
          }
          delete: {
            args: Prisma.ScanErrorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>
          }
          update: {
            args: Prisma.ScanErrorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>
          }
          deleteMany: {
            args: Prisma.ScanErrorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanErrorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScanErrorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>[]
          }
          upsert: {
            args: Prisma.ScanErrorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanErrorPayload>
          }
          aggregate: {
            args: Prisma.ScanErrorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScanError>
          }
          groupBy: {
            args: Prisma.ScanErrorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanErrorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanErrorCountArgs<ExtArgs>
            result: $Utils.Optional<ScanErrorCountAggregateOutputType> | number
          }
        }
      }
      ScanResult: {
        payload: Prisma.$ScanResultPayload<ExtArgs>
        fields: Prisma.ScanResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>
          }
          findFirst: {
            args: Prisma.ScanResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>
          }
          findMany: {
            args: Prisma.ScanResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>[]
          }
          create: {
            args: Prisma.ScanResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>
          }
          createMany: {
            args: Prisma.ScanResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScanResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>[]
          }
          delete: {
            args: Prisma.ScanResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>
          }
          update: {
            args: Prisma.ScanResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>
          }
          deleteMany: {
            args: Prisma.ScanResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScanResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>[]
          }
          upsert: {
            args: Prisma.ScanResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanResultPayload>
          }
          aggregate: {
            args: Prisma.ScanResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScanResult>
          }
          groupBy: {
            args: Prisma.ScanResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanResultCountArgs<ExtArgs>
            result: $Utils.Optional<ScanResultCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRawTyped: {
          args: runtime.UnknownTypedSql,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    target?: TargetOmit
    agent?: AgentOmit
    crawl?: CrawlOmit
    crawlError?: CrawlErrorOmit
    crawlHash?: CrawlHashOmit
    scan?: ScanOmit
    scanError?: ScanErrorOmit
    scanResult?: ScanResultOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TargetCountOutputType
   */

  export type TargetCountOutputType = {
    crawls: number
    scans: number
  }

  export type TargetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawls?: boolean | TargetCountOutputTypeCountCrawlsArgs
    scans?: boolean | TargetCountOutputTypeCountScansArgs
  }

  // Custom InputTypes
  /**
   * TargetCountOutputType without action
   */
  export type TargetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetCountOutputType
     */
    select?: TargetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TargetCountOutputType without action
   */
  export type TargetCountOutputTypeCountCrawlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlWhereInput
  }

  /**
   * TargetCountOutputType without action
   */
  export type TargetCountOutputTypeCountScansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanWhereInput
  }


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    targets: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targets?: boolean | AgentCountOutputTypeCountTargetsArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountTargetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TargetWhereInput
  }


  /**
   * Count Type CrawlCountOutputType
   */

  export type CrawlCountOutputType = {
    errors: number
    hashes: number
  }

  export type CrawlCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    errors?: boolean | CrawlCountOutputTypeCountErrorsArgs
    hashes?: boolean | CrawlCountOutputTypeCountHashesArgs
  }

  // Custom InputTypes
  /**
   * CrawlCountOutputType without action
   */
  export type CrawlCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlCountOutputType
     */
    select?: CrawlCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CrawlCountOutputType without action
   */
  export type CrawlCountOutputTypeCountErrorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlErrorWhereInput
  }

  /**
   * CrawlCountOutputType without action
   */
  export type CrawlCountOutputTypeCountHashesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlHashWhereInput
  }


  /**
   * Count Type ScanCountOutputType
   */

  export type ScanCountOutputType = {
    errors: number
    results: number
  }

  export type ScanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    errors?: boolean | ScanCountOutputTypeCountErrorsArgs
    results?: boolean | ScanCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * ScanCountOutputType without action
   */
  export type ScanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanCountOutputType
     */
    select?: ScanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScanCountOutputType without action
   */
  export type ScanCountOutputTypeCountErrorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanErrorWhereInput
  }

  /**
   * ScanCountOutputType without action
   */
  export type ScanCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanResultWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Target
   */

  export type AggregateTarget = {
    _count: TargetCountAggregateOutputType | null
    _avg: TargetAvgAggregateOutputType | null
    _sum: TargetSumAggregateOutputType | null
    _min: TargetMinAggregateOutputType | null
    _max: TargetMaxAggregateOutputType | null
  }

  export type TargetAvgAggregateOutputType = {
    max_workers: number | null
    mem_thresh: number | null
    default_timeout: number | null
  }

  export type TargetSumAggregateOutputType = {
    max_workers: number | null
    mem_thresh: number | null
    default_timeout: number | null
  }

  export type TargetMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    skip_completed: boolean | null
    max_workers: number | null
    mem_thresh: number | null
    use_history: boolean | null
    default_timeout: number | null
    agentId: string | null
  }

  export type TargetMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    skip_completed: boolean | null
    max_workers: number | null
    mem_thresh: number | null
    use_history: boolean | null
    default_timeout: number | null
    agentId: string | null
  }

  export type TargetCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    roots: number
    skip_completed: number
    max_workers: number
    mem_thresh: number
    use_history: number
    default_timeout: number
    agentId: number
    _all: number
  }


  export type TargetAvgAggregateInputType = {
    max_workers?: true
    mem_thresh?: true
    default_timeout?: true
  }

  export type TargetSumAggregateInputType = {
    max_workers?: true
    mem_thresh?: true
    default_timeout?: true
  }

  export type TargetMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    skip_completed?: true
    max_workers?: true
    mem_thresh?: true
    use_history?: true
    default_timeout?: true
    agentId?: true
  }

  export type TargetMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    skip_completed?: true
    max_workers?: true
    mem_thresh?: true
    use_history?: true
    default_timeout?: true
    agentId?: true
  }

  export type TargetCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    roots?: true
    skip_completed?: true
    max_workers?: true
    mem_thresh?: true
    use_history?: true
    default_timeout?: true
    agentId?: true
    _all?: true
  }

  export type TargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Target to aggregate.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Targets
    **/
    _count?: true | TargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TargetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TargetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TargetMaxAggregateInputType
  }

  export type GetTargetAggregateType<T extends TargetAggregateArgs> = {
        [P in keyof T & keyof AggregateTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTarget[P]>
      : GetScalarType<T[P], AggregateTarget[P]>
  }




  export type TargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TargetWhereInput
    orderBy?: TargetOrderByWithAggregationInput | TargetOrderByWithAggregationInput[]
    by: TargetScalarFieldEnum[] | TargetScalarFieldEnum
    having?: TargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TargetCountAggregateInputType | true
    _avg?: TargetAvgAggregateInputType
    _sum?: TargetSumAggregateInputType
    _min?: TargetMinAggregateInputType
    _max?: TargetMaxAggregateInputType
  }

  export type TargetGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    roots: string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    agentId: string
    _count: TargetCountAggregateOutputType | null
    _avg: TargetAvgAggregateOutputType | null
    _sum: TargetSumAggregateOutputType | null
    _min: TargetMinAggregateOutputType | null
    _max: TargetMaxAggregateOutputType | null
  }

  type GetTargetGroupByPayload<T extends TargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TargetGroupByOutputType[P]>
            : GetScalarType<T[P], TargetGroupByOutputType[P]>
        }
      >
    >


  export type TargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    roots?: boolean
    skip_completed?: boolean
    max_workers?: boolean
    mem_thresh?: boolean
    use_history?: boolean
    default_timeout?: boolean
    agentId?: boolean
    crawls?: boolean | Target$crawlsArgs<ExtArgs>
    scans?: boolean | Target$scansArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    _count?: boolean | TargetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["target"]>

  export type TargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    roots?: boolean
    skip_completed?: boolean
    max_workers?: boolean
    mem_thresh?: boolean
    use_history?: boolean
    default_timeout?: boolean
    agentId?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["target"]>

  export type TargetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    roots?: boolean
    skip_completed?: boolean
    max_workers?: boolean
    mem_thresh?: boolean
    use_history?: boolean
    default_timeout?: boolean
    agentId?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["target"]>

  export type TargetSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    roots?: boolean
    skip_completed?: boolean
    max_workers?: boolean
    mem_thresh?: boolean
    use_history?: boolean
    default_timeout?: boolean
    agentId?: boolean
  }

  export type TargetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "roots" | "skip_completed" | "max_workers" | "mem_thresh" | "use_history" | "default_timeout" | "agentId", ExtArgs["result"]["target"]>
  export type TargetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawls?: boolean | Target$crawlsArgs<ExtArgs>
    scans?: boolean | Target$scansArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    _count?: boolean | TargetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TargetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type TargetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $TargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Target"
    objects: {
      crawls: Prisma.$CrawlPayload<ExtArgs>[]
      scans: Prisma.$ScanPayload<ExtArgs>[]
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      roots: string[]
      skip_completed: boolean
      max_workers: number
      mem_thresh: number
      use_history: boolean
      default_timeout: number
      agentId: string
    }, ExtArgs["result"]["target"]>
    composites: {}
  }

  type TargetGetPayload<S extends boolean | null | undefined | TargetDefaultArgs> = $Result.GetResult<Prisma.$TargetPayload, S>

  type TargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TargetCountAggregateInputType | true
    }

  export interface TargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Target'], meta: { name: 'Target' } }
    /**
     * Find zero or one Target that matches the filter.
     * @param {TargetFindUniqueArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TargetFindUniqueArgs>(args: SelectSubset<T, TargetFindUniqueArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Target that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TargetFindUniqueOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TargetFindUniqueOrThrowArgs>(args: SelectSubset<T, TargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Target that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TargetFindFirstArgs>(args?: SelectSubset<T, TargetFindFirstArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Target that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TargetFindFirstOrThrowArgs>(args?: SelectSubset<T, TargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Targets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Targets
     * const targets = await prisma.target.findMany()
     * 
     * // Get first 10 Targets
     * const targets = await prisma.target.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const targetWithIdOnly = await prisma.target.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TargetFindManyArgs>(args?: SelectSubset<T, TargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Target.
     * @param {TargetCreateArgs} args - Arguments to create a Target.
     * @example
     * // Create one Target
     * const Target = await prisma.target.create({
     *   data: {
     *     // ... data to create a Target
     *   }
     * })
     * 
     */
    create<T extends TargetCreateArgs>(args: SelectSubset<T, TargetCreateArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Targets.
     * @param {TargetCreateManyArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TargetCreateManyArgs>(args?: SelectSubset<T, TargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Targets and returns the data saved in the database.
     * @param {TargetCreateManyAndReturnArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TargetCreateManyAndReturnArgs>(args?: SelectSubset<T, TargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Target.
     * @param {TargetDeleteArgs} args - Arguments to delete one Target.
     * @example
     * // Delete one Target
     * const Target = await prisma.target.delete({
     *   where: {
     *     // ... filter to delete one Target
     *   }
     * })
     * 
     */
    delete<T extends TargetDeleteArgs>(args: SelectSubset<T, TargetDeleteArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Target.
     * @param {TargetUpdateArgs} args - Arguments to update one Target.
     * @example
     * // Update one Target
     * const target = await prisma.target.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TargetUpdateArgs>(args: SelectSubset<T, TargetUpdateArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Targets.
     * @param {TargetDeleteManyArgs} args - Arguments to filter Targets to delete.
     * @example
     * // Delete a few Targets
     * const { count } = await prisma.target.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TargetDeleteManyArgs>(args?: SelectSubset<T, TargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TargetUpdateManyArgs>(args: SelectSubset<T, TargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Targets and returns the data updated in the database.
     * @param {TargetUpdateManyAndReturnArgs} args - Arguments to update many Targets.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TargetUpdateManyAndReturnArgs>(args: SelectSubset<T, TargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Target.
     * @param {TargetUpsertArgs} args - Arguments to update or create a Target.
     * @example
     * // Update or create a Target
     * const target = await prisma.target.upsert({
     *   create: {
     *     // ... data to create a Target
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Target we want to update
     *   }
     * })
     */
    upsert<T extends TargetUpsertArgs>(args: SelectSubset<T, TargetUpsertArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetCountArgs} args - Arguments to filter Targets to count.
     * @example
     * // Count the number of Targets
     * const count = await prisma.target.count({
     *   where: {
     *     // ... the filter for the Targets we want to count
     *   }
     * })
    **/
    count<T extends TargetCountArgs>(
      args?: Subset<T, TargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TargetAggregateArgs>(args: Subset<T, TargetAggregateArgs>): Prisma.PrismaPromise<GetTargetAggregateType<T>>

    /**
     * Group by Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TargetGroupByArgs['orderBy'] }
        : { orderBy?: TargetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Target model
   */
  readonly fields: TargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Target.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    crawls<T extends Target$crawlsArgs<ExtArgs> = {}>(args?: Subset<T, Target$crawlsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    scans<T extends Target$scansArgs<ExtArgs> = {}>(args?: Subset<T, Target$scansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Target model
   */ 
  interface TargetFieldRefs {
    readonly id: FieldRef<"Target", 'String'>
    readonly created_at: FieldRef<"Target", 'DateTime'>
    readonly updated_at: FieldRef<"Target", 'DateTime'>
    readonly roots: FieldRef<"Target", 'String[]'>
    readonly skip_completed: FieldRef<"Target", 'Boolean'>
    readonly max_workers: FieldRef<"Target", 'Int'>
    readonly mem_thresh: FieldRef<"Target", 'Int'>
    readonly use_history: FieldRef<"Target", 'Boolean'>
    readonly default_timeout: FieldRef<"Target", 'Int'>
    readonly agentId: FieldRef<"Target", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Target findUnique
   */
  export type TargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target findUniqueOrThrow
   */
  export type TargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target findFirst
   */
  export type TargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Targets.
     */
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target findFirstOrThrow
   */
  export type TargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Target to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Targets.
     */
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target findMany
   */
  export type TargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter, which Targets to fetch.
     */
    where?: TargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Targets to fetch.
     */
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Targets.
     */
    cursor?: TargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Targets.
     */
    skip?: number
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Target create
   */
  export type TargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The data needed to create a Target.
     */
    data: XOR<TargetCreateInput, TargetUncheckedCreateInput>
  }

  /**
   * Target createMany
   */
  export type TargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Targets.
     */
    data: TargetCreateManyInput | TargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Target createManyAndReturn
   */
  export type TargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * The data used to create many Targets.
     */
    data: TargetCreateManyInput | TargetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Target update
   */
  export type TargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The data needed to update a Target.
     */
    data: XOR<TargetUpdateInput, TargetUncheckedUpdateInput>
    /**
     * Choose, which Target to update.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target updateMany
   */
  export type TargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Targets.
     */
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyInput>
    /**
     * Filter which Targets to update
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to update.
     */
    limit?: number
  }

  /**
   * Target updateManyAndReturn
   */
  export type TargetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * The data used to update Targets.
     */
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyInput>
    /**
     * Filter which Targets to update
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Target upsert
   */
  export type TargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * The filter to search for the Target to update in case it exists.
     */
    where: TargetWhereUniqueInput
    /**
     * In case the Target found by the `where` argument doesn't exist, create a new Target with this data.
     */
    create: XOR<TargetCreateInput, TargetUncheckedCreateInput>
    /**
     * In case the Target was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TargetUpdateInput, TargetUncheckedUpdateInput>
  }

  /**
   * Target delete
   */
  export type TargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    /**
     * Filter which Target to delete.
     */
    where: TargetWhereUniqueInput
  }

  /**
   * Target deleteMany
   */
  export type TargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Targets to delete
     */
    where?: TargetWhereInput
    /**
     * Limit how many Targets to delete.
     */
    limit?: number
  }

  /**
   * Target.crawls
   */
  export type Target$crawlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    where?: CrawlWhereInput
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    cursor?: CrawlWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CrawlScalarFieldEnum | CrawlScalarFieldEnum[]
  }

  /**
   * Target.scans
   */
  export type Target$scansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    where?: ScanWhereInput
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    cursor?: ScanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Target without action
   */
  export type TargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
  }


  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentAvgAggregateOutputType = {
    cores: number | null
    logical_cpus: number | null
    ram_gb: number | null
  }

  export type AgentSumAggregateOutputType = {
    cores: number | null
    logical_cpus: number | null
    ram_gb: number | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    location: string | null
    status: $Enums.Status | null
    os: string | null
    os_version: string | null
    arch: string | null
    processor: string | null
    cores: number | null
    logical_cpus: number | null
    ram_gb: number | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    location: string | null
    status: $Enums.Status | null
    os: string | null
    os_version: string | null
    arch: string | null
    processor: string | null
    cores: number | null
    logical_cpus: number | null
    ram_gb: number | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    name: number
    location: number
    status: number
    os: number
    os_version: number
    arch: number
    processor: number
    cores: number
    logical_cpus: number
    ram_gb: number
    _all: number
  }


  export type AgentAvgAggregateInputType = {
    cores?: true
    logical_cpus?: true
    ram_gb?: true
  }

  export type AgentSumAggregateInputType = {
    cores?: true
    logical_cpus?: true
    ram_gb?: true
  }

  export type AgentMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    location?: true
    status?: true
    os?: true
    os_version?: true
    arch?: true
    processor?: true
    cores?: true
    logical_cpus?: true
    ram_gb?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    location?: true
    status?: true
    os?: true
    os_version?: true
    arch?: true
    processor?: true
    cores?: true
    logical_cpus?: true
    ram_gb?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    location?: true
    status?: true
    os?: true
    os_version?: true
    arch?: true
    processor?: true
    cores?: true
    logical_cpus?: true
    ram_gb?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _avg?: AgentAvgAggregateInputType
    _sum?: AgentSumAggregateInputType
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    location: string
    status: $Enums.Status
    os: string
    os_version: string
    arch: string
    processor: string
    cores: number
    logical_cpus: number
    ram_gb: number
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    location?: boolean
    status?: boolean
    os?: boolean
    os_version?: boolean
    arch?: boolean
    processor?: boolean
    cores?: boolean
    logical_cpus?: boolean
    ram_gb?: boolean
    targets?: boolean | Agent$targetsArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    location?: boolean
    status?: boolean
    os?: boolean
    os_version?: boolean
    arch?: boolean
    processor?: boolean
    cores?: boolean
    logical_cpus?: boolean
    ram_gb?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    location?: boolean
    status?: boolean
    os?: boolean
    os_version?: boolean
    arch?: boolean
    processor?: boolean
    cores?: boolean
    logical_cpus?: boolean
    ram_gb?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    location?: boolean
    status?: boolean
    os?: boolean
    os_version?: boolean
    arch?: boolean
    processor?: boolean
    cores?: boolean
    logical_cpus?: boolean
    ram_gb?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "name" | "location" | "status" | "os" | "os_version" | "arch" | "processor" | "cores" | "logical_cpus" | "ram_gb", ExtArgs["result"]["agent"]>
  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targets?: boolean | Agent$targetsArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      targets: Prisma.$TargetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      name: string
      location: string
      status: $Enums.Status
      os: string
      os_version: string
      arch: string
      processor: string
      cores: number
      logical_cpus: number
      ram_gb: number
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    targets<T extends Agent$targetsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$targetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */ 
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly created_at: FieldRef<"Agent", 'DateTime'>
    readonly updated_at: FieldRef<"Agent", 'DateTime'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly location: FieldRef<"Agent", 'String'>
    readonly status: FieldRef<"Agent", 'Status'>
    readonly os: FieldRef<"Agent", 'String'>
    readonly os_version: FieldRef<"Agent", 'String'>
    readonly arch: FieldRef<"Agent", 'String'>
    readonly processor: FieldRef<"Agent", 'String'>
    readonly cores: FieldRef<"Agent", 'Int'>
    readonly logical_cpus: FieldRef<"Agent", 'Int'>
    readonly ram_gb: FieldRef<"Agent", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent.targets
   */
  export type Agent$targetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: TargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Target
     */
    omit?: TargetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TargetInclude<ExtArgs> | null
    where?: TargetWhereInput
    orderBy?: TargetOrderByWithRelationInput | TargetOrderByWithRelationInput[]
    cursor?: TargetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TargetScalarFieldEnum | TargetScalarFieldEnum[]
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model Crawl
   */

  export type AggregateCrawl = {
    _count: CrawlCountAggregateOutputType | null
    _avg: CrawlAvgAggregateOutputType | null
    _sum: CrawlSumAggregateOutputType | null
    _min: CrawlMinAggregateOutputType | null
    _max: CrawlMaxAggregateOutputType | null
  }

  export type CrawlAvgAggregateOutputType = {
    file_count: number | null
    dir_count: number | null
    total_size: number | null
    scan_size: number | null
    largest_file_size: number | null
    throughput: number | null
  }

  export type CrawlSumAggregateOutputType = {
    file_count: number | null
    dir_count: number | null
    total_size: bigint | null
    scan_size: bigint | null
    largest_file_size: bigint | null
    throughput: number | null
  }

  export type CrawlMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    targeted_date: Date | null
    result_folder: string | null
    root_path: string | null
    use_history: boolean | null
    file_count: number | null
    dir_count: number | null
    total_size: bigint | null
    scan_size: bigint | null
    largest_file_size: bigint | null
    largest_file_path: string | null
    start_time: Date | null
    end_time: Date | null
    throughput: number | null
    targetId: string | null
  }

  export type CrawlMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    targeted_date: Date | null
    result_folder: string | null
    root_path: string | null
    use_history: boolean | null
    file_count: number | null
    dir_count: number | null
    total_size: bigint | null
    scan_size: bigint | null
    largest_file_size: bigint | null
    largest_file_path: string | null
    start_time: Date | null
    end_time: Date | null
    throughput: number | null
    targetId: string | null
  }

  export type CrawlCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    targeted_date: number
    result_folder: number
    root_path: number
    use_history: number
    file_count: number
    dir_count: number
    total_size: number
    scan_size: number
    largest_file_size: number
    largest_file_path: number
    extensions: number
    start_time: number
    end_time: number
    throughput: number
    unsupported_files: number
    targetId: number
    _all: number
  }


  export type CrawlAvgAggregateInputType = {
    file_count?: true
    dir_count?: true
    total_size?: true
    scan_size?: true
    largest_file_size?: true
    throughput?: true
  }

  export type CrawlSumAggregateInputType = {
    file_count?: true
    dir_count?: true
    total_size?: true
    scan_size?: true
    largest_file_size?: true
    throughput?: true
  }

  export type CrawlMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    targeted_date?: true
    result_folder?: true
    root_path?: true
    use_history?: true
    file_count?: true
    dir_count?: true
    total_size?: true
    scan_size?: true
    largest_file_size?: true
    largest_file_path?: true
    start_time?: true
    end_time?: true
    throughput?: true
    targetId?: true
  }

  export type CrawlMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    targeted_date?: true
    result_folder?: true
    root_path?: true
    use_history?: true
    file_count?: true
    dir_count?: true
    total_size?: true
    scan_size?: true
    largest_file_size?: true
    largest_file_path?: true
    start_time?: true
    end_time?: true
    throughput?: true
    targetId?: true
  }

  export type CrawlCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    targeted_date?: true
    result_folder?: true
    root_path?: true
    use_history?: true
    file_count?: true
    dir_count?: true
    total_size?: true
    scan_size?: true
    largest_file_size?: true
    largest_file_path?: true
    extensions?: true
    start_time?: true
    end_time?: true
    throughput?: true
    unsupported_files?: true
    targetId?: true
    _all?: true
  }

  export type CrawlAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crawl to aggregate.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Crawls
    **/
    _count?: true | CrawlCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CrawlAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CrawlSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrawlMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrawlMaxAggregateInputType
  }

  export type GetCrawlAggregateType<T extends CrawlAggregateArgs> = {
        [P in keyof T & keyof AggregateCrawl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrawl[P]>
      : GetScalarType<T[P], AggregateCrawl[P]>
  }




  export type CrawlGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlWhereInput
    orderBy?: CrawlOrderByWithAggregationInput | CrawlOrderByWithAggregationInput[]
    by: CrawlScalarFieldEnum[] | CrawlScalarFieldEnum
    having?: CrawlScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrawlCountAggregateInputType | true
    _avg?: CrawlAvgAggregateInputType
    _sum?: CrawlSumAggregateInputType
    _min?: CrawlMinAggregateInputType
    _max?: CrawlMaxAggregateInputType
  }

  export type CrawlGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    targeted_date: Date
    result_folder: string
    root_path: string
    use_history: boolean
    file_count: number
    dir_count: number
    total_size: bigint
    scan_size: bigint
    largest_file_size: bigint
    largest_file_path: string
    extensions: string[]
    start_time: Date
    end_time: Date
    throughput: number
    unsupported_files: string[]
    targetId: string
    _count: CrawlCountAggregateOutputType | null
    _avg: CrawlAvgAggregateOutputType | null
    _sum: CrawlSumAggregateOutputType | null
    _min: CrawlMinAggregateOutputType | null
    _max: CrawlMaxAggregateOutputType | null
  }

  type GetCrawlGroupByPayload<T extends CrawlGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrawlGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrawlGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrawlGroupByOutputType[P]>
            : GetScalarType<T[P], CrawlGroupByOutputType[P]>
        }
      >
    >


  export type CrawlSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    use_history?: boolean
    file_count?: boolean
    dir_count?: boolean
    total_size?: boolean
    scan_size?: boolean
    largest_file_size?: boolean
    largest_file_path?: boolean
    extensions?: boolean
    start_time?: boolean
    end_time?: boolean
    throughput?: boolean
    unsupported_files?: boolean
    targetId?: boolean
    errors?: boolean | Crawl$errorsArgs<ExtArgs>
    hashes?: boolean | Crawl$hashesArgs<ExtArgs>
    target?: boolean | TargetDefaultArgs<ExtArgs>
    _count?: boolean | CrawlCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawl"]>

  export type CrawlSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    use_history?: boolean
    file_count?: boolean
    dir_count?: boolean
    total_size?: boolean
    scan_size?: boolean
    largest_file_size?: boolean
    largest_file_path?: boolean
    extensions?: boolean
    start_time?: boolean
    end_time?: boolean
    throughput?: boolean
    unsupported_files?: boolean
    targetId?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawl"]>

  export type CrawlSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    use_history?: boolean
    file_count?: boolean
    dir_count?: boolean
    total_size?: boolean
    scan_size?: boolean
    largest_file_size?: boolean
    largest_file_path?: boolean
    extensions?: boolean
    start_time?: boolean
    end_time?: boolean
    throughput?: boolean
    unsupported_files?: boolean
    targetId?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawl"]>

  export type CrawlSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    use_history?: boolean
    file_count?: boolean
    dir_count?: boolean
    total_size?: boolean
    scan_size?: boolean
    largest_file_size?: boolean
    largest_file_path?: boolean
    extensions?: boolean
    start_time?: boolean
    end_time?: boolean
    throughput?: boolean
    unsupported_files?: boolean
    targetId?: boolean
  }

  export type CrawlOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "targeted_date" | "result_folder" | "root_path" | "use_history" | "file_count" | "dir_count" | "total_size" | "scan_size" | "largest_file_size" | "largest_file_path" | "extensions" | "start_time" | "end_time" | "throughput" | "unsupported_files" | "targetId", ExtArgs["result"]["crawl"]>
  export type CrawlInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    errors?: boolean | Crawl$errorsArgs<ExtArgs>
    hashes?: boolean | Crawl$hashesArgs<ExtArgs>
    target?: boolean | TargetDefaultArgs<ExtArgs>
    _count?: boolean | CrawlCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CrawlIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }
  export type CrawlIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }

  export type $CrawlPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Crawl"
    objects: {
      errors: Prisma.$CrawlErrorPayload<ExtArgs>[]
      hashes: Prisma.$CrawlHashPayload<ExtArgs>[]
      target: Prisma.$TargetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      targeted_date: Date
      result_folder: string
      root_path: string
      use_history: boolean
      file_count: number
      dir_count: number
      total_size: bigint
      scan_size: bigint
      largest_file_size: bigint
      largest_file_path: string
      extensions: string[]
      start_time: Date
      end_time: Date
      throughput: number
      unsupported_files: string[]
      targetId: string
    }, ExtArgs["result"]["crawl"]>
    composites: {}
  }

  type CrawlGetPayload<S extends boolean | null | undefined | CrawlDefaultArgs> = $Result.GetResult<Prisma.$CrawlPayload, S>

  type CrawlCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CrawlFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CrawlCountAggregateInputType | true
    }

  export interface CrawlDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Crawl'], meta: { name: 'Crawl' } }
    /**
     * Find zero or one Crawl that matches the filter.
     * @param {CrawlFindUniqueArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CrawlFindUniqueArgs>(args: SelectSubset<T, CrawlFindUniqueArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Crawl that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CrawlFindUniqueOrThrowArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CrawlFindUniqueOrThrowArgs>(args: SelectSubset<T, CrawlFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Crawl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlFindFirstArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CrawlFindFirstArgs>(args?: SelectSubset<T, CrawlFindFirstArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Crawl that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlFindFirstOrThrowArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CrawlFindFirstOrThrowArgs>(args?: SelectSubset<T, CrawlFindFirstOrThrowArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Crawls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crawls
     * const crawls = await prisma.crawl.findMany()
     * 
     * // Get first 10 Crawls
     * const crawls = await prisma.crawl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crawlWithIdOnly = await prisma.crawl.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CrawlFindManyArgs>(args?: SelectSubset<T, CrawlFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Crawl.
     * @param {CrawlCreateArgs} args - Arguments to create a Crawl.
     * @example
     * // Create one Crawl
     * const Crawl = await prisma.crawl.create({
     *   data: {
     *     // ... data to create a Crawl
     *   }
     * })
     * 
     */
    create<T extends CrawlCreateArgs>(args: SelectSubset<T, CrawlCreateArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Crawls.
     * @param {CrawlCreateManyArgs} args - Arguments to create many Crawls.
     * @example
     * // Create many Crawls
     * const crawl = await prisma.crawl.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CrawlCreateManyArgs>(args?: SelectSubset<T, CrawlCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Crawls and returns the data saved in the database.
     * @param {CrawlCreateManyAndReturnArgs} args - Arguments to create many Crawls.
     * @example
     * // Create many Crawls
     * const crawl = await prisma.crawl.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Crawls and only return the `id`
     * const crawlWithIdOnly = await prisma.crawl.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CrawlCreateManyAndReturnArgs>(args?: SelectSubset<T, CrawlCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Crawl.
     * @param {CrawlDeleteArgs} args - Arguments to delete one Crawl.
     * @example
     * // Delete one Crawl
     * const Crawl = await prisma.crawl.delete({
     *   where: {
     *     // ... filter to delete one Crawl
     *   }
     * })
     * 
     */
    delete<T extends CrawlDeleteArgs>(args: SelectSubset<T, CrawlDeleteArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Crawl.
     * @param {CrawlUpdateArgs} args - Arguments to update one Crawl.
     * @example
     * // Update one Crawl
     * const crawl = await prisma.crawl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CrawlUpdateArgs>(args: SelectSubset<T, CrawlUpdateArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Crawls.
     * @param {CrawlDeleteManyArgs} args - Arguments to filter Crawls to delete.
     * @example
     * // Delete a few Crawls
     * const { count } = await prisma.crawl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CrawlDeleteManyArgs>(args?: SelectSubset<T, CrawlDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crawls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crawls
     * const crawl = await prisma.crawl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CrawlUpdateManyArgs>(args: SelectSubset<T, CrawlUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crawls and returns the data updated in the database.
     * @param {CrawlUpdateManyAndReturnArgs} args - Arguments to update many Crawls.
     * @example
     * // Update many Crawls
     * const crawl = await prisma.crawl.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Crawls and only return the `id`
     * const crawlWithIdOnly = await prisma.crawl.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CrawlUpdateManyAndReturnArgs>(args: SelectSubset<T, CrawlUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Crawl.
     * @param {CrawlUpsertArgs} args - Arguments to update or create a Crawl.
     * @example
     * // Update or create a Crawl
     * const crawl = await prisma.crawl.upsert({
     *   create: {
     *     // ... data to create a Crawl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crawl we want to update
     *   }
     * })
     */
    upsert<T extends CrawlUpsertArgs>(args: SelectSubset<T, CrawlUpsertArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Crawls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlCountArgs} args - Arguments to filter Crawls to count.
     * @example
     * // Count the number of Crawls
     * const count = await prisma.crawl.count({
     *   where: {
     *     // ... the filter for the Crawls we want to count
     *   }
     * })
    **/
    count<T extends CrawlCountArgs>(
      args?: Subset<T, CrawlCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrawlCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crawl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrawlAggregateArgs>(args: Subset<T, CrawlAggregateArgs>): Prisma.PrismaPromise<GetCrawlAggregateType<T>>

    /**
     * Group by Crawl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrawlGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrawlGroupByArgs['orderBy'] }
        : { orderBy?: CrawlGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrawlGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Crawl model
   */
  readonly fields: CrawlFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Crawl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrawlClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    errors<T extends Crawl$errorsArgs<ExtArgs> = {}>(args?: Subset<T, Crawl$errorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    hashes<T extends Crawl$hashesArgs<ExtArgs> = {}>(args?: Subset<T, Crawl$hashesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    target<T extends TargetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TargetDefaultArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Crawl model
   */ 
  interface CrawlFieldRefs {
    readonly id: FieldRef<"Crawl", 'String'>
    readonly created_at: FieldRef<"Crawl", 'DateTime'>
    readonly updated_at: FieldRef<"Crawl", 'DateTime'>
    readonly targeted_date: FieldRef<"Crawl", 'DateTime'>
    readonly result_folder: FieldRef<"Crawl", 'String'>
    readonly root_path: FieldRef<"Crawl", 'String'>
    readonly use_history: FieldRef<"Crawl", 'Boolean'>
    readonly file_count: FieldRef<"Crawl", 'Int'>
    readonly dir_count: FieldRef<"Crawl", 'Int'>
    readonly total_size: FieldRef<"Crawl", 'BigInt'>
    readonly scan_size: FieldRef<"Crawl", 'BigInt'>
    readonly largest_file_size: FieldRef<"Crawl", 'BigInt'>
    readonly largest_file_path: FieldRef<"Crawl", 'String'>
    readonly extensions: FieldRef<"Crawl", 'String[]'>
    readonly start_time: FieldRef<"Crawl", 'DateTime'>
    readonly end_time: FieldRef<"Crawl", 'DateTime'>
    readonly throughput: FieldRef<"Crawl", 'Float'>
    readonly unsupported_files: FieldRef<"Crawl", 'String[]'>
    readonly targetId: FieldRef<"Crawl", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Crawl findUnique
   */
  export type CrawlFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where: CrawlWhereUniqueInput
  }

  /**
   * Crawl findUniqueOrThrow
   */
  export type CrawlFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where: CrawlWhereUniqueInput
  }

  /**
   * Crawl findFirst
   */
  export type CrawlFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crawls.
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crawls.
     */
    distinct?: CrawlScalarFieldEnum | CrawlScalarFieldEnum[]
  }

  /**
   * Crawl findFirstOrThrow
   */
  export type CrawlFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crawls.
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crawls.
     */
    distinct?: CrawlScalarFieldEnum | CrawlScalarFieldEnum[]
  }

  /**
   * Crawl findMany
   */
  export type CrawlFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * Filter, which Crawls to fetch.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Crawls.
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    distinct?: CrawlScalarFieldEnum | CrawlScalarFieldEnum[]
  }

  /**
   * Crawl create
   */
  export type CrawlCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * The data needed to create a Crawl.
     */
    data: XOR<CrawlCreateInput, CrawlUncheckedCreateInput>
  }

  /**
   * Crawl createMany
   */
  export type CrawlCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Crawls.
     */
    data: CrawlCreateManyInput | CrawlCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Crawl createManyAndReturn
   */
  export type CrawlCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * The data used to create many Crawls.
     */
    data: CrawlCreateManyInput | CrawlCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Crawl update
   */
  export type CrawlUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * The data needed to update a Crawl.
     */
    data: XOR<CrawlUpdateInput, CrawlUncheckedUpdateInput>
    /**
     * Choose, which Crawl to update.
     */
    where: CrawlWhereUniqueInput
  }

  /**
   * Crawl updateMany
   */
  export type CrawlUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Crawls.
     */
    data: XOR<CrawlUpdateManyMutationInput, CrawlUncheckedUpdateManyInput>
    /**
     * Filter which Crawls to update
     */
    where?: CrawlWhereInput
    /**
     * Limit how many Crawls to update.
     */
    limit?: number
  }

  /**
   * Crawl updateManyAndReturn
   */
  export type CrawlUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * The data used to update Crawls.
     */
    data: XOR<CrawlUpdateManyMutationInput, CrawlUncheckedUpdateManyInput>
    /**
     * Filter which Crawls to update
     */
    where?: CrawlWhereInput
    /**
     * Limit how many Crawls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Crawl upsert
   */
  export type CrawlUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * The filter to search for the Crawl to update in case it exists.
     */
    where: CrawlWhereUniqueInput
    /**
     * In case the Crawl found by the `where` argument doesn't exist, create a new Crawl with this data.
     */
    create: XOR<CrawlCreateInput, CrawlUncheckedCreateInput>
    /**
     * In case the Crawl was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrawlUpdateInput, CrawlUncheckedUpdateInput>
  }

  /**
   * Crawl delete
   */
  export type CrawlDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
    /**
     * Filter which Crawl to delete.
     */
    where: CrawlWhereUniqueInput
  }

  /**
   * Crawl deleteMany
   */
  export type CrawlDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crawls to delete
     */
    where?: CrawlWhereInput
    /**
     * Limit how many Crawls to delete.
     */
    limit?: number
  }

  /**
   * Crawl.errors
   */
  export type Crawl$errorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    where?: CrawlErrorWhereInput
    orderBy?: CrawlErrorOrderByWithRelationInput | CrawlErrorOrderByWithRelationInput[]
    cursor?: CrawlErrorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CrawlErrorScalarFieldEnum | CrawlErrorScalarFieldEnum[]
  }

  /**
   * Crawl.hashes
   */
  export type Crawl$hashesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    where?: CrawlHashWhereInput
    orderBy?: CrawlHashOrderByWithRelationInput | CrawlHashOrderByWithRelationInput[]
    cursor?: CrawlHashWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CrawlHashScalarFieldEnum | CrawlHashScalarFieldEnum[]
  }

  /**
   * Crawl without action
   */
  export type CrawlDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Crawl
     */
    omit?: CrawlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlInclude<ExtArgs> | null
  }


  /**
   * Model CrawlError
   */

  export type AggregateCrawlError = {
    _count: CrawlErrorCountAggregateOutputType | null
    _min: CrawlErrorMinAggregateOutputType | null
    _max: CrawlErrorMaxAggregateOutputType | null
  }

  export type CrawlErrorMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    error_name: string | null
    error_desc: string | null
    file: string | null
    crawlId: string | null
  }

  export type CrawlErrorMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    error_name: string | null
    error_desc: string | null
    file: string | null
    crawlId: string | null
  }

  export type CrawlErrorCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    error_name: number
    error_desc: number
    file: number
    crawlId: number
    _all: number
  }


  export type CrawlErrorMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    error_name?: true
    error_desc?: true
    file?: true
    crawlId?: true
  }

  export type CrawlErrorMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    error_name?: true
    error_desc?: true
    file?: true
    crawlId?: true
  }

  export type CrawlErrorCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    error_name?: true
    error_desc?: true
    file?: true
    crawlId?: true
    _all?: true
  }

  export type CrawlErrorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlError to aggregate.
     */
    where?: CrawlErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlErrors to fetch.
     */
    orderBy?: CrawlErrorOrderByWithRelationInput | CrawlErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrawlErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlErrors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CrawlErrors
    **/
    _count?: true | CrawlErrorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrawlErrorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrawlErrorMaxAggregateInputType
  }

  export type GetCrawlErrorAggregateType<T extends CrawlErrorAggregateArgs> = {
        [P in keyof T & keyof AggregateCrawlError]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrawlError[P]>
      : GetScalarType<T[P], AggregateCrawlError[P]>
  }




  export type CrawlErrorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlErrorWhereInput
    orderBy?: CrawlErrorOrderByWithAggregationInput | CrawlErrorOrderByWithAggregationInput[]
    by: CrawlErrorScalarFieldEnum[] | CrawlErrorScalarFieldEnum
    having?: CrawlErrorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrawlErrorCountAggregateInputType | true
    _min?: CrawlErrorMinAggregateInputType
    _max?: CrawlErrorMaxAggregateInputType
  }

  export type CrawlErrorGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    error_name: string
    error_desc: string
    file: string
    crawlId: string
    _count: CrawlErrorCountAggregateOutputType | null
    _min: CrawlErrorMinAggregateOutputType | null
    _max: CrawlErrorMaxAggregateOutputType | null
  }

  type GetCrawlErrorGroupByPayload<T extends CrawlErrorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrawlErrorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrawlErrorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrawlErrorGroupByOutputType[P]>
            : GetScalarType<T[P], CrawlErrorGroupByOutputType[P]>
        }
      >
    >


  export type CrawlErrorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    crawlId?: boolean
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlError"]>

  export type CrawlErrorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    crawlId?: boolean
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlError"]>

  export type CrawlErrorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    crawlId?: boolean
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlError"]>

  export type CrawlErrorSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    crawlId?: boolean
  }

  export type CrawlErrorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "error_name" | "error_desc" | "file" | "crawlId", ExtArgs["result"]["crawlError"]>
  export type CrawlErrorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }
  export type CrawlErrorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }
  export type CrawlErrorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }

  export type $CrawlErrorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CrawlError"
    objects: {
      crawl: Prisma.$CrawlPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      error_name: string
      error_desc: string
      file: string
      crawlId: string
    }, ExtArgs["result"]["crawlError"]>
    composites: {}
  }

  type CrawlErrorGetPayload<S extends boolean | null | undefined | CrawlErrorDefaultArgs> = $Result.GetResult<Prisma.$CrawlErrorPayload, S>

  type CrawlErrorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CrawlErrorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CrawlErrorCountAggregateInputType | true
    }

  export interface CrawlErrorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CrawlError'], meta: { name: 'CrawlError' } }
    /**
     * Find zero or one CrawlError that matches the filter.
     * @param {CrawlErrorFindUniqueArgs} args - Arguments to find a CrawlError
     * @example
     * // Get one CrawlError
     * const crawlError = await prisma.crawlError.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CrawlErrorFindUniqueArgs>(args: SelectSubset<T, CrawlErrorFindUniqueArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CrawlError that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CrawlErrorFindUniqueOrThrowArgs} args - Arguments to find a CrawlError
     * @example
     * // Get one CrawlError
     * const crawlError = await prisma.crawlError.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CrawlErrorFindUniqueOrThrowArgs>(args: SelectSubset<T, CrawlErrorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CrawlError that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlErrorFindFirstArgs} args - Arguments to find a CrawlError
     * @example
     * // Get one CrawlError
     * const crawlError = await prisma.crawlError.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CrawlErrorFindFirstArgs>(args?: SelectSubset<T, CrawlErrorFindFirstArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CrawlError that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlErrorFindFirstOrThrowArgs} args - Arguments to find a CrawlError
     * @example
     * // Get one CrawlError
     * const crawlError = await prisma.crawlError.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CrawlErrorFindFirstOrThrowArgs>(args?: SelectSubset<T, CrawlErrorFindFirstOrThrowArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CrawlErrors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlErrorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CrawlErrors
     * const crawlErrors = await prisma.crawlError.findMany()
     * 
     * // Get first 10 CrawlErrors
     * const crawlErrors = await prisma.crawlError.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crawlErrorWithIdOnly = await prisma.crawlError.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CrawlErrorFindManyArgs>(args?: SelectSubset<T, CrawlErrorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CrawlError.
     * @param {CrawlErrorCreateArgs} args - Arguments to create a CrawlError.
     * @example
     * // Create one CrawlError
     * const CrawlError = await prisma.crawlError.create({
     *   data: {
     *     // ... data to create a CrawlError
     *   }
     * })
     * 
     */
    create<T extends CrawlErrorCreateArgs>(args: SelectSubset<T, CrawlErrorCreateArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CrawlErrors.
     * @param {CrawlErrorCreateManyArgs} args - Arguments to create many CrawlErrors.
     * @example
     * // Create many CrawlErrors
     * const crawlError = await prisma.crawlError.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CrawlErrorCreateManyArgs>(args?: SelectSubset<T, CrawlErrorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CrawlErrors and returns the data saved in the database.
     * @param {CrawlErrorCreateManyAndReturnArgs} args - Arguments to create many CrawlErrors.
     * @example
     * // Create many CrawlErrors
     * const crawlError = await prisma.crawlError.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CrawlErrors and only return the `id`
     * const crawlErrorWithIdOnly = await prisma.crawlError.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CrawlErrorCreateManyAndReturnArgs>(args?: SelectSubset<T, CrawlErrorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CrawlError.
     * @param {CrawlErrorDeleteArgs} args - Arguments to delete one CrawlError.
     * @example
     * // Delete one CrawlError
     * const CrawlError = await prisma.crawlError.delete({
     *   where: {
     *     // ... filter to delete one CrawlError
     *   }
     * })
     * 
     */
    delete<T extends CrawlErrorDeleteArgs>(args: SelectSubset<T, CrawlErrorDeleteArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CrawlError.
     * @param {CrawlErrorUpdateArgs} args - Arguments to update one CrawlError.
     * @example
     * // Update one CrawlError
     * const crawlError = await prisma.crawlError.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CrawlErrorUpdateArgs>(args: SelectSubset<T, CrawlErrorUpdateArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CrawlErrors.
     * @param {CrawlErrorDeleteManyArgs} args - Arguments to filter CrawlErrors to delete.
     * @example
     * // Delete a few CrawlErrors
     * const { count } = await prisma.crawlError.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CrawlErrorDeleteManyArgs>(args?: SelectSubset<T, CrawlErrorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrawlErrors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlErrorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CrawlErrors
     * const crawlError = await prisma.crawlError.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CrawlErrorUpdateManyArgs>(args: SelectSubset<T, CrawlErrorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrawlErrors and returns the data updated in the database.
     * @param {CrawlErrorUpdateManyAndReturnArgs} args - Arguments to update many CrawlErrors.
     * @example
     * // Update many CrawlErrors
     * const crawlError = await prisma.crawlError.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CrawlErrors and only return the `id`
     * const crawlErrorWithIdOnly = await prisma.crawlError.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CrawlErrorUpdateManyAndReturnArgs>(args: SelectSubset<T, CrawlErrorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CrawlError.
     * @param {CrawlErrorUpsertArgs} args - Arguments to update or create a CrawlError.
     * @example
     * // Update or create a CrawlError
     * const crawlError = await prisma.crawlError.upsert({
     *   create: {
     *     // ... data to create a CrawlError
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CrawlError we want to update
     *   }
     * })
     */
    upsert<T extends CrawlErrorUpsertArgs>(args: SelectSubset<T, CrawlErrorUpsertArgs<ExtArgs>>): Prisma__CrawlErrorClient<$Result.GetResult<Prisma.$CrawlErrorPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CrawlErrors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlErrorCountArgs} args - Arguments to filter CrawlErrors to count.
     * @example
     * // Count the number of CrawlErrors
     * const count = await prisma.crawlError.count({
     *   where: {
     *     // ... the filter for the CrawlErrors we want to count
     *   }
     * })
    **/
    count<T extends CrawlErrorCountArgs>(
      args?: Subset<T, CrawlErrorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrawlErrorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CrawlError.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlErrorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrawlErrorAggregateArgs>(args: Subset<T, CrawlErrorAggregateArgs>): Prisma.PrismaPromise<GetCrawlErrorAggregateType<T>>

    /**
     * Group by CrawlError.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlErrorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrawlErrorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrawlErrorGroupByArgs['orderBy'] }
        : { orderBy?: CrawlErrorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrawlErrorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlErrorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CrawlError model
   */
  readonly fields: CrawlErrorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CrawlError.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrawlErrorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    crawl<T extends CrawlDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CrawlDefaultArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CrawlError model
   */ 
  interface CrawlErrorFieldRefs {
    readonly id: FieldRef<"CrawlError", 'String'>
    readonly created_at: FieldRef<"CrawlError", 'DateTime'>
    readonly updated_at: FieldRef<"CrawlError", 'DateTime'>
    readonly error_name: FieldRef<"CrawlError", 'String'>
    readonly error_desc: FieldRef<"CrawlError", 'String'>
    readonly file: FieldRef<"CrawlError", 'String'>
    readonly crawlId: FieldRef<"CrawlError", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CrawlError findUnique
   */
  export type CrawlErrorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * Filter, which CrawlError to fetch.
     */
    where: CrawlErrorWhereUniqueInput
  }

  /**
   * CrawlError findUniqueOrThrow
   */
  export type CrawlErrorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * Filter, which CrawlError to fetch.
     */
    where: CrawlErrorWhereUniqueInput
  }

  /**
   * CrawlError findFirst
   */
  export type CrawlErrorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * Filter, which CrawlError to fetch.
     */
    where?: CrawlErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlErrors to fetch.
     */
    orderBy?: CrawlErrorOrderByWithRelationInput | CrawlErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlErrors.
     */
    cursor?: CrawlErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlErrors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlErrors.
     */
    distinct?: CrawlErrorScalarFieldEnum | CrawlErrorScalarFieldEnum[]
  }

  /**
   * CrawlError findFirstOrThrow
   */
  export type CrawlErrorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * Filter, which CrawlError to fetch.
     */
    where?: CrawlErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlErrors to fetch.
     */
    orderBy?: CrawlErrorOrderByWithRelationInput | CrawlErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlErrors.
     */
    cursor?: CrawlErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlErrors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlErrors.
     */
    distinct?: CrawlErrorScalarFieldEnum | CrawlErrorScalarFieldEnum[]
  }

  /**
   * CrawlError findMany
   */
  export type CrawlErrorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * Filter, which CrawlErrors to fetch.
     */
    where?: CrawlErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlErrors to fetch.
     */
    orderBy?: CrawlErrorOrderByWithRelationInput | CrawlErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CrawlErrors.
     */
    cursor?: CrawlErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlErrors.
     */
    skip?: number
    distinct?: CrawlErrorScalarFieldEnum | CrawlErrorScalarFieldEnum[]
  }

  /**
   * CrawlError create
   */
  export type CrawlErrorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * The data needed to create a CrawlError.
     */
    data: XOR<CrawlErrorCreateInput, CrawlErrorUncheckedCreateInput>
  }

  /**
   * CrawlError createMany
   */
  export type CrawlErrorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CrawlErrors.
     */
    data: CrawlErrorCreateManyInput | CrawlErrorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CrawlError createManyAndReturn
   */
  export type CrawlErrorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * The data used to create many CrawlErrors.
     */
    data: CrawlErrorCreateManyInput | CrawlErrorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrawlError update
   */
  export type CrawlErrorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * The data needed to update a CrawlError.
     */
    data: XOR<CrawlErrorUpdateInput, CrawlErrorUncheckedUpdateInput>
    /**
     * Choose, which CrawlError to update.
     */
    where: CrawlErrorWhereUniqueInput
  }

  /**
   * CrawlError updateMany
   */
  export type CrawlErrorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CrawlErrors.
     */
    data: XOR<CrawlErrorUpdateManyMutationInput, CrawlErrorUncheckedUpdateManyInput>
    /**
     * Filter which CrawlErrors to update
     */
    where?: CrawlErrorWhereInput
    /**
     * Limit how many CrawlErrors to update.
     */
    limit?: number
  }

  /**
   * CrawlError updateManyAndReturn
   */
  export type CrawlErrorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * The data used to update CrawlErrors.
     */
    data: XOR<CrawlErrorUpdateManyMutationInput, CrawlErrorUncheckedUpdateManyInput>
    /**
     * Filter which CrawlErrors to update
     */
    where?: CrawlErrorWhereInput
    /**
     * Limit how many CrawlErrors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrawlError upsert
   */
  export type CrawlErrorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * The filter to search for the CrawlError to update in case it exists.
     */
    where: CrawlErrorWhereUniqueInput
    /**
     * In case the CrawlError found by the `where` argument doesn't exist, create a new CrawlError with this data.
     */
    create: XOR<CrawlErrorCreateInput, CrawlErrorUncheckedCreateInput>
    /**
     * In case the CrawlError was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrawlErrorUpdateInput, CrawlErrorUncheckedUpdateInput>
  }

  /**
   * CrawlError delete
   */
  export type CrawlErrorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
    /**
     * Filter which CrawlError to delete.
     */
    where: CrawlErrorWhereUniqueInput
  }

  /**
   * CrawlError deleteMany
   */
  export type CrawlErrorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlErrors to delete
     */
    where?: CrawlErrorWhereInput
    /**
     * Limit how many CrawlErrors to delete.
     */
    limit?: number
  }

  /**
   * CrawlError without action
   */
  export type CrawlErrorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlError
     */
    select?: CrawlErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlError
     */
    omit?: CrawlErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlErrorInclude<ExtArgs> | null
  }


  /**
   * Model CrawlHash
   */

  export type AggregateCrawlHash = {
    _count: CrawlHashCountAggregateOutputType | null
    _avg: CrawlHashAvgAggregateOutputType | null
    _sum: CrawlHashSumAggregateOutputType | null
    _min: CrawlHashMinAggregateOutputType | null
    _max: CrawlHashMaxAggregateOutputType | null
  }

  export type CrawlHashAvgAggregateOutputType = {
    bsize: number | null
  }

  export type CrawlHashSumAggregateOutputType = {
    bsize: number | null
  }

  export type CrawlHashMinAggregateOutputType = {
    hash: string | null
    created_at: Date | null
    updated_at: Date | null
    bsize: number | null
    format: string | null
    crawlId: string | null
  }

  export type CrawlHashMaxAggregateOutputType = {
    hash: string | null
    created_at: Date | null
    updated_at: Date | null
    bsize: number | null
    format: string | null
    crawlId: string | null
  }

  export type CrawlHashCountAggregateOutputType = {
    hash: number
    created_at: number
    updated_at: number
    file_paths: number
    bsize: number
    format: number
    crawlId: number
    _all: number
  }


  export type CrawlHashAvgAggregateInputType = {
    bsize?: true
  }

  export type CrawlHashSumAggregateInputType = {
    bsize?: true
  }

  export type CrawlHashMinAggregateInputType = {
    hash?: true
    created_at?: true
    updated_at?: true
    bsize?: true
    format?: true
    crawlId?: true
  }

  export type CrawlHashMaxAggregateInputType = {
    hash?: true
    created_at?: true
    updated_at?: true
    bsize?: true
    format?: true
    crawlId?: true
  }

  export type CrawlHashCountAggregateInputType = {
    hash?: true
    created_at?: true
    updated_at?: true
    file_paths?: true
    bsize?: true
    format?: true
    crawlId?: true
    _all?: true
  }

  export type CrawlHashAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlHash to aggregate.
     */
    where?: CrawlHashWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlHashes to fetch.
     */
    orderBy?: CrawlHashOrderByWithRelationInput | CrawlHashOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrawlHashWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlHashes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlHashes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CrawlHashes
    **/
    _count?: true | CrawlHashCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CrawlHashAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CrawlHashSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrawlHashMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrawlHashMaxAggregateInputType
  }

  export type GetCrawlHashAggregateType<T extends CrawlHashAggregateArgs> = {
        [P in keyof T & keyof AggregateCrawlHash]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrawlHash[P]>
      : GetScalarType<T[P], AggregateCrawlHash[P]>
  }




  export type CrawlHashGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlHashWhereInput
    orderBy?: CrawlHashOrderByWithAggregationInput | CrawlHashOrderByWithAggregationInput[]
    by: CrawlHashScalarFieldEnum[] | CrawlHashScalarFieldEnum
    having?: CrawlHashScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrawlHashCountAggregateInputType | true
    _avg?: CrawlHashAvgAggregateInputType
    _sum?: CrawlHashSumAggregateInputType
    _min?: CrawlHashMinAggregateInputType
    _max?: CrawlHashMaxAggregateInputType
  }

  export type CrawlHashGroupByOutputType = {
    hash: string
    created_at: Date
    updated_at: Date
    file_paths: string[]
    bsize: number
    format: string
    crawlId: string
    _count: CrawlHashCountAggregateOutputType | null
    _avg: CrawlHashAvgAggregateOutputType | null
    _sum: CrawlHashSumAggregateOutputType | null
    _min: CrawlHashMinAggregateOutputType | null
    _max: CrawlHashMaxAggregateOutputType | null
  }

  type GetCrawlHashGroupByPayload<T extends CrawlHashGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrawlHashGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrawlHashGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrawlHashGroupByOutputType[P]>
            : GetScalarType<T[P], CrawlHashGroupByOutputType[P]>
        }
      >
    >


  export type CrawlHashSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hash?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_paths?: boolean
    bsize?: boolean
    format?: boolean
    crawlId?: boolean
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlHash"]>

  export type CrawlHashSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hash?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_paths?: boolean
    bsize?: boolean
    format?: boolean
    crawlId?: boolean
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlHash"]>

  export type CrawlHashSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hash?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_paths?: boolean
    bsize?: boolean
    format?: boolean
    crawlId?: boolean
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlHash"]>

  export type CrawlHashSelectScalar = {
    hash?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_paths?: boolean
    bsize?: boolean
    format?: boolean
    crawlId?: boolean
  }

  export type CrawlHashOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"hash" | "created_at" | "updated_at" | "file_paths" | "bsize" | "format" | "crawlId", ExtArgs["result"]["crawlHash"]>
  export type CrawlHashInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }
  export type CrawlHashIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }
  export type CrawlHashIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawl?: boolean | CrawlDefaultArgs<ExtArgs>
  }

  export type $CrawlHashPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CrawlHash"
    objects: {
      crawl: Prisma.$CrawlPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      hash: string
      created_at: Date
      updated_at: Date
      file_paths: string[]
      bsize: number
      format: string
      crawlId: string
    }, ExtArgs["result"]["crawlHash"]>
    composites: {}
  }

  type CrawlHashGetPayload<S extends boolean | null | undefined | CrawlHashDefaultArgs> = $Result.GetResult<Prisma.$CrawlHashPayload, S>

  type CrawlHashCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CrawlHashFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CrawlHashCountAggregateInputType | true
    }

  export interface CrawlHashDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CrawlHash'], meta: { name: 'CrawlHash' } }
    /**
     * Find zero or one CrawlHash that matches the filter.
     * @param {CrawlHashFindUniqueArgs} args - Arguments to find a CrawlHash
     * @example
     * // Get one CrawlHash
     * const crawlHash = await prisma.crawlHash.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CrawlHashFindUniqueArgs>(args: SelectSubset<T, CrawlHashFindUniqueArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CrawlHash that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CrawlHashFindUniqueOrThrowArgs} args - Arguments to find a CrawlHash
     * @example
     * // Get one CrawlHash
     * const crawlHash = await prisma.crawlHash.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CrawlHashFindUniqueOrThrowArgs>(args: SelectSubset<T, CrawlHashFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CrawlHash that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlHashFindFirstArgs} args - Arguments to find a CrawlHash
     * @example
     * // Get one CrawlHash
     * const crawlHash = await prisma.crawlHash.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CrawlHashFindFirstArgs>(args?: SelectSubset<T, CrawlHashFindFirstArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CrawlHash that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlHashFindFirstOrThrowArgs} args - Arguments to find a CrawlHash
     * @example
     * // Get one CrawlHash
     * const crawlHash = await prisma.crawlHash.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CrawlHashFindFirstOrThrowArgs>(args?: SelectSubset<T, CrawlHashFindFirstOrThrowArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CrawlHashes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlHashFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CrawlHashes
     * const crawlHashes = await prisma.crawlHash.findMany()
     * 
     * // Get first 10 CrawlHashes
     * const crawlHashes = await prisma.crawlHash.findMany({ take: 10 })
     * 
     * // Only select the `hash`
     * const crawlHashWithHashOnly = await prisma.crawlHash.findMany({ select: { hash: true } })
     * 
     */
    findMany<T extends CrawlHashFindManyArgs>(args?: SelectSubset<T, CrawlHashFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CrawlHash.
     * @param {CrawlHashCreateArgs} args - Arguments to create a CrawlHash.
     * @example
     * // Create one CrawlHash
     * const CrawlHash = await prisma.crawlHash.create({
     *   data: {
     *     // ... data to create a CrawlHash
     *   }
     * })
     * 
     */
    create<T extends CrawlHashCreateArgs>(args: SelectSubset<T, CrawlHashCreateArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CrawlHashes.
     * @param {CrawlHashCreateManyArgs} args - Arguments to create many CrawlHashes.
     * @example
     * // Create many CrawlHashes
     * const crawlHash = await prisma.crawlHash.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CrawlHashCreateManyArgs>(args?: SelectSubset<T, CrawlHashCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CrawlHashes and returns the data saved in the database.
     * @param {CrawlHashCreateManyAndReturnArgs} args - Arguments to create many CrawlHashes.
     * @example
     * // Create many CrawlHashes
     * const crawlHash = await prisma.crawlHash.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CrawlHashes and only return the `hash`
     * const crawlHashWithHashOnly = await prisma.crawlHash.createManyAndReturn({
     *   select: { hash: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CrawlHashCreateManyAndReturnArgs>(args?: SelectSubset<T, CrawlHashCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CrawlHash.
     * @param {CrawlHashDeleteArgs} args - Arguments to delete one CrawlHash.
     * @example
     * // Delete one CrawlHash
     * const CrawlHash = await prisma.crawlHash.delete({
     *   where: {
     *     // ... filter to delete one CrawlHash
     *   }
     * })
     * 
     */
    delete<T extends CrawlHashDeleteArgs>(args: SelectSubset<T, CrawlHashDeleteArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CrawlHash.
     * @param {CrawlHashUpdateArgs} args - Arguments to update one CrawlHash.
     * @example
     * // Update one CrawlHash
     * const crawlHash = await prisma.crawlHash.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CrawlHashUpdateArgs>(args: SelectSubset<T, CrawlHashUpdateArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CrawlHashes.
     * @param {CrawlHashDeleteManyArgs} args - Arguments to filter CrawlHashes to delete.
     * @example
     * // Delete a few CrawlHashes
     * const { count } = await prisma.crawlHash.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CrawlHashDeleteManyArgs>(args?: SelectSubset<T, CrawlHashDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrawlHashes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlHashUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CrawlHashes
     * const crawlHash = await prisma.crawlHash.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CrawlHashUpdateManyArgs>(args: SelectSubset<T, CrawlHashUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrawlHashes and returns the data updated in the database.
     * @param {CrawlHashUpdateManyAndReturnArgs} args - Arguments to update many CrawlHashes.
     * @example
     * // Update many CrawlHashes
     * const crawlHash = await prisma.crawlHash.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CrawlHashes and only return the `hash`
     * const crawlHashWithHashOnly = await prisma.crawlHash.updateManyAndReturn({
     *   select: { hash: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CrawlHashUpdateManyAndReturnArgs>(args: SelectSubset<T, CrawlHashUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CrawlHash.
     * @param {CrawlHashUpsertArgs} args - Arguments to update or create a CrawlHash.
     * @example
     * // Update or create a CrawlHash
     * const crawlHash = await prisma.crawlHash.upsert({
     *   create: {
     *     // ... data to create a CrawlHash
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CrawlHash we want to update
     *   }
     * })
     */
    upsert<T extends CrawlHashUpsertArgs>(args: SelectSubset<T, CrawlHashUpsertArgs<ExtArgs>>): Prisma__CrawlHashClient<$Result.GetResult<Prisma.$CrawlHashPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CrawlHashes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlHashCountArgs} args - Arguments to filter CrawlHashes to count.
     * @example
     * // Count the number of CrawlHashes
     * const count = await prisma.crawlHash.count({
     *   where: {
     *     // ... the filter for the CrawlHashes we want to count
     *   }
     * })
    **/
    count<T extends CrawlHashCountArgs>(
      args?: Subset<T, CrawlHashCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrawlHashCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CrawlHash.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlHashAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrawlHashAggregateArgs>(args: Subset<T, CrawlHashAggregateArgs>): Prisma.PrismaPromise<GetCrawlHashAggregateType<T>>

    /**
     * Group by CrawlHash.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlHashGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrawlHashGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrawlHashGroupByArgs['orderBy'] }
        : { orderBy?: CrawlHashGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrawlHashGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlHashGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CrawlHash model
   */
  readonly fields: CrawlHashFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CrawlHash.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrawlHashClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    crawl<T extends CrawlDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CrawlDefaultArgs<ExtArgs>>): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CrawlHash model
   */ 
  interface CrawlHashFieldRefs {
    readonly hash: FieldRef<"CrawlHash", 'String'>
    readonly created_at: FieldRef<"CrawlHash", 'DateTime'>
    readonly updated_at: FieldRef<"CrawlHash", 'DateTime'>
    readonly file_paths: FieldRef<"CrawlHash", 'String[]'>
    readonly bsize: FieldRef<"CrawlHash", 'Int'>
    readonly format: FieldRef<"CrawlHash", 'String'>
    readonly crawlId: FieldRef<"CrawlHash", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CrawlHash findUnique
   */
  export type CrawlHashFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * Filter, which CrawlHash to fetch.
     */
    where: CrawlHashWhereUniqueInput
  }

  /**
   * CrawlHash findUniqueOrThrow
   */
  export type CrawlHashFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * Filter, which CrawlHash to fetch.
     */
    where: CrawlHashWhereUniqueInput
  }

  /**
   * CrawlHash findFirst
   */
  export type CrawlHashFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * Filter, which CrawlHash to fetch.
     */
    where?: CrawlHashWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlHashes to fetch.
     */
    orderBy?: CrawlHashOrderByWithRelationInput | CrawlHashOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlHashes.
     */
    cursor?: CrawlHashWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlHashes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlHashes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlHashes.
     */
    distinct?: CrawlHashScalarFieldEnum | CrawlHashScalarFieldEnum[]
  }

  /**
   * CrawlHash findFirstOrThrow
   */
  export type CrawlHashFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * Filter, which CrawlHash to fetch.
     */
    where?: CrawlHashWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlHashes to fetch.
     */
    orderBy?: CrawlHashOrderByWithRelationInput | CrawlHashOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlHashes.
     */
    cursor?: CrawlHashWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlHashes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlHashes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlHashes.
     */
    distinct?: CrawlHashScalarFieldEnum | CrawlHashScalarFieldEnum[]
  }

  /**
   * CrawlHash findMany
   */
  export type CrawlHashFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * Filter, which CrawlHashes to fetch.
     */
    where?: CrawlHashWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlHashes to fetch.
     */
    orderBy?: CrawlHashOrderByWithRelationInput | CrawlHashOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CrawlHashes.
     */
    cursor?: CrawlHashWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlHashes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlHashes.
     */
    skip?: number
    distinct?: CrawlHashScalarFieldEnum | CrawlHashScalarFieldEnum[]
  }

  /**
   * CrawlHash create
   */
  export type CrawlHashCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * The data needed to create a CrawlHash.
     */
    data: XOR<CrawlHashCreateInput, CrawlHashUncheckedCreateInput>
  }

  /**
   * CrawlHash createMany
   */
  export type CrawlHashCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CrawlHashes.
     */
    data: CrawlHashCreateManyInput | CrawlHashCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CrawlHash createManyAndReturn
   */
  export type CrawlHashCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * The data used to create many CrawlHashes.
     */
    data: CrawlHashCreateManyInput | CrawlHashCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrawlHash update
   */
  export type CrawlHashUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * The data needed to update a CrawlHash.
     */
    data: XOR<CrawlHashUpdateInput, CrawlHashUncheckedUpdateInput>
    /**
     * Choose, which CrawlHash to update.
     */
    where: CrawlHashWhereUniqueInput
  }

  /**
   * CrawlHash updateMany
   */
  export type CrawlHashUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CrawlHashes.
     */
    data: XOR<CrawlHashUpdateManyMutationInput, CrawlHashUncheckedUpdateManyInput>
    /**
     * Filter which CrawlHashes to update
     */
    where?: CrawlHashWhereInput
    /**
     * Limit how many CrawlHashes to update.
     */
    limit?: number
  }

  /**
   * CrawlHash updateManyAndReturn
   */
  export type CrawlHashUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * The data used to update CrawlHashes.
     */
    data: XOR<CrawlHashUpdateManyMutationInput, CrawlHashUncheckedUpdateManyInput>
    /**
     * Filter which CrawlHashes to update
     */
    where?: CrawlHashWhereInput
    /**
     * Limit how many CrawlHashes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrawlHash upsert
   */
  export type CrawlHashUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * The filter to search for the CrawlHash to update in case it exists.
     */
    where: CrawlHashWhereUniqueInput
    /**
     * In case the CrawlHash found by the `where` argument doesn't exist, create a new CrawlHash with this data.
     */
    create: XOR<CrawlHashCreateInput, CrawlHashUncheckedCreateInput>
    /**
     * In case the CrawlHash was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrawlHashUpdateInput, CrawlHashUncheckedUpdateInput>
  }

  /**
   * CrawlHash delete
   */
  export type CrawlHashDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
    /**
     * Filter which CrawlHash to delete.
     */
    where: CrawlHashWhereUniqueInput
  }

  /**
   * CrawlHash deleteMany
   */
  export type CrawlHashDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlHashes to delete
     */
    where?: CrawlHashWhereInput
    /**
     * Limit how many CrawlHashes to delete.
     */
    limit?: number
  }

  /**
   * CrawlHash without action
   */
  export type CrawlHashDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlHash
     */
    select?: CrawlHashSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlHash
     */
    omit?: CrawlHashOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlHashInclude<ExtArgs> | null
  }


  /**
   * Model Scan
   */

  export type AggregateScan = {
    _count: ScanCountAggregateOutputType | null
    _avg: ScanAvgAggregateOutputType | null
    _sum: ScanSumAggregateOutputType | null
    _min: ScanMinAggregateOutputType | null
    _max: ScanMaxAggregateOutputType | null
  }

  export type ScanAvgAggregateOutputType = {
    matches: number | null
    timeouts: number | null
    gigs_per_second: number | null
  }

  export type ScanSumAggregateOutputType = {
    matches: number | null
    timeouts: number | null
    gigs_per_second: number | null
  }

  export type ScanMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    targeted_date: Date | null
    result_folder: string | null
    root_path: string | null
    start_time: Date | null
    end_time: Date | null
    matches: number | null
    timeouts: number | null
    gigs_per_second: number | null
    targetId: string | null
  }

  export type ScanMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    targeted_date: Date | null
    result_folder: string | null
    root_path: string | null
    start_time: Date | null
    end_time: Date | null
    matches: number | null
    timeouts: number | null
    gigs_per_second: number | null
    targetId: string | null
  }

  export type ScanCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    targeted_date: number
    result_folder: number
    root_path: number
    start_time: number
    end_time: number
    matches: number
    timeouts: number
    gigs_per_second: number
    targetId: number
    _all: number
  }


  export type ScanAvgAggregateInputType = {
    matches?: true
    timeouts?: true
    gigs_per_second?: true
  }

  export type ScanSumAggregateInputType = {
    matches?: true
    timeouts?: true
    gigs_per_second?: true
  }

  export type ScanMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    targeted_date?: true
    result_folder?: true
    root_path?: true
    start_time?: true
    end_time?: true
    matches?: true
    timeouts?: true
    gigs_per_second?: true
    targetId?: true
  }

  export type ScanMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    targeted_date?: true
    result_folder?: true
    root_path?: true
    start_time?: true
    end_time?: true
    matches?: true
    timeouts?: true
    gigs_per_second?: true
    targetId?: true
  }

  export type ScanCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    targeted_date?: true
    result_folder?: true
    root_path?: true
    start_time?: true
    end_time?: true
    matches?: true
    timeouts?: true
    gigs_per_second?: true
    targetId?: true
    _all?: true
  }

  export type ScanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scan to aggregate.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scans
    **/
    _count?: true | ScanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanMaxAggregateInputType
  }

  export type GetScanAggregateType<T extends ScanAggregateArgs> = {
        [P in keyof T & keyof AggregateScan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScan[P]>
      : GetScalarType<T[P], AggregateScan[P]>
  }




  export type ScanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanWhereInput
    orderBy?: ScanOrderByWithAggregationInput | ScanOrderByWithAggregationInput[]
    by: ScanScalarFieldEnum[] | ScanScalarFieldEnum
    having?: ScanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanCountAggregateInputType | true
    _avg?: ScanAvgAggregateInputType
    _sum?: ScanSumAggregateInputType
    _min?: ScanMinAggregateInputType
    _max?: ScanMaxAggregateInputType
  }

  export type ScanGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    targeted_date: Date
    result_folder: string
    root_path: string
    start_time: Date
    end_time: Date | null
    matches: number
    timeouts: number
    gigs_per_second: number
    targetId: string
    _count: ScanCountAggregateOutputType | null
    _avg: ScanAvgAggregateOutputType | null
    _sum: ScanSumAggregateOutputType | null
    _min: ScanMinAggregateOutputType | null
    _max: ScanMaxAggregateOutputType | null
  }

  type GetScanGroupByPayload<T extends ScanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanGroupByOutputType[P]>
            : GetScalarType<T[P], ScanGroupByOutputType[P]>
        }
      >
    >


  export type ScanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    start_time?: boolean
    end_time?: boolean
    matches?: boolean
    timeouts?: boolean
    gigs_per_second?: boolean
    targetId?: boolean
    errors?: boolean | Scan$errorsArgs<ExtArgs>
    results?: boolean | Scan$resultsArgs<ExtArgs>
    target?: boolean | TargetDefaultArgs<ExtArgs>
    _count?: boolean | ScanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    start_time?: boolean
    end_time?: boolean
    matches?: boolean
    timeouts?: boolean
    gigs_per_second?: boolean
    targetId?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    start_time?: boolean
    end_time?: boolean
    matches?: boolean
    timeouts?: boolean
    gigs_per_second?: boolean
    targetId?: boolean
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    targeted_date?: boolean
    result_folder?: boolean
    root_path?: boolean
    start_time?: boolean
    end_time?: boolean
    matches?: boolean
    timeouts?: boolean
    gigs_per_second?: boolean
    targetId?: boolean
  }

  export type ScanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "targeted_date" | "result_folder" | "root_path" | "start_time" | "end_time" | "matches" | "timeouts" | "gigs_per_second" | "targetId", ExtArgs["result"]["scan"]>
  export type ScanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    errors?: boolean | Scan$errorsArgs<ExtArgs>
    results?: boolean | Scan$resultsArgs<ExtArgs>
    target?: boolean | TargetDefaultArgs<ExtArgs>
    _count?: boolean | ScanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ScanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }
  export type ScanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | TargetDefaultArgs<ExtArgs>
  }

  export type $ScanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Scan"
    objects: {
      errors: Prisma.$ScanErrorPayload<ExtArgs>[]
      results: Prisma.$ScanResultPayload<ExtArgs>[]
      target: Prisma.$TargetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      targeted_date: Date
      result_folder: string
      root_path: string
      start_time: Date
      end_time: Date | null
      matches: number
      timeouts: number
      gigs_per_second: number
      targetId: string
    }, ExtArgs["result"]["scan"]>
    composites: {}
  }

  type ScanGetPayload<S extends boolean | null | undefined | ScanDefaultArgs> = $Result.GetResult<Prisma.$ScanPayload, S>

  type ScanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanCountAggregateInputType | true
    }

  export interface ScanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Scan'], meta: { name: 'Scan' } }
    /**
     * Find zero or one Scan that matches the filter.
     * @param {ScanFindUniqueArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanFindUniqueArgs>(args: SelectSubset<T, ScanFindUniqueArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Scan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanFindUniqueOrThrowArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Scan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindFirstArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanFindFirstArgs>(args?: SelectSubset<T, ScanFindFirstArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Scan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindFirstOrThrowArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Scans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scans
     * const scans = await prisma.scan.findMany()
     * 
     * // Get first 10 Scans
     * const scans = await prisma.scan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanWithIdOnly = await prisma.scan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanFindManyArgs>(args?: SelectSubset<T, ScanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Scan.
     * @param {ScanCreateArgs} args - Arguments to create a Scan.
     * @example
     * // Create one Scan
     * const Scan = await prisma.scan.create({
     *   data: {
     *     // ... data to create a Scan
     *   }
     * })
     * 
     */
    create<T extends ScanCreateArgs>(args: SelectSubset<T, ScanCreateArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Scans.
     * @param {ScanCreateManyArgs} args - Arguments to create many Scans.
     * @example
     * // Create many Scans
     * const scan = await prisma.scan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanCreateManyArgs>(args?: SelectSubset<T, ScanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scans and returns the data saved in the database.
     * @param {ScanCreateManyAndReturnArgs} args - Arguments to create many Scans.
     * @example
     * // Create many Scans
     * const scan = await prisma.scan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scans and only return the `id`
     * const scanWithIdOnly = await prisma.scan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScanCreateManyAndReturnArgs>(args?: SelectSubset<T, ScanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Scan.
     * @param {ScanDeleteArgs} args - Arguments to delete one Scan.
     * @example
     * // Delete one Scan
     * const Scan = await prisma.scan.delete({
     *   where: {
     *     // ... filter to delete one Scan
     *   }
     * })
     * 
     */
    delete<T extends ScanDeleteArgs>(args: SelectSubset<T, ScanDeleteArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Scan.
     * @param {ScanUpdateArgs} args - Arguments to update one Scan.
     * @example
     * // Update one Scan
     * const scan = await prisma.scan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanUpdateArgs>(args: SelectSubset<T, ScanUpdateArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Scans.
     * @param {ScanDeleteManyArgs} args - Arguments to filter Scans to delete.
     * @example
     * // Delete a few Scans
     * const { count } = await prisma.scan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanDeleteManyArgs>(args?: SelectSubset<T, ScanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scans
     * const scan = await prisma.scan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanUpdateManyArgs>(args: SelectSubset<T, ScanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scans and returns the data updated in the database.
     * @param {ScanUpdateManyAndReturnArgs} args - Arguments to update many Scans.
     * @example
     * // Update many Scans
     * const scan = await prisma.scan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Scans and only return the `id`
     * const scanWithIdOnly = await prisma.scan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScanUpdateManyAndReturnArgs>(args: SelectSubset<T, ScanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Scan.
     * @param {ScanUpsertArgs} args - Arguments to update or create a Scan.
     * @example
     * // Update or create a Scan
     * const scan = await prisma.scan.upsert({
     *   create: {
     *     // ... data to create a Scan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scan we want to update
     *   }
     * })
     */
    upsert<T extends ScanUpsertArgs>(args: SelectSubset<T, ScanUpsertArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanCountArgs} args - Arguments to filter Scans to count.
     * @example
     * // Count the number of Scans
     * const count = await prisma.scan.count({
     *   where: {
     *     // ... the filter for the Scans we want to count
     *   }
     * })
    **/
    count<T extends ScanCountArgs>(
      args?: Subset<T, ScanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanAggregateArgs>(args: Subset<T, ScanAggregateArgs>): Prisma.PrismaPromise<GetScanAggregateType<T>>

    /**
     * Group by Scan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanGroupByArgs['orderBy'] }
        : { orderBy?: ScanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Scan model
   */
  readonly fields: ScanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Scan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    errors<T extends Scan$errorsArgs<ExtArgs> = {}>(args?: Subset<T, Scan$errorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    results<T extends Scan$resultsArgs<ExtArgs> = {}>(args?: Subset<T, Scan$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    target<T extends TargetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TargetDefaultArgs<ExtArgs>>): Prisma__TargetClient<$Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Scan model
   */ 
  interface ScanFieldRefs {
    readonly id: FieldRef<"Scan", 'String'>
    readonly created_at: FieldRef<"Scan", 'DateTime'>
    readonly updated_at: FieldRef<"Scan", 'DateTime'>
    readonly targeted_date: FieldRef<"Scan", 'DateTime'>
    readonly result_folder: FieldRef<"Scan", 'String'>
    readonly root_path: FieldRef<"Scan", 'String'>
    readonly start_time: FieldRef<"Scan", 'DateTime'>
    readonly end_time: FieldRef<"Scan", 'DateTime'>
    readonly matches: FieldRef<"Scan", 'Int'>
    readonly timeouts: FieldRef<"Scan", 'Int'>
    readonly gigs_per_second: FieldRef<"Scan", 'Float'>
    readonly targetId: FieldRef<"Scan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Scan findUnique
   */
  export type ScanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan findUniqueOrThrow
   */
  export type ScanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan findFirst
   */
  export type ScanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     */
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan findFirstOrThrow
   */
  export type ScanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     */
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan findMany
   */
  export type ScanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scans to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan create
   */
  export type ScanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The data needed to create a Scan.
     */
    data: XOR<ScanCreateInput, ScanUncheckedCreateInput>
  }

  /**
   * Scan createMany
   */
  export type ScanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scans.
     */
    data: ScanCreateManyInput | ScanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Scan createManyAndReturn
   */
  export type ScanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * The data used to create many Scans.
     */
    data: ScanCreateManyInput | ScanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scan update
   */
  export type ScanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The data needed to update a Scan.
     */
    data: XOR<ScanUpdateInput, ScanUncheckedUpdateInput>
    /**
     * Choose, which Scan to update.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan updateMany
   */
  export type ScanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scans.
     */
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyInput>
    /**
     * Filter which Scans to update
     */
    where?: ScanWhereInput
    /**
     * Limit how many Scans to update.
     */
    limit?: number
  }

  /**
   * Scan updateManyAndReturn
   */
  export type ScanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * The data used to update Scans.
     */
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyInput>
    /**
     * Filter which Scans to update
     */
    where?: ScanWhereInput
    /**
     * Limit how many Scans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scan upsert
   */
  export type ScanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The filter to search for the Scan to update in case it exists.
     */
    where: ScanWhereUniqueInput
    /**
     * In case the Scan found by the `where` argument doesn't exist, create a new Scan with this data.
     */
    create: XOR<ScanCreateInput, ScanUncheckedCreateInput>
    /**
     * In case the Scan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanUpdateInput, ScanUncheckedUpdateInput>
  }

  /**
   * Scan delete
   */
  export type ScanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter which Scan to delete.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan deleteMany
   */
  export type ScanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scans to delete
     */
    where?: ScanWhereInput
    /**
     * Limit how many Scans to delete.
     */
    limit?: number
  }

  /**
   * Scan.errors
   */
  export type Scan$errorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    where?: ScanErrorWhereInput
    orderBy?: ScanErrorOrderByWithRelationInput | ScanErrorOrderByWithRelationInput[]
    cursor?: ScanErrorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanErrorScalarFieldEnum | ScanErrorScalarFieldEnum[]
  }

  /**
   * Scan.results
   */
  export type Scan$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    where?: ScanResultWhereInput
    orderBy?: ScanResultOrderByWithRelationInput | ScanResultOrderByWithRelationInput[]
    cursor?: ScanResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanResultScalarFieldEnum | ScanResultScalarFieldEnum[]
  }

  /**
   * Scan without action
   */
  export type ScanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Scan
     */
    omit?: ScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
  }


  /**
   * Model ScanError
   */

  export type AggregateScanError = {
    _count: ScanErrorCountAggregateOutputType | null
    _min: ScanErrorMinAggregateOutputType | null
    _max: ScanErrorMaxAggregateOutputType | null
  }

  export type ScanErrorMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    occurred_at: Date | null
    severity: $Enums.Severity | null
    error_name: string | null
    error_desc: string | null
    file: string | null
    scanId: string | null
  }

  export type ScanErrorMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    occurred_at: Date | null
    severity: $Enums.Severity | null
    error_name: string | null
    error_desc: string | null
    file: string | null
    scanId: string | null
  }

  export type ScanErrorCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    occurred_at: number
    severity: number
    error_name: number
    error_desc: number
    file: number
    scanId: number
    _all: number
  }


  export type ScanErrorMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    occurred_at?: true
    severity?: true
    error_name?: true
    error_desc?: true
    file?: true
    scanId?: true
  }

  export type ScanErrorMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    occurred_at?: true
    severity?: true
    error_name?: true
    error_desc?: true
    file?: true
    scanId?: true
  }

  export type ScanErrorCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    occurred_at?: true
    severity?: true
    error_name?: true
    error_desc?: true
    file?: true
    scanId?: true
    _all?: true
  }

  export type ScanErrorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanError to aggregate.
     */
    where?: ScanErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanErrors to fetch.
     */
    orderBy?: ScanErrorOrderByWithRelationInput | ScanErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanErrors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScanErrors
    **/
    _count?: true | ScanErrorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanErrorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanErrorMaxAggregateInputType
  }

  export type GetScanErrorAggregateType<T extends ScanErrorAggregateArgs> = {
        [P in keyof T & keyof AggregateScanError]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScanError[P]>
      : GetScalarType<T[P], AggregateScanError[P]>
  }




  export type ScanErrorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanErrorWhereInput
    orderBy?: ScanErrorOrderByWithAggregationInput | ScanErrorOrderByWithAggregationInput[]
    by: ScanErrorScalarFieldEnum[] | ScanErrorScalarFieldEnum
    having?: ScanErrorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanErrorCountAggregateInputType | true
    _min?: ScanErrorMinAggregateInputType
    _max?: ScanErrorMaxAggregateInputType
  }

  export type ScanErrorGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    occurred_at: Date
    severity: $Enums.Severity
    error_name: string
    error_desc: string
    file: string
    scanId: string
    _count: ScanErrorCountAggregateOutputType | null
    _min: ScanErrorMinAggregateOutputType | null
    _max: ScanErrorMaxAggregateOutputType | null
  }

  type GetScanErrorGroupByPayload<T extends ScanErrorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanErrorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanErrorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanErrorGroupByOutputType[P]>
            : GetScalarType<T[P], ScanErrorGroupByOutputType[P]>
        }
      >
    >


  export type ScanErrorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    occurred_at?: boolean
    severity?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanError"]>

  export type ScanErrorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    occurred_at?: boolean
    severity?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanError"]>

  export type ScanErrorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    occurred_at?: boolean
    severity?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanError"]>

  export type ScanErrorSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    occurred_at?: boolean
    severity?: boolean
    error_name?: boolean
    error_desc?: boolean
    file?: boolean
    scanId?: boolean
  }

  export type ScanErrorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "occurred_at" | "severity" | "error_name" | "error_desc" | "file" | "scanId", ExtArgs["result"]["scanError"]>
  export type ScanErrorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }
  export type ScanErrorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }
  export type ScanErrorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }

  export type $ScanErrorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScanError"
    objects: {
      scan: Prisma.$ScanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      occurred_at: Date
      severity: $Enums.Severity
      error_name: string
      error_desc: string
      file: string
      scanId: string
    }, ExtArgs["result"]["scanError"]>
    composites: {}
  }

  type ScanErrorGetPayload<S extends boolean | null | undefined | ScanErrorDefaultArgs> = $Result.GetResult<Prisma.$ScanErrorPayload, S>

  type ScanErrorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanErrorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanErrorCountAggregateInputType | true
    }

  export interface ScanErrorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScanError'], meta: { name: 'ScanError' } }
    /**
     * Find zero or one ScanError that matches the filter.
     * @param {ScanErrorFindUniqueArgs} args - Arguments to find a ScanError
     * @example
     * // Get one ScanError
     * const scanError = await prisma.scanError.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanErrorFindUniqueArgs>(args: SelectSubset<T, ScanErrorFindUniqueArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ScanError that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanErrorFindUniqueOrThrowArgs} args - Arguments to find a ScanError
     * @example
     * // Get one ScanError
     * const scanError = await prisma.scanError.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanErrorFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanErrorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ScanError that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanErrorFindFirstArgs} args - Arguments to find a ScanError
     * @example
     * // Get one ScanError
     * const scanError = await prisma.scanError.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanErrorFindFirstArgs>(args?: SelectSubset<T, ScanErrorFindFirstArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ScanError that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanErrorFindFirstOrThrowArgs} args - Arguments to find a ScanError
     * @example
     * // Get one ScanError
     * const scanError = await prisma.scanError.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanErrorFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanErrorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ScanErrors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanErrorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScanErrors
     * const scanErrors = await prisma.scanError.findMany()
     * 
     * // Get first 10 ScanErrors
     * const scanErrors = await prisma.scanError.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanErrorWithIdOnly = await prisma.scanError.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanErrorFindManyArgs>(args?: SelectSubset<T, ScanErrorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ScanError.
     * @param {ScanErrorCreateArgs} args - Arguments to create a ScanError.
     * @example
     * // Create one ScanError
     * const ScanError = await prisma.scanError.create({
     *   data: {
     *     // ... data to create a ScanError
     *   }
     * })
     * 
     */
    create<T extends ScanErrorCreateArgs>(args: SelectSubset<T, ScanErrorCreateArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ScanErrors.
     * @param {ScanErrorCreateManyArgs} args - Arguments to create many ScanErrors.
     * @example
     * // Create many ScanErrors
     * const scanError = await prisma.scanError.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanErrorCreateManyArgs>(args?: SelectSubset<T, ScanErrorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScanErrors and returns the data saved in the database.
     * @param {ScanErrorCreateManyAndReturnArgs} args - Arguments to create many ScanErrors.
     * @example
     * // Create many ScanErrors
     * const scanError = await prisma.scanError.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScanErrors and only return the `id`
     * const scanErrorWithIdOnly = await prisma.scanError.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScanErrorCreateManyAndReturnArgs>(args?: SelectSubset<T, ScanErrorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ScanError.
     * @param {ScanErrorDeleteArgs} args - Arguments to delete one ScanError.
     * @example
     * // Delete one ScanError
     * const ScanError = await prisma.scanError.delete({
     *   where: {
     *     // ... filter to delete one ScanError
     *   }
     * })
     * 
     */
    delete<T extends ScanErrorDeleteArgs>(args: SelectSubset<T, ScanErrorDeleteArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ScanError.
     * @param {ScanErrorUpdateArgs} args - Arguments to update one ScanError.
     * @example
     * // Update one ScanError
     * const scanError = await prisma.scanError.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanErrorUpdateArgs>(args: SelectSubset<T, ScanErrorUpdateArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ScanErrors.
     * @param {ScanErrorDeleteManyArgs} args - Arguments to filter ScanErrors to delete.
     * @example
     * // Delete a few ScanErrors
     * const { count } = await prisma.scanError.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanErrorDeleteManyArgs>(args?: SelectSubset<T, ScanErrorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanErrors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanErrorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScanErrors
     * const scanError = await prisma.scanError.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanErrorUpdateManyArgs>(args: SelectSubset<T, ScanErrorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanErrors and returns the data updated in the database.
     * @param {ScanErrorUpdateManyAndReturnArgs} args - Arguments to update many ScanErrors.
     * @example
     * // Update many ScanErrors
     * const scanError = await prisma.scanError.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScanErrors and only return the `id`
     * const scanErrorWithIdOnly = await prisma.scanError.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScanErrorUpdateManyAndReturnArgs>(args: SelectSubset<T, ScanErrorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ScanError.
     * @param {ScanErrorUpsertArgs} args - Arguments to update or create a ScanError.
     * @example
     * // Update or create a ScanError
     * const scanError = await prisma.scanError.upsert({
     *   create: {
     *     // ... data to create a ScanError
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScanError we want to update
     *   }
     * })
     */
    upsert<T extends ScanErrorUpsertArgs>(args: SelectSubset<T, ScanErrorUpsertArgs<ExtArgs>>): Prisma__ScanErrorClient<$Result.GetResult<Prisma.$ScanErrorPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ScanErrors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanErrorCountArgs} args - Arguments to filter ScanErrors to count.
     * @example
     * // Count the number of ScanErrors
     * const count = await prisma.scanError.count({
     *   where: {
     *     // ... the filter for the ScanErrors we want to count
     *   }
     * })
    **/
    count<T extends ScanErrorCountArgs>(
      args?: Subset<T, ScanErrorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanErrorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScanError.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanErrorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanErrorAggregateArgs>(args: Subset<T, ScanErrorAggregateArgs>): Prisma.PrismaPromise<GetScanErrorAggregateType<T>>

    /**
     * Group by ScanError.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanErrorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanErrorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanErrorGroupByArgs['orderBy'] }
        : { orderBy?: ScanErrorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanErrorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanErrorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScanError model
   */
  readonly fields: ScanErrorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScanError.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanErrorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scan<T extends ScanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScanDefaultArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScanError model
   */ 
  interface ScanErrorFieldRefs {
    readonly id: FieldRef<"ScanError", 'String'>
    readonly created_at: FieldRef<"ScanError", 'DateTime'>
    readonly updated_at: FieldRef<"ScanError", 'DateTime'>
    readonly occurred_at: FieldRef<"ScanError", 'DateTime'>
    readonly severity: FieldRef<"ScanError", 'Severity'>
    readonly error_name: FieldRef<"ScanError", 'String'>
    readonly error_desc: FieldRef<"ScanError", 'String'>
    readonly file: FieldRef<"ScanError", 'String'>
    readonly scanId: FieldRef<"ScanError", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ScanError findUnique
   */
  export type ScanErrorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * Filter, which ScanError to fetch.
     */
    where: ScanErrorWhereUniqueInput
  }

  /**
   * ScanError findUniqueOrThrow
   */
  export type ScanErrorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * Filter, which ScanError to fetch.
     */
    where: ScanErrorWhereUniqueInput
  }

  /**
   * ScanError findFirst
   */
  export type ScanErrorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * Filter, which ScanError to fetch.
     */
    where?: ScanErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanErrors to fetch.
     */
    orderBy?: ScanErrorOrderByWithRelationInput | ScanErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanErrors.
     */
    cursor?: ScanErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanErrors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanErrors.
     */
    distinct?: ScanErrorScalarFieldEnum | ScanErrorScalarFieldEnum[]
  }

  /**
   * ScanError findFirstOrThrow
   */
  export type ScanErrorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * Filter, which ScanError to fetch.
     */
    where?: ScanErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanErrors to fetch.
     */
    orderBy?: ScanErrorOrderByWithRelationInput | ScanErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanErrors.
     */
    cursor?: ScanErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanErrors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanErrors.
     */
    distinct?: ScanErrorScalarFieldEnum | ScanErrorScalarFieldEnum[]
  }

  /**
   * ScanError findMany
   */
  export type ScanErrorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * Filter, which ScanErrors to fetch.
     */
    where?: ScanErrorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanErrors to fetch.
     */
    orderBy?: ScanErrorOrderByWithRelationInput | ScanErrorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScanErrors.
     */
    cursor?: ScanErrorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanErrors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanErrors.
     */
    skip?: number
    distinct?: ScanErrorScalarFieldEnum | ScanErrorScalarFieldEnum[]
  }

  /**
   * ScanError create
   */
  export type ScanErrorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * The data needed to create a ScanError.
     */
    data: XOR<ScanErrorCreateInput, ScanErrorUncheckedCreateInput>
  }

  /**
   * ScanError createMany
   */
  export type ScanErrorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScanErrors.
     */
    data: ScanErrorCreateManyInput | ScanErrorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScanError createManyAndReturn
   */
  export type ScanErrorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * The data used to create many ScanErrors.
     */
    data: ScanErrorCreateManyInput | ScanErrorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScanError update
   */
  export type ScanErrorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * The data needed to update a ScanError.
     */
    data: XOR<ScanErrorUpdateInput, ScanErrorUncheckedUpdateInput>
    /**
     * Choose, which ScanError to update.
     */
    where: ScanErrorWhereUniqueInput
  }

  /**
   * ScanError updateMany
   */
  export type ScanErrorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScanErrors.
     */
    data: XOR<ScanErrorUpdateManyMutationInput, ScanErrorUncheckedUpdateManyInput>
    /**
     * Filter which ScanErrors to update
     */
    where?: ScanErrorWhereInput
    /**
     * Limit how many ScanErrors to update.
     */
    limit?: number
  }

  /**
   * ScanError updateManyAndReturn
   */
  export type ScanErrorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * The data used to update ScanErrors.
     */
    data: XOR<ScanErrorUpdateManyMutationInput, ScanErrorUncheckedUpdateManyInput>
    /**
     * Filter which ScanErrors to update
     */
    where?: ScanErrorWhereInput
    /**
     * Limit how many ScanErrors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScanError upsert
   */
  export type ScanErrorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * The filter to search for the ScanError to update in case it exists.
     */
    where: ScanErrorWhereUniqueInput
    /**
     * In case the ScanError found by the `where` argument doesn't exist, create a new ScanError with this data.
     */
    create: XOR<ScanErrorCreateInput, ScanErrorUncheckedCreateInput>
    /**
     * In case the ScanError was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanErrorUpdateInput, ScanErrorUncheckedUpdateInput>
  }

  /**
   * ScanError delete
   */
  export type ScanErrorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
    /**
     * Filter which ScanError to delete.
     */
    where: ScanErrorWhereUniqueInput
  }

  /**
   * ScanError deleteMany
   */
  export type ScanErrorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanErrors to delete
     */
    where?: ScanErrorWhereInput
    /**
     * Limit how many ScanErrors to delete.
     */
    limit?: number
  }

  /**
   * ScanError without action
   */
  export type ScanErrorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanError
     */
    select?: ScanErrorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanError
     */
    omit?: ScanErrorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanErrorInclude<ExtArgs> | null
  }


  /**
   * Model ScanResult
   */

  export type AggregateScanResult = {
    _count: ScanResultCountAggregateOutputType | null
    _avg: ScanResultAvgAggregateOutputType | null
    _sum: ScanResultSumAggregateOutputType | null
    _min: ScanResultMinAggregateOutputType | null
    _max: ScanResultMaxAggregateOutputType | null
  }

  export type ScanResultAvgAggregateOutputType = {
    bsize: number | null
  }

  export type ScanResultSumAggregateOutputType = {
    bsize: number | null
  }

  export type ScanResultMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    hash: string | null
    file_path: string | null
    mime_type: string | null
    bsize: number | null
    processed: boolean | null
    errored: boolean | null
    confidence: $Enums.Confidence | null
    scanId: string | null
  }

  export type ScanResultMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    hash: string | null
    file_path: string | null
    mime_type: string | null
    bsize: number | null
    processed: boolean | null
    errored: boolean | null
    confidence: $Enums.Confidence | null
    scanId: string | null
  }

  export type ScanResultCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    hash: number
    file_path: number
    mime_type: number
    bsize: number
    processed: number
    errored: number
    match: number
    confidence: number
    scanId: number
    _all: number
  }


  export type ScanResultAvgAggregateInputType = {
    bsize?: true
  }

  export type ScanResultSumAggregateInputType = {
    bsize?: true
  }

  export type ScanResultMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    hash?: true
    file_path?: true
    mime_type?: true
    bsize?: true
    processed?: true
    errored?: true
    confidence?: true
    scanId?: true
  }

  export type ScanResultMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    hash?: true
    file_path?: true
    mime_type?: true
    bsize?: true
    processed?: true
    errored?: true
    confidence?: true
    scanId?: true
  }

  export type ScanResultCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    hash?: true
    file_path?: true
    mime_type?: true
    bsize?: true
    processed?: true
    errored?: true
    match?: true
    confidence?: true
    scanId?: true
    _all?: true
  }

  export type ScanResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanResult to aggregate.
     */
    where?: ScanResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanResults to fetch.
     */
    orderBy?: ScanResultOrderByWithRelationInput | ScanResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScanResults
    **/
    _count?: true | ScanResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScanResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScanResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanResultMaxAggregateInputType
  }

  export type GetScanResultAggregateType<T extends ScanResultAggregateArgs> = {
        [P in keyof T & keyof AggregateScanResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScanResult[P]>
      : GetScalarType<T[P], AggregateScanResult[P]>
  }




  export type ScanResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanResultWhereInput
    orderBy?: ScanResultOrderByWithAggregationInput | ScanResultOrderByWithAggregationInput[]
    by: ScanResultScalarFieldEnum[] | ScanResultScalarFieldEnum
    having?: ScanResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanResultCountAggregateInputType | true
    _avg?: ScanResultAvgAggregateInputType
    _sum?: ScanResultSumAggregateInputType
    _min?: ScanResultMinAggregateInputType
    _max?: ScanResultMaxAggregateInputType
  }

  export type ScanResultGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    hash: string
    file_path: string
    mime_type: string
    bsize: number
    processed: boolean
    errored: boolean
    match: string[]
    confidence: $Enums.Confidence
    scanId: string
    _count: ScanResultCountAggregateOutputType | null
    _avg: ScanResultAvgAggregateOutputType | null
    _sum: ScanResultSumAggregateOutputType | null
    _min: ScanResultMinAggregateOutputType | null
    _max: ScanResultMaxAggregateOutputType | null
  }

  type GetScanResultGroupByPayload<T extends ScanResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanResultGroupByOutputType[P]>
            : GetScalarType<T[P], ScanResultGroupByOutputType[P]>
        }
      >
    >


  export type ScanResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    hash?: boolean
    file_path?: boolean
    mime_type?: boolean
    bsize?: boolean
    processed?: boolean
    errored?: boolean
    match?: boolean
    confidence?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanResult"]>

  export type ScanResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    hash?: boolean
    file_path?: boolean
    mime_type?: boolean
    bsize?: boolean
    processed?: boolean
    errored?: boolean
    match?: boolean
    confidence?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanResult"]>

  export type ScanResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    hash?: boolean
    file_path?: boolean
    mime_type?: boolean
    bsize?: boolean
    processed?: boolean
    errored?: boolean
    match?: boolean
    confidence?: boolean
    scanId?: boolean
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanResult"]>

  export type ScanResultSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    hash?: boolean
    file_path?: boolean
    mime_type?: boolean
    bsize?: boolean
    processed?: boolean
    errored?: boolean
    match?: boolean
    confidence?: boolean
    scanId?: boolean
  }

  export type ScanResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "hash" | "file_path" | "mime_type" | "bsize" | "processed" | "errored" | "match" | "confidence" | "scanId", ExtArgs["result"]["scanResult"]>
  export type ScanResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }
  export type ScanResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }
  export type ScanResultIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scan?: boolean | ScanDefaultArgs<ExtArgs>
  }

  export type $ScanResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScanResult"
    objects: {
      scan: Prisma.$ScanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      hash: string
      file_path: string
      mime_type: string
      bsize: number
      processed: boolean
      errored: boolean
      match: string[]
      confidence: $Enums.Confidence
      scanId: string
    }, ExtArgs["result"]["scanResult"]>
    composites: {}
  }

  type ScanResultGetPayload<S extends boolean | null | undefined | ScanResultDefaultArgs> = $Result.GetResult<Prisma.$ScanResultPayload, S>

  type ScanResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanResultCountAggregateInputType | true
    }

  export interface ScanResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScanResult'], meta: { name: 'ScanResult' } }
    /**
     * Find zero or one ScanResult that matches the filter.
     * @param {ScanResultFindUniqueArgs} args - Arguments to find a ScanResult
     * @example
     * // Get one ScanResult
     * const scanResult = await prisma.scanResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanResultFindUniqueArgs>(args: SelectSubset<T, ScanResultFindUniqueArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ScanResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanResultFindUniqueOrThrowArgs} args - Arguments to find a ScanResult
     * @example
     * // Get one ScanResult
     * const scanResult = await prisma.scanResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ScanResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanResultFindFirstArgs} args - Arguments to find a ScanResult
     * @example
     * // Get one ScanResult
     * const scanResult = await prisma.scanResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanResultFindFirstArgs>(args?: SelectSubset<T, ScanResultFindFirstArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ScanResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanResultFindFirstOrThrowArgs} args - Arguments to find a ScanResult
     * @example
     * // Get one ScanResult
     * const scanResult = await prisma.scanResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ScanResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScanResults
     * const scanResults = await prisma.scanResult.findMany()
     * 
     * // Get first 10 ScanResults
     * const scanResults = await prisma.scanResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanResultWithIdOnly = await prisma.scanResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanResultFindManyArgs>(args?: SelectSubset<T, ScanResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ScanResult.
     * @param {ScanResultCreateArgs} args - Arguments to create a ScanResult.
     * @example
     * // Create one ScanResult
     * const ScanResult = await prisma.scanResult.create({
     *   data: {
     *     // ... data to create a ScanResult
     *   }
     * })
     * 
     */
    create<T extends ScanResultCreateArgs>(args: SelectSubset<T, ScanResultCreateArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ScanResults.
     * @param {ScanResultCreateManyArgs} args - Arguments to create many ScanResults.
     * @example
     * // Create many ScanResults
     * const scanResult = await prisma.scanResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanResultCreateManyArgs>(args?: SelectSubset<T, ScanResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScanResults and returns the data saved in the database.
     * @param {ScanResultCreateManyAndReturnArgs} args - Arguments to create many ScanResults.
     * @example
     * // Create many ScanResults
     * const scanResult = await prisma.scanResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScanResults and only return the `id`
     * const scanResultWithIdOnly = await prisma.scanResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScanResultCreateManyAndReturnArgs>(args?: SelectSubset<T, ScanResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ScanResult.
     * @param {ScanResultDeleteArgs} args - Arguments to delete one ScanResult.
     * @example
     * // Delete one ScanResult
     * const ScanResult = await prisma.scanResult.delete({
     *   where: {
     *     // ... filter to delete one ScanResult
     *   }
     * })
     * 
     */
    delete<T extends ScanResultDeleteArgs>(args: SelectSubset<T, ScanResultDeleteArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ScanResult.
     * @param {ScanResultUpdateArgs} args - Arguments to update one ScanResult.
     * @example
     * // Update one ScanResult
     * const scanResult = await prisma.scanResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanResultUpdateArgs>(args: SelectSubset<T, ScanResultUpdateArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ScanResults.
     * @param {ScanResultDeleteManyArgs} args - Arguments to filter ScanResults to delete.
     * @example
     * // Delete a few ScanResults
     * const { count } = await prisma.scanResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanResultDeleteManyArgs>(args?: SelectSubset<T, ScanResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScanResults
     * const scanResult = await prisma.scanResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanResultUpdateManyArgs>(args: SelectSubset<T, ScanResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanResults and returns the data updated in the database.
     * @param {ScanResultUpdateManyAndReturnArgs} args - Arguments to update many ScanResults.
     * @example
     * // Update many ScanResults
     * const scanResult = await prisma.scanResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScanResults and only return the `id`
     * const scanResultWithIdOnly = await prisma.scanResult.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScanResultUpdateManyAndReturnArgs>(args: SelectSubset<T, ScanResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ScanResult.
     * @param {ScanResultUpsertArgs} args - Arguments to update or create a ScanResult.
     * @example
     * // Update or create a ScanResult
     * const scanResult = await prisma.scanResult.upsert({
     *   create: {
     *     // ... data to create a ScanResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScanResult we want to update
     *   }
     * })
     */
    upsert<T extends ScanResultUpsertArgs>(args: SelectSubset<T, ScanResultUpsertArgs<ExtArgs>>): Prisma__ScanResultClient<$Result.GetResult<Prisma.$ScanResultPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ScanResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanResultCountArgs} args - Arguments to filter ScanResults to count.
     * @example
     * // Count the number of ScanResults
     * const count = await prisma.scanResult.count({
     *   where: {
     *     // ... the filter for the ScanResults we want to count
     *   }
     * })
    **/
    count<T extends ScanResultCountArgs>(
      args?: Subset<T, ScanResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScanResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanResultAggregateArgs>(args: Subset<T, ScanResultAggregateArgs>): Prisma.PrismaPromise<GetScanResultAggregateType<T>>

    /**
     * Group by ScanResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanResultGroupByArgs['orderBy'] }
        : { orderBy?: ScanResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScanResult model
   */
  readonly fields: ScanResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScanResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scan<T extends ScanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ScanDefaultArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScanResult model
   */ 
  interface ScanResultFieldRefs {
    readonly id: FieldRef<"ScanResult", 'String'>
    readonly created_at: FieldRef<"ScanResult", 'DateTime'>
    readonly updated_at: FieldRef<"ScanResult", 'DateTime'>
    readonly hash: FieldRef<"ScanResult", 'String'>
    readonly file_path: FieldRef<"ScanResult", 'String'>
    readonly mime_type: FieldRef<"ScanResult", 'String'>
    readonly bsize: FieldRef<"ScanResult", 'Int'>
    readonly processed: FieldRef<"ScanResult", 'Boolean'>
    readonly errored: FieldRef<"ScanResult", 'Boolean'>
    readonly match: FieldRef<"ScanResult", 'String[]'>
    readonly confidence: FieldRef<"ScanResult", 'Confidence'>
    readonly scanId: FieldRef<"ScanResult", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ScanResult findUnique
   */
  export type ScanResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * Filter, which ScanResult to fetch.
     */
    where: ScanResultWhereUniqueInput
  }

  /**
   * ScanResult findUniqueOrThrow
   */
  export type ScanResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * Filter, which ScanResult to fetch.
     */
    where: ScanResultWhereUniqueInput
  }

  /**
   * ScanResult findFirst
   */
  export type ScanResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * Filter, which ScanResult to fetch.
     */
    where?: ScanResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanResults to fetch.
     */
    orderBy?: ScanResultOrderByWithRelationInput | ScanResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanResults.
     */
    cursor?: ScanResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanResults.
     */
    distinct?: ScanResultScalarFieldEnum | ScanResultScalarFieldEnum[]
  }

  /**
   * ScanResult findFirstOrThrow
   */
  export type ScanResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * Filter, which ScanResult to fetch.
     */
    where?: ScanResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanResults to fetch.
     */
    orderBy?: ScanResultOrderByWithRelationInput | ScanResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanResults.
     */
    cursor?: ScanResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanResults.
     */
    distinct?: ScanResultScalarFieldEnum | ScanResultScalarFieldEnum[]
  }

  /**
   * ScanResult findMany
   */
  export type ScanResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * Filter, which ScanResults to fetch.
     */
    where?: ScanResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanResults to fetch.
     */
    orderBy?: ScanResultOrderByWithRelationInput | ScanResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScanResults.
     */
    cursor?: ScanResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanResults.
     */
    skip?: number
    distinct?: ScanResultScalarFieldEnum | ScanResultScalarFieldEnum[]
  }

  /**
   * ScanResult create
   */
  export type ScanResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * The data needed to create a ScanResult.
     */
    data: XOR<ScanResultCreateInput, ScanResultUncheckedCreateInput>
  }

  /**
   * ScanResult createMany
   */
  export type ScanResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScanResults.
     */
    data: ScanResultCreateManyInput | ScanResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScanResult createManyAndReturn
   */
  export type ScanResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * The data used to create many ScanResults.
     */
    data: ScanResultCreateManyInput | ScanResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScanResult update
   */
  export type ScanResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * The data needed to update a ScanResult.
     */
    data: XOR<ScanResultUpdateInput, ScanResultUncheckedUpdateInput>
    /**
     * Choose, which ScanResult to update.
     */
    where: ScanResultWhereUniqueInput
  }

  /**
   * ScanResult updateMany
   */
  export type ScanResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScanResults.
     */
    data: XOR<ScanResultUpdateManyMutationInput, ScanResultUncheckedUpdateManyInput>
    /**
     * Filter which ScanResults to update
     */
    where?: ScanResultWhereInput
    /**
     * Limit how many ScanResults to update.
     */
    limit?: number
  }

  /**
   * ScanResult updateManyAndReturn
   */
  export type ScanResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * The data used to update ScanResults.
     */
    data: XOR<ScanResultUpdateManyMutationInput, ScanResultUncheckedUpdateManyInput>
    /**
     * Filter which ScanResults to update
     */
    where?: ScanResultWhereInput
    /**
     * Limit how many ScanResults to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScanResult upsert
   */
  export type ScanResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * The filter to search for the ScanResult to update in case it exists.
     */
    where: ScanResultWhereUniqueInput
    /**
     * In case the ScanResult found by the `where` argument doesn't exist, create a new ScanResult with this data.
     */
    create: XOR<ScanResultCreateInput, ScanResultUncheckedCreateInput>
    /**
     * In case the ScanResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanResultUpdateInput, ScanResultUncheckedUpdateInput>
  }

  /**
   * ScanResult delete
   */
  export type ScanResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
    /**
     * Filter which ScanResult to delete.
     */
    where: ScanResultWhereUniqueInput
  }

  /**
   * ScanResult deleteMany
   */
  export type ScanResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanResults to delete
     */
    where?: ScanResultWhereInput
    /**
     * Limit how many ScanResults to delete.
     */
    limit?: number
  }

  /**
   * ScanResult without action
   */
  export type ScanResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanResult
     */
    select?: ScanResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanResult
     */
    omit?: ScanResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanResultInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TargetScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    roots: 'roots',
    skip_completed: 'skip_completed',
    max_workers: 'max_workers',
    mem_thresh: 'mem_thresh',
    use_history: 'use_history',
    default_timeout: 'default_timeout',
    agentId: 'agentId'
  };

  export type TargetScalarFieldEnum = (typeof TargetScalarFieldEnum)[keyof typeof TargetScalarFieldEnum]


  export const AgentScalarFieldEnum: {
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

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const CrawlScalarFieldEnum: {
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

  export type CrawlScalarFieldEnum = (typeof CrawlScalarFieldEnum)[keyof typeof CrawlScalarFieldEnum]


  export const CrawlErrorScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    error_name: 'error_name',
    error_desc: 'error_desc',
    file: 'file',
    crawlId: 'crawlId'
  };

  export type CrawlErrorScalarFieldEnum = (typeof CrawlErrorScalarFieldEnum)[keyof typeof CrawlErrorScalarFieldEnum]


  export const CrawlHashScalarFieldEnum: {
    hash: 'hash',
    created_at: 'created_at',
    updated_at: 'updated_at',
    file_paths: 'file_paths',
    bsize: 'bsize',
    format: 'format',
    crawlId: 'crawlId'
  };

  export type CrawlHashScalarFieldEnum = (typeof CrawlHashScalarFieldEnum)[keyof typeof CrawlHashScalarFieldEnum]


  export const ScanScalarFieldEnum: {
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

  export type ScanScalarFieldEnum = (typeof ScanScalarFieldEnum)[keyof typeof ScanScalarFieldEnum]


  export const ScanErrorScalarFieldEnum: {
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

  export type ScanErrorScalarFieldEnum = (typeof ScanErrorScalarFieldEnum)[keyof typeof ScanErrorScalarFieldEnum]


  export const ScanResultScalarFieldEnum: {
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

  export type ScanResultScalarFieldEnum = (typeof ScanResultScalarFieldEnum)[keyof typeof ScanResultScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Severity'
   */
  export type EnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity'>
    


  /**
   * Reference to a field of type 'Severity[]'
   */
  export type ListEnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity[]'>
    


  /**
   * Reference to a field of type 'Confidence'
   */
  export type EnumConfidenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Confidence'>
    


  /**
   * Reference to a field of type 'Confidence[]'
   */
  export type ListEnumConfidenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Confidence[]'>
    
  /**
   * Deep Input Types
   */


  export type TargetWhereInput = {
    AND?: TargetWhereInput | TargetWhereInput[]
    OR?: TargetWhereInput[]
    NOT?: TargetWhereInput | TargetWhereInput[]
    id?: StringFilter<"Target"> | string
    created_at?: DateTimeFilter<"Target"> | Date | string
    updated_at?: DateTimeFilter<"Target"> | Date | string
    roots?: StringNullableListFilter<"Target">
    skip_completed?: BoolFilter<"Target"> | boolean
    max_workers?: IntFilter<"Target"> | number
    mem_thresh?: IntFilter<"Target"> | number
    use_history?: BoolFilter<"Target"> | boolean
    default_timeout?: IntFilter<"Target"> | number
    agentId?: StringFilter<"Target"> | string
    crawls?: CrawlListRelationFilter
    scans?: ScanListRelationFilter
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type TargetOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roots?: SortOrder
    skip_completed?: SortOrder
    max_workers?: SortOrder
    mem_thresh?: SortOrder
    use_history?: SortOrder
    default_timeout?: SortOrder
    agentId?: SortOrder
    crawls?: CrawlOrderByRelationAggregateInput
    scans?: ScanOrderByRelationAggregateInput
    agent?: AgentOrderByWithRelationInput
  }

  export type TargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agent_target?: TargetAgent_targetCompoundUniqueInput
    AND?: TargetWhereInput | TargetWhereInput[]
    OR?: TargetWhereInput[]
    NOT?: TargetWhereInput | TargetWhereInput[]
    created_at?: DateTimeFilter<"Target"> | Date | string
    updated_at?: DateTimeFilter<"Target"> | Date | string
    roots?: StringNullableListFilter<"Target">
    skip_completed?: BoolFilter<"Target"> | boolean
    max_workers?: IntFilter<"Target"> | number
    mem_thresh?: IntFilter<"Target"> | number
    use_history?: BoolFilter<"Target"> | boolean
    default_timeout?: IntFilter<"Target"> | number
    agentId?: StringFilter<"Target"> | string
    crawls?: CrawlListRelationFilter
    scans?: ScanListRelationFilter
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id" | "agent_target">

  export type TargetOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roots?: SortOrder
    skip_completed?: SortOrder
    max_workers?: SortOrder
    mem_thresh?: SortOrder
    use_history?: SortOrder
    default_timeout?: SortOrder
    agentId?: SortOrder
    _count?: TargetCountOrderByAggregateInput
    _avg?: TargetAvgOrderByAggregateInput
    _max?: TargetMaxOrderByAggregateInput
    _min?: TargetMinOrderByAggregateInput
    _sum?: TargetSumOrderByAggregateInput
  }

  export type TargetScalarWhereWithAggregatesInput = {
    AND?: TargetScalarWhereWithAggregatesInput | TargetScalarWhereWithAggregatesInput[]
    OR?: TargetScalarWhereWithAggregatesInput[]
    NOT?: TargetScalarWhereWithAggregatesInput | TargetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Target"> | string
    created_at?: DateTimeWithAggregatesFilter<"Target"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Target"> | Date | string
    roots?: StringNullableListFilter<"Target">
    skip_completed?: BoolWithAggregatesFilter<"Target"> | boolean
    max_workers?: IntWithAggregatesFilter<"Target"> | number
    mem_thresh?: IntWithAggregatesFilter<"Target"> | number
    use_history?: BoolWithAggregatesFilter<"Target"> | boolean
    default_timeout?: IntWithAggregatesFilter<"Target"> | number
    agentId?: StringWithAggregatesFilter<"Target"> | string
  }

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    created_at?: DateTimeFilter<"Agent"> | Date | string
    updated_at?: DateTimeFilter<"Agent"> | Date | string
    name?: StringFilter<"Agent"> | string
    location?: StringFilter<"Agent"> | string
    status?: EnumStatusFilter<"Agent"> | $Enums.Status
    os?: StringFilter<"Agent"> | string
    os_version?: StringFilter<"Agent"> | string
    arch?: StringFilter<"Agent"> | string
    processor?: StringFilter<"Agent"> | string
    cores?: IntFilter<"Agent"> | number
    logical_cpus?: IntFilter<"Agent"> | number
    ram_gb?: FloatFilter<"Agent"> | number
    targets?: TargetListRelationFilter
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    os?: SortOrder
    os_version?: SortOrder
    arch?: SortOrder
    processor?: SortOrder
    cores?: SortOrder
    logical_cpus?: SortOrder
    ram_gb?: SortOrder
    targets?: TargetOrderByRelationAggregateInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    created_at?: DateTimeFilter<"Agent"> | Date | string
    updated_at?: DateTimeFilter<"Agent"> | Date | string
    name?: StringFilter<"Agent"> | string
    location?: StringFilter<"Agent"> | string
    status?: EnumStatusFilter<"Agent"> | $Enums.Status
    os?: StringFilter<"Agent"> | string
    os_version?: StringFilter<"Agent"> | string
    arch?: StringFilter<"Agent"> | string
    processor?: StringFilter<"Agent"> | string
    cores?: IntFilter<"Agent"> | number
    logical_cpus?: IntFilter<"Agent"> | number
    ram_gb?: FloatFilter<"Agent"> | number
    targets?: TargetListRelationFilter
  }, "id">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    os?: SortOrder
    os_version?: SortOrder
    arch?: SortOrder
    processor?: SortOrder
    cores?: SortOrder
    logical_cpus?: SortOrder
    ram_gb?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _avg?: AgentAvgOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
    _sum?: AgentSumOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    created_at?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    name?: StringWithAggregatesFilter<"Agent"> | string
    location?: StringWithAggregatesFilter<"Agent"> | string
    status?: EnumStatusWithAggregatesFilter<"Agent"> | $Enums.Status
    os?: StringWithAggregatesFilter<"Agent"> | string
    os_version?: StringWithAggregatesFilter<"Agent"> | string
    arch?: StringWithAggregatesFilter<"Agent"> | string
    processor?: StringWithAggregatesFilter<"Agent"> | string
    cores?: IntWithAggregatesFilter<"Agent"> | number
    logical_cpus?: IntWithAggregatesFilter<"Agent"> | number
    ram_gb?: FloatWithAggregatesFilter<"Agent"> | number
  }

  export type CrawlWhereInput = {
    AND?: CrawlWhereInput | CrawlWhereInput[]
    OR?: CrawlWhereInput[]
    NOT?: CrawlWhereInput | CrawlWhereInput[]
    id?: StringFilter<"Crawl"> | string
    created_at?: DateTimeFilter<"Crawl"> | Date | string
    updated_at?: DateTimeFilter<"Crawl"> | Date | string
    targeted_date?: DateTimeFilter<"Crawl"> | Date | string
    result_folder?: StringFilter<"Crawl"> | string
    root_path?: StringFilter<"Crawl"> | string
    use_history?: BoolFilter<"Crawl"> | boolean
    file_count?: IntFilter<"Crawl"> | number
    dir_count?: IntFilter<"Crawl"> | number
    total_size?: BigIntFilter<"Crawl"> | bigint | number
    scan_size?: BigIntFilter<"Crawl"> | bigint | number
    largest_file_size?: BigIntFilter<"Crawl"> | bigint | number
    largest_file_path?: StringFilter<"Crawl"> | string
    extensions?: StringNullableListFilter<"Crawl">
    start_time?: DateTimeFilter<"Crawl"> | Date | string
    end_time?: DateTimeFilter<"Crawl"> | Date | string
    throughput?: FloatFilter<"Crawl"> | number
    unsupported_files?: StringNullableListFilter<"Crawl">
    targetId?: StringFilter<"Crawl"> | string
    errors?: CrawlErrorListRelationFilter
    hashes?: CrawlHashListRelationFilter
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
  }

  export type CrawlOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    use_history?: SortOrder
    file_count?: SortOrder
    dir_count?: SortOrder
    total_size?: SortOrder
    scan_size?: SortOrder
    largest_file_size?: SortOrder
    largest_file_path?: SortOrder
    extensions?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    throughput?: SortOrder
    unsupported_files?: SortOrder
    targetId?: SortOrder
    errors?: CrawlErrorOrderByRelationAggregateInput
    hashes?: CrawlHashOrderByRelationAggregateInput
    target?: TargetOrderByWithRelationInput
  }

  export type CrawlWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    crawl_target_result?: CrawlCrawl_target_resultCompoundUniqueInput
    AND?: CrawlWhereInput | CrawlWhereInput[]
    OR?: CrawlWhereInput[]
    NOT?: CrawlWhereInput | CrawlWhereInput[]
    created_at?: DateTimeFilter<"Crawl"> | Date | string
    updated_at?: DateTimeFilter<"Crawl"> | Date | string
    targeted_date?: DateTimeFilter<"Crawl"> | Date | string
    result_folder?: StringFilter<"Crawl"> | string
    root_path?: StringFilter<"Crawl"> | string
    use_history?: BoolFilter<"Crawl"> | boolean
    file_count?: IntFilter<"Crawl"> | number
    dir_count?: IntFilter<"Crawl"> | number
    total_size?: BigIntFilter<"Crawl"> | bigint | number
    scan_size?: BigIntFilter<"Crawl"> | bigint | number
    largest_file_size?: BigIntFilter<"Crawl"> | bigint | number
    largest_file_path?: StringFilter<"Crawl"> | string
    extensions?: StringNullableListFilter<"Crawl">
    start_time?: DateTimeFilter<"Crawl"> | Date | string
    end_time?: DateTimeFilter<"Crawl"> | Date | string
    throughput?: FloatFilter<"Crawl"> | number
    unsupported_files?: StringNullableListFilter<"Crawl">
    targetId?: StringFilter<"Crawl"> | string
    errors?: CrawlErrorListRelationFilter
    hashes?: CrawlHashListRelationFilter
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
  }, "id" | "crawl_target_result">

  export type CrawlOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    use_history?: SortOrder
    file_count?: SortOrder
    dir_count?: SortOrder
    total_size?: SortOrder
    scan_size?: SortOrder
    largest_file_size?: SortOrder
    largest_file_path?: SortOrder
    extensions?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    throughput?: SortOrder
    unsupported_files?: SortOrder
    targetId?: SortOrder
    _count?: CrawlCountOrderByAggregateInput
    _avg?: CrawlAvgOrderByAggregateInput
    _max?: CrawlMaxOrderByAggregateInput
    _min?: CrawlMinOrderByAggregateInput
    _sum?: CrawlSumOrderByAggregateInput
  }

  export type CrawlScalarWhereWithAggregatesInput = {
    AND?: CrawlScalarWhereWithAggregatesInput | CrawlScalarWhereWithAggregatesInput[]
    OR?: CrawlScalarWhereWithAggregatesInput[]
    NOT?: CrawlScalarWhereWithAggregatesInput | CrawlScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Crawl"> | string
    created_at?: DateTimeWithAggregatesFilter<"Crawl"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Crawl"> | Date | string
    targeted_date?: DateTimeWithAggregatesFilter<"Crawl"> | Date | string
    result_folder?: StringWithAggregatesFilter<"Crawl"> | string
    root_path?: StringWithAggregatesFilter<"Crawl"> | string
    use_history?: BoolWithAggregatesFilter<"Crawl"> | boolean
    file_count?: IntWithAggregatesFilter<"Crawl"> | number
    dir_count?: IntWithAggregatesFilter<"Crawl"> | number
    total_size?: BigIntWithAggregatesFilter<"Crawl"> | bigint | number
    scan_size?: BigIntWithAggregatesFilter<"Crawl"> | bigint | number
    largest_file_size?: BigIntWithAggregatesFilter<"Crawl"> | bigint | number
    largest_file_path?: StringWithAggregatesFilter<"Crawl"> | string
    extensions?: StringNullableListFilter<"Crawl">
    start_time?: DateTimeWithAggregatesFilter<"Crawl"> | Date | string
    end_time?: DateTimeWithAggregatesFilter<"Crawl"> | Date | string
    throughput?: FloatWithAggregatesFilter<"Crawl"> | number
    unsupported_files?: StringNullableListFilter<"Crawl">
    targetId?: StringWithAggregatesFilter<"Crawl"> | string
  }

  export type CrawlErrorWhereInput = {
    AND?: CrawlErrorWhereInput | CrawlErrorWhereInput[]
    OR?: CrawlErrorWhereInput[]
    NOT?: CrawlErrorWhereInput | CrawlErrorWhereInput[]
    id?: StringFilter<"CrawlError"> | string
    created_at?: DateTimeFilter<"CrawlError"> | Date | string
    updated_at?: DateTimeFilter<"CrawlError"> | Date | string
    error_name?: StringFilter<"CrawlError"> | string
    error_desc?: StringFilter<"CrawlError"> | string
    file?: StringFilter<"CrawlError"> | string
    crawlId?: StringFilter<"CrawlError"> | string
    crawl?: XOR<CrawlScalarRelationFilter, CrawlWhereInput>
  }

  export type CrawlErrorOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    crawlId?: SortOrder
    crawl?: CrawlOrderByWithRelationInput
  }

  export type CrawlErrorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CrawlErrorWhereInput | CrawlErrorWhereInput[]
    OR?: CrawlErrorWhereInput[]
    NOT?: CrawlErrorWhereInput | CrawlErrorWhereInput[]
    created_at?: DateTimeFilter<"CrawlError"> | Date | string
    updated_at?: DateTimeFilter<"CrawlError"> | Date | string
    error_name?: StringFilter<"CrawlError"> | string
    error_desc?: StringFilter<"CrawlError"> | string
    file?: StringFilter<"CrawlError"> | string
    crawlId?: StringFilter<"CrawlError"> | string
    crawl?: XOR<CrawlScalarRelationFilter, CrawlWhereInput>
  }, "id">

  export type CrawlErrorOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    crawlId?: SortOrder
    _count?: CrawlErrorCountOrderByAggregateInput
    _max?: CrawlErrorMaxOrderByAggregateInput
    _min?: CrawlErrorMinOrderByAggregateInput
  }

  export type CrawlErrorScalarWhereWithAggregatesInput = {
    AND?: CrawlErrorScalarWhereWithAggregatesInput | CrawlErrorScalarWhereWithAggregatesInput[]
    OR?: CrawlErrorScalarWhereWithAggregatesInput[]
    NOT?: CrawlErrorScalarWhereWithAggregatesInput | CrawlErrorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CrawlError"> | string
    created_at?: DateTimeWithAggregatesFilter<"CrawlError"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"CrawlError"> | Date | string
    error_name?: StringWithAggregatesFilter<"CrawlError"> | string
    error_desc?: StringWithAggregatesFilter<"CrawlError"> | string
    file?: StringWithAggregatesFilter<"CrawlError"> | string
    crawlId?: StringWithAggregatesFilter<"CrawlError"> | string
  }

  export type CrawlHashWhereInput = {
    AND?: CrawlHashWhereInput | CrawlHashWhereInput[]
    OR?: CrawlHashWhereInput[]
    NOT?: CrawlHashWhereInput | CrawlHashWhereInput[]
    hash?: StringFilter<"CrawlHash"> | string
    created_at?: DateTimeFilter<"CrawlHash"> | Date | string
    updated_at?: DateTimeFilter<"CrawlHash"> | Date | string
    file_paths?: StringNullableListFilter<"CrawlHash">
    bsize?: IntFilter<"CrawlHash"> | number
    format?: StringFilter<"CrawlHash"> | string
    crawlId?: StringFilter<"CrawlHash"> | string
    crawl?: XOR<CrawlScalarRelationFilter, CrawlWhereInput>
  }

  export type CrawlHashOrderByWithRelationInput = {
    hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_paths?: SortOrder
    bsize?: SortOrder
    format?: SortOrder
    crawlId?: SortOrder
    crawl?: CrawlOrderByWithRelationInput
  }

  export type CrawlHashWhereUniqueInput = Prisma.AtLeast<{
    crawlId_hash?: CrawlHashCrawlIdHashCompoundUniqueInput
    AND?: CrawlHashWhereInput | CrawlHashWhereInput[]
    OR?: CrawlHashWhereInput[]
    NOT?: CrawlHashWhereInput | CrawlHashWhereInput[]
    hash?: StringFilter<"CrawlHash"> | string
    created_at?: DateTimeFilter<"CrawlHash"> | Date | string
    updated_at?: DateTimeFilter<"CrawlHash"> | Date | string
    file_paths?: StringNullableListFilter<"CrawlHash">
    bsize?: IntFilter<"CrawlHash"> | number
    format?: StringFilter<"CrawlHash"> | string
    crawlId?: StringFilter<"CrawlHash"> | string
    crawl?: XOR<CrawlScalarRelationFilter, CrawlWhereInput>
  }, "crawlId_hash">

  export type CrawlHashOrderByWithAggregationInput = {
    hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_paths?: SortOrder
    bsize?: SortOrder
    format?: SortOrder
    crawlId?: SortOrder
    _count?: CrawlHashCountOrderByAggregateInput
    _avg?: CrawlHashAvgOrderByAggregateInput
    _max?: CrawlHashMaxOrderByAggregateInput
    _min?: CrawlHashMinOrderByAggregateInput
    _sum?: CrawlHashSumOrderByAggregateInput
  }

  export type CrawlHashScalarWhereWithAggregatesInput = {
    AND?: CrawlHashScalarWhereWithAggregatesInput | CrawlHashScalarWhereWithAggregatesInput[]
    OR?: CrawlHashScalarWhereWithAggregatesInput[]
    NOT?: CrawlHashScalarWhereWithAggregatesInput | CrawlHashScalarWhereWithAggregatesInput[]
    hash?: StringWithAggregatesFilter<"CrawlHash"> | string
    created_at?: DateTimeWithAggregatesFilter<"CrawlHash"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"CrawlHash"> | Date | string
    file_paths?: StringNullableListFilter<"CrawlHash">
    bsize?: IntWithAggregatesFilter<"CrawlHash"> | number
    format?: StringWithAggregatesFilter<"CrawlHash"> | string
    crawlId?: StringWithAggregatesFilter<"CrawlHash"> | string
  }

  export type ScanWhereInput = {
    AND?: ScanWhereInput | ScanWhereInput[]
    OR?: ScanWhereInput[]
    NOT?: ScanWhereInput | ScanWhereInput[]
    id?: StringFilter<"Scan"> | string
    created_at?: DateTimeFilter<"Scan"> | Date | string
    updated_at?: DateTimeFilter<"Scan"> | Date | string
    targeted_date?: DateTimeFilter<"Scan"> | Date | string
    result_folder?: StringFilter<"Scan"> | string
    root_path?: StringFilter<"Scan"> | string
    start_time?: DateTimeFilter<"Scan"> | Date | string
    end_time?: DateTimeNullableFilter<"Scan"> | Date | string | null
    matches?: IntFilter<"Scan"> | number
    timeouts?: IntFilter<"Scan"> | number
    gigs_per_second?: FloatFilter<"Scan"> | number
    targetId?: StringFilter<"Scan"> | string
    errors?: ScanErrorListRelationFilter
    results?: ScanResultListRelationFilter
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
  }

  export type ScanOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrderInput | SortOrder
    matches?: SortOrder
    timeouts?: SortOrder
    gigs_per_second?: SortOrder
    targetId?: SortOrder
    errors?: ScanErrorOrderByRelationAggregateInput
    results?: ScanResultOrderByRelationAggregateInput
    target?: TargetOrderByWithRelationInput
  }

  export type ScanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    scan_target_result?: ScanScan_target_resultCompoundUniqueInput
    AND?: ScanWhereInput | ScanWhereInput[]
    OR?: ScanWhereInput[]
    NOT?: ScanWhereInput | ScanWhereInput[]
    created_at?: DateTimeFilter<"Scan"> | Date | string
    updated_at?: DateTimeFilter<"Scan"> | Date | string
    targeted_date?: DateTimeFilter<"Scan"> | Date | string
    result_folder?: StringFilter<"Scan"> | string
    root_path?: StringFilter<"Scan"> | string
    start_time?: DateTimeFilter<"Scan"> | Date | string
    end_time?: DateTimeNullableFilter<"Scan"> | Date | string | null
    matches?: IntFilter<"Scan"> | number
    timeouts?: IntFilter<"Scan"> | number
    gigs_per_second?: FloatFilter<"Scan"> | number
    targetId?: StringFilter<"Scan"> | string
    errors?: ScanErrorListRelationFilter
    results?: ScanResultListRelationFilter
    target?: XOR<TargetScalarRelationFilter, TargetWhereInput>
  }, "id" | "scan_target_result">

  export type ScanOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrderInput | SortOrder
    matches?: SortOrder
    timeouts?: SortOrder
    gigs_per_second?: SortOrder
    targetId?: SortOrder
    _count?: ScanCountOrderByAggregateInput
    _avg?: ScanAvgOrderByAggregateInput
    _max?: ScanMaxOrderByAggregateInput
    _min?: ScanMinOrderByAggregateInput
    _sum?: ScanSumOrderByAggregateInput
  }

  export type ScanScalarWhereWithAggregatesInput = {
    AND?: ScanScalarWhereWithAggregatesInput | ScanScalarWhereWithAggregatesInput[]
    OR?: ScanScalarWhereWithAggregatesInput[]
    NOT?: ScanScalarWhereWithAggregatesInput | ScanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Scan"> | string
    created_at?: DateTimeWithAggregatesFilter<"Scan"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Scan"> | Date | string
    targeted_date?: DateTimeWithAggregatesFilter<"Scan"> | Date | string
    result_folder?: StringWithAggregatesFilter<"Scan"> | string
    root_path?: StringWithAggregatesFilter<"Scan"> | string
    start_time?: DateTimeWithAggregatesFilter<"Scan"> | Date | string
    end_time?: DateTimeNullableWithAggregatesFilter<"Scan"> | Date | string | null
    matches?: IntWithAggregatesFilter<"Scan"> | number
    timeouts?: IntWithAggregatesFilter<"Scan"> | number
    gigs_per_second?: FloatWithAggregatesFilter<"Scan"> | number
    targetId?: StringWithAggregatesFilter<"Scan"> | string
  }

  export type ScanErrorWhereInput = {
    AND?: ScanErrorWhereInput | ScanErrorWhereInput[]
    OR?: ScanErrorWhereInput[]
    NOT?: ScanErrorWhereInput | ScanErrorWhereInput[]
    id?: StringFilter<"ScanError"> | string
    created_at?: DateTimeFilter<"ScanError"> | Date | string
    updated_at?: DateTimeFilter<"ScanError"> | Date | string
    occurred_at?: DateTimeFilter<"ScanError"> | Date | string
    severity?: EnumSeverityFilter<"ScanError"> | $Enums.Severity
    error_name?: StringFilter<"ScanError"> | string
    error_desc?: StringFilter<"ScanError"> | string
    file?: StringFilter<"ScanError"> | string
    scanId?: StringFilter<"ScanError"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
  }

  export type ScanErrorOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    occurred_at?: SortOrder
    severity?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    scanId?: SortOrder
    scan?: ScanOrderByWithRelationInput
  }

  export type ScanErrorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScanErrorWhereInput | ScanErrorWhereInput[]
    OR?: ScanErrorWhereInput[]
    NOT?: ScanErrorWhereInput | ScanErrorWhereInput[]
    created_at?: DateTimeFilter<"ScanError"> | Date | string
    updated_at?: DateTimeFilter<"ScanError"> | Date | string
    occurred_at?: DateTimeFilter<"ScanError"> | Date | string
    severity?: EnumSeverityFilter<"ScanError"> | $Enums.Severity
    error_name?: StringFilter<"ScanError"> | string
    error_desc?: StringFilter<"ScanError"> | string
    file?: StringFilter<"ScanError"> | string
    scanId?: StringFilter<"ScanError"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
  }, "id">

  export type ScanErrorOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    occurred_at?: SortOrder
    severity?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    scanId?: SortOrder
    _count?: ScanErrorCountOrderByAggregateInput
    _max?: ScanErrorMaxOrderByAggregateInput
    _min?: ScanErrorMinOrderByAggregateInput
  }

  export type ScanErrorScalarWhereWithAggregatesInput = {
    AND?: ScanErrorScalarWhereWithAggregatesInput | ScanErrorScalarWhereWithAggregatesInput[]
    OR?: ScanErrorScalarWhereWithAggregatesInput[]
    NOT?: ScanErrorScalarWhereWithAggregatesInput | ScanErrorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScanError"> | string
    created_at?: DateTimeWithAggregatesFilter<"ScanError"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ScanError"> | Date | string
    occurred_at?: DateTimeWithAggregatesFilter<"ScanError"> | Date | string
    severity?: EnumSeverityWithAggregatesFilter<"ScanError"> | $Enums.Severity
    error_name?: StringWithAggregatesFilter<"ScanError"> | string
    error_desc?: StringWithAggregatesFilter<"ScanError"> | string
    file?: StringWithAggregatesFilter<"ScanError"> | string
    scanId?: StringWithAggregatesFilter<"ScanError"> | string
  }

  export type ScanResultWhereInput = {
    AND?: ScanResultWhereInput | ScanResultWhereInput[]
    OR?: ScanResultWhereInput[]
    NOT?: ScanResultWhereInput | ScanResultWhereInput[]
    id?: StringFilter<"ScanResult"> | string
    created_at?: DateTimeFilter<"ScanResult"> | Date | string
    updated_at?: DateTimeFilter<"ScanResult"> | Date | string
    hash?: StringFilter<"ScanResult"> | string
    file_path?: StringFilter<"ScanResult"> | string
    mime_type?: StringFilter<"ScanResult"> | string
    bsize?: IntFilter<"ScanResult"> | number
    processed?: BoolFilter<"ScanResult"> | boolean
    errored?: BoolFilter<"ScanResult"> | boolean
    match?: StringNullableListFilter<"ScanResult">
    confidence?: EnumConfidenceFilter<"ScanResult"> | $Enums.Confidence
    scanId?: StringFilter<"ScanResult"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
  }

  export type ScanResultOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    hash?: SortOrder
    file_path?: SortOrder
    mime_type?: SortOrder
    bsize?: SortOrder
    processed?: SortOrder
    errored?: SortOrder
    match?: SortOrder
    confidence?: SortOrder
    scanId?: SortOrder
    scan?: ScanOrderByWithRelationInput
  }

  export type ScanResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScanResultWhereInput | ScanResultWhereInput[]
    OR?: ScanResultWhereInput[]
    NOT?: ScanResultWhereInput | ScanResultWhereInput[]
    created_at?: DateTimeFilter<"ScanResult"> | Date | string
    updated_at?: DateTimeFilter<"ScanResult"> | Date | string
    hash?: StringFilter<"ScanResult"> | string
    file_path?: StringFilter<"ScanResult"> | string
    mime_type?: StringFilter<"ScanResult"> | string
    bsize?: IntFilter<"ScanResult"> | number
    processed?: BoolFilter<"ScanResult"> | boolean
    errored?: BoolFilter<"ScanResult"> | boolean
    match?: StringNullableListFilter<"ScanResult">
    confidence?: EnumConfidenceFilter<"ScanResult"> | $Enums.Confidence
    scanId?: StringFilter<"ScanResult"> | string
    scan?: XOR<ScanScalarRelationFilter, ScanWhereInput>
  }, "id">

  export type ScanResultOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    hash?: SortOrder
    file_path?: SortOrder
    mime_type?: SortOrder
    bsize?: SortOrder
    processed?: SortOrder
    errored?: SortOrder
    match?: SortOrder
    confidence?: SortOrder
    scanId?: SortOrder
    _count?: ScanResultCountOrderByAggregateInput
    _avg?: ScanResultAvgOrderByAggregateInput
    _max?: ScanResultMaxOrderByAggregateInput
    _min?: ScanResultMinOrderByAggregateInput
    _sum?: ScanResultSumOrderByAggregateInput
  }

  export type ScanResultScalarWhereWithAggregatesInput = {
    AND?: ScanResultScalarWhereWithAggregatesInput | ScanResultScalarWhereWithAggregatesInput[]
    OR?: ScanResultScalarWhereWithAggregatesInput[]
    NOT?: ScanResultScalarWhereWithAggregatesInput | ScanResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScanResult"> | string
    created_at?: DateTimeWithAggregatesFilter<"ScanResult"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ScanResult"> | Date | string
    hash?: StringWithAggregatesFilter<"ScanResult"> | string
    file_path?: StringWithAggregatesFilter<"ScanResult"> | string
    mime_type?: StringWithAggregatesFilter<"ScanResult"> | string
    bsize?: IntWithAggregatesFilter<"ScanResult"> | number
    processed?: BoolWithAggregatesFilter<"ScanResult"> | boolean
    errored?: BoolWithAggregatesFilter<"ScanResult"> | boolean
    match?: StringNullableListFilter<"ScanResult">
    confidence?: EnumConfidenceWithAggregatesFilter<"ScanResult"> | $Enums.Confidence
    scanId?: StringWithAggregatesFilter<"ScanResult"> | string
  }

  export type TargetCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    crawls?: CrawlCreateNestedManyWithoutTargetInput
    scans?: ScanCreateNestedManyWithoutTargetInput
    agent: AgentCreateNestedOneWithoutTargetsInput
  }

  export type TargetUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    agentId: string
    crawls?: CrawlUncheckedCreateNestedManyWithoutTargetInput
    scans?: ScanUncheckedCreateNestedManyWithoutTargetInput
  }

  export type TargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    crawls?: CrawlUpdateManyWithoutTargetNestedInput
    scans?: ScanUpdateManyWithoutTargetNestedInput
    agent?: AgentUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type TargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    agentId?: StringFieldUpdateOperationsInput | string
    crawls?: CrawlUncheckedUpdateManyWithoutTargetNestedInput
    scans?: ScanUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type TargetCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    agentId: string
  }

  export type TargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
  }

  export type TargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    agentId?: StringFieldUpdateOperationsInput | string
  }

  export type AgentCreateInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    location: string
    status?: $Enums.Status
    os: string
    os_version: string
    arch: string
    processor: string
    cores: number
    logical_cpus: number
    ram_gb: number
    targets?: TargetCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    location: string
    status?: $Enums.Status
    os: string
    os_version: string
    arch: string
    processor: string
    cores: number
    logical_cpus: number
    ram_gb: number
    targets?: TargetUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    os?: StringFieldUpdateOperationsInput | string
    os_version?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    cores?: IntFieldUpdateOperationsInput | number
    logical_cpus?: IntFieldUpdateOperationsInput | number
    ram_gb?: FloatFieldUpdateOperationsInput | number
    targets?: TargetUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    os?: StringFieldUpdateOperationsInput | string
    os_version?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    cores?: IntFieldUpdateOperationsInput | number
    logical_cpus?: IntFieldUpdateOperationsInput | number
    ram_gb?: FloatFieldUpdateOperationsInput | number
    targets?: TargetUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateManyInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    location: string
    status?: $Enums.Status
    os: string
    os_version: string
    arch: string
    processor: string
    cores: number
    logical_cpus: number
    ram_gb: number
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    os?: StringFieldUpdateOperationsInput | string
    os_version?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    cores?: IntFieldUpdateOperationsInput | number
    logical_cpus?: IntFieldUpdateOperationsInput | number
    ram_gb?: FloatFieldUpdateOperationsInput | number
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    os?: StringFieldUpdateOperationsInput | string
    os_version?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    cores?: IntFieldUpdateOperationsInput | number
    logical_cpus?: IntFieldUpdateOperationsInput | number
    ram_gb?: FloatFieldUpdateOperationsInput | number
  }

  export type CrawlCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    errors?: CrawlErrorCreateNestedManyWithoutCrawlInput
    hashes?: CrawlHashCreateNestedManyWithoutCrawlInput
    target: TargetCreateNestedOneWithoutCrawlsInput
  }

  export type CrawlUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    targetId: string
    errors?: CrawlErrorUncheckedCreateNestedManyWithoutCrawlInput
    hashes?: CrawlHashUncheckedCreateNestedManyWithoutCrawlInput
  }

  export type CrawlUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    errors?: CrawlErrorUpdateManyWithoutCrawlNestedInput
    hashes?: CrawlHashUpdateManyWithoutCrawlNestedInput
    target?: TargetUpdateOneRequiredWithoutCrawlsNestedInput
  }

  export type CrawlUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    targetId?: StringFieldUpdateOperationsInput | string
    errors?: CrawlErrorUncheckedUpdateManyWithoutCrawlNestedInput
    hashes?: CrawlHashUncheckedUpdateManyWithoutCrawlNestedInput
  }

  export type CrawlCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    targetId: string
  }

  export type CrawlUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
  }

  export type CrawlUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    targetId?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlErrorCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    error_name: string
    error_desc: string
    file: string
    crawl: CrawlCreateNestedOneWithoutErrorsInput
  }

  export type CrawlErrorUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    error_name: string
    error_desc: string
    file: string
    crawlId: string
  }

  export type CrawlErrorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    crawl?: CrawlUpdateOneRequiredWithoutErrorsNestedInput
  }

  export type CrawlErrorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    crawlId?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlErrorCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    error_name: string
    error_desc: string
    file: string
    crawlId: string
  }

  export type CrawlErrorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlErrorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    crawlId?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlHashCreateInput = {
    hash: string
    created_at?: Date | string
    updated_at?: Date | string
    file_paths?: CrawlHashCreatefile_pathsInput | string[]
    bsize: number
    format: string
    crawl: CrawlCreateNestedOneWithoutHashesInput
  }

  export type CrawlHashUncheckedCreateInput = {
    hash: string
    created_at?: Date | string
    updated_at?: Date | string
    file_paths?: CrawlHashCreatefile_pathsInput | string[]
    bsize: number
    format: string
    crawlId: string
  }

  export type CrawlHashUpdateInput = {
    hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_paths?: CrawlHashUpdatefile_pathsInput | string[]
    bsize?: IntFieldUpdateOperationsInput | number
    format?: StringFieldUpdateOperationsInput | string
    crawl?: CrawlUpdateOneRequiredWithoutHashesNestedInput
  }

  export type CrawlHashUncheckedUpdateInput = {
    hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_paths?: CrawlHashUpdatefile_pathsInput | string[]
    bsize?: IntFieldUpdateOperationsInput | number
    format?: StringFieldUpdateOperationsInput | string
    crawlId?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlHashCreateManyInput = {
    hash: string
    created_at?: Date | string
    updated_at?: Date | string
    file_paths?: CrawlHashCreatefile_pathsInput | string[]
    bsize: number
    format: string
    crawlId: string
  }

  export type CrawlHashUpdateManyMutationInput = {
    hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_paths?: CrawlHashUpdatefile_pathsInput | string[]
    bsize?: IntFieldUpdateOperationsInput | number
    format?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlHashUncheckedUpdateManyInput = {
    hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_paths?: CrawlHashUpdatefile_pathsInput | string[]
    bsize?: IntFieldUpdateOperationsInput | number
    format?: StringFieldUpdateOperationsInput | string
    crawlId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    errors?: ScanErrorCreateNestedManyWithoutScanInput
    results?: ScanResultCreateNestedManyWithoutScanInput
    target: TargetCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    targetId: string
    errors?: ScanErrorUncheckedCreateNestedManyWithoutScanInput
    results?: ScanResultUncheckedCreateNestedManyWithoutScanInput
  }

  export type ScanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    errors?: ScanErrorUpdateManyWithoutScanNestedInput
    results?: ScanResultUpdateManyWithoutScanNestedInput
    target?: TargetUpdateOneRequiredWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    targetId?: StringFieldUpdateOperationsInput | string
    errors?: ScanErrorUncheckedUpdateManyWithoutScanNestedInput
    results?: ScanResultUncheckedUpdateManyWithoutScanNestedInput
  }

  export type ScanCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    targetId: string
  }

  export type ScanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
  }

  export type ScanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    targetId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanErrorCreateInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    occurred_at: Date | string
    severity: $Enums.Severity
    error_name: string
    error_desc: string
    file: string
    scan: ScanCreateNestedOneWithoutErrorsInput
  }

  export type ScanErrorUncheckedCreateInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    occurred_at: Date | string
    severity: $Enums.Severity
    error_name: string
    error_desc: string
    file: string
    scanId: string
  }

  export type ScanErrorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    occurred_at?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    scan?: ScanUpdateOneRequiredWithoutErrorsNestedInput
  }

  export type ScanErrorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    occurred_at?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanErrorCreateManyInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    occurred_at: Date | string
    severity: $Enums.Severity
    error_name: string
    error_desc: string
    file: string
    scanId: string
  }

  export type ScanErrorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    occurred_at?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type ScanErrorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    occurred_at?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanResultCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    hash: string
    file_path: string
    mime_type: string
    bsize: number
    processed: boolean
    errored: boolean
    match?: ScanResultCreatematchInput | string[]
    confidence: $Enums.Confidence
    scan: ScanCreateNestedOneWithoutResultsInput
  }

  export type ScanResultUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    hash: string
    file_path: string
    mime_type: string
    bsize: number
    processed: boolean
    errored: boolean
    match?: ScanResultCreatematchInput | string[]
    confidence: $Enums.Confidence
    scanId: string
  }

  export type ScanResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    mime_type?: StringFieldUpdateOperationsInput | string
    bsize?: IntFieldUpdateOperationsInput | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    errored?: BoolFieldUpdateOperationsInput | boolean
    match?: ScanResultUpdatematchInput | string[]
    confidence?: EnumConfidenceFieldUpdateOperationsInput | $Enums.Confidence
    scan?: ScanUpdateOneRequiredWithoutResultsNestedInput
  }

  export type ScanResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    mime_type?: StringFieldUpdateOperationsInput | string
    bsize?: IntFieldUpdateOperationsInput | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    errored?: BoolFieldUpdateOperationsInput | boolean
    match?: ScanResultUpdatematchInput | string[]
    confidence?: EnumConfidenceFieldUpdateOperationsInput | $Enums.Confidence
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanResultCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    hash: string
    file_path: string
    mime_type: string
    bsize: number
    processed: boolean
    errored: boolean
    match?: ScanResultCreatematchInput | string[]
    confidence: $Enums.Confidence
    scanId: string
  }

  export type ScanResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    mime_type?: StringFieldUpdateOperationsInput | string
    bsize?: IntFieldUpdateOperationsInput | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    errored?: BoolFieldUpdateOperationsInput | boolean
    match?: ScanResultUpdatematchInput | string[]
    confidence?: EnumConfidenceFieldUpdateOperationsInput | $Enums.Confidence
  }

  export type ScanResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    mime_type?: StringFieldUpdateOperationsInput | string
    bsize?: IntFieldUpdateOperationsInput | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    errored?: BoolFieldUpdateOperationsInput | boolean
    match?: ScanResultUpdatematchInput | string[]
    confidence?: EnumConfidenceFieldUpdateOperationsInput | $Enums.Confidence
    scanId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CrawlListRelationFilter = {
    every?: CrawlWhereInput
    some?: CrawlWhereInput
    none?: CrawlWhereInput
  }

  export type ScanListRelationFilter = {
    every?: ScanWhereInput
    some?: ScanWhereInput
    none?: ScanWhereInput
  }

  export type AgentScalarRelationFilter = {
    is?: AgentWhereInput
    isNot?: AgentWhereInput
  }

  export type CrawlOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TargetAgent_targetCompoundUniqueInput = {
    agentId: string
    roots: string[]
  }

  export type TargetCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roots?: SortOrder
    skip_completed?: SortOrder
    max_workers?: SortOrder
    mem_thresh?: SortOrder
    use_history?: SortOrder
    default_timeout?: SortOrder
    agentId?: SortOrder
  }

  export type TargetAvgOrderByAggregateInput = {
    max_workers?: SortOrder
    mem_thresh?: SortOrder
    default_timeout?: SortOrder
  }

  export type TargetMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    skip_completed?: SortOrder
    max_workers?: SortOrder
    mem_thresh?: SortOrder
    use_history?: SortOrder
    default_timeout?: SortOrder
    agentId?: SortOrder
  }

  export type TargetMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    skip_completed?: SortOrder
    max_workers?: SortOrder
    mem_thresh?: SortOrder
    use_history?: SortOrder
    default_timeout?: SortOrder
    agentId?: SortOrder
  }

  export type TargetSumOrderByAggregateInput = {
    max_workers?: SortOrder
    mem_thresh?: SortOrder
    default_timeout?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TargetListRelationFilter = {
    every?: TargetWhereInput
    some?: TargetWhereInput
    none?: TargetWhereInput
  }

  export type TargetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    os?: SortOrder
    os_version?: SortOrder
    arch?: SortOrder
    processor?: SortOrder
    cores?: SortOrder
    logical_cpus?: SortOrder
    ram_gb?: SortOrder
  }

  export type AgentAvgOrderByAggregateInput = {
    cores?: SortOrder
    logical_cpus?: SortOrder
    ram_gb?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    os?: SortOrder
    os_version?: SortOrder
    arch?: SortOrder
    processor?: SortOrder
    cores?: SortOrder
    logical_cpus?: SortOrder
    ram_gb?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    location?: SortOrder
    status?: SortOrder
    os?: SortOrder
    os_version?: SortOrder
    arch?: SortOrder
    processor?: SortOrder
    cores?: SortOrder
    logical_cpus?: SortOrder
    ram_gb?: SortOrder
  }

  export type AgentSumOrderByAggregateInput = {
    cores?: SortOrder
    logical_cpus?: SortOrder
    ram_gb?: SortOrder
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type CrawlErrorListRelationFilter = {
    every?: CrawlErrorWhereInput
    some?: CrawlErrorWhereInput
    none?: CrawlErrorWhereInput
  }

  export type CrawlHashListRelationFilter = {
    every?: CrawlHashWhereInput
    some?: CrawlHashWhereInput
    none?: CrawlHashWhereInput
  }

  export type TargetScalarRelationFilter = {
    is?: TargetWhereInput
    isNot?: TargetWhereInput
  }

  export type CrawlErrorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CrawlHashOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CrawlCrawl_target_resultCompoundUniqueInput = {
    targetId: string
    result_folder: string
  }

  export type CrawlCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    use_history?: SortOrder
    file_count?: SortOrder
    dir_count?: SortOrder
    total_size?: SortOrder
    scan_size?: SortOrder
    largest_file_size?: SortOrder
    largest_file_path?: SortOrder
    extensions?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    throughput?: SortOrder
    unsupported_files?: SortOrder
    targetId?: SortOrder
  }

  export type CrawlAvgOrderByAggregateInput = {
    file_count?: SortOrder
    dir_count?: SortOrder
    total_size?: SortOrder
    scan_size?: SortOrder
    largest_file_size?: SortOrder
    throughput?: SortOrder
  }

  export type CrawlMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    use_history?: SortOrder
    file_count?: SortOrder
    dir_count?: SortOrder
    total_size?: SortOrder
    scan_size?: SortOrder
    largest_file_size?: SortOrder
    largest_file_path?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    throughput?: SortOrder
    targetId?: SortOrder
  }

  export type CrawlMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    use_history?: SortOrder
    file_count?: SortOrder
    dir_count?: SortOrder
    total_size?: SortOrder
    scan_size?: SortOrder
    largest_file_size?: SortOrder
    largest_file_path?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    throughput?: SortOrder
    targetId?: SortOrder
  }

  export type CrawlSumOrderByAggregateInput = {
    file_count?: SortOrder
    dir_count?: SortOrder
    total_size?: SortOrder
    scan_size?: SortOrder
    largest_file_size?: SortOrder
    throughput?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type CrawlScalarRelationFilter = {
    is?: CrawlWhereInput
    isNot?: CrawlWhereInput
  }

  export type CrawlErrorCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    crawlId?: SortOrder
  }

  export type CrawlErrorMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    crawlId?: SortOrder
  }

  export type CrawlErrorMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    crawlId?: SortOrder
  }

  export type CrawlHashCrawlIdHashCompoundUniqueInput = {
    crawlId: string
    hash: string
  }

  export type CrawlHashCountOrderByAggregateInput = {
    hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_paths?: SortOrder
    bsize?: SortOrder
    format?: SortOrder
    crawlId?: SortOrder
  }

  export type CrawlHashAvgOrderByAggregateInput = {
    bsize?: SortOrder
  }

  export type CrawlHashMaxOrderByAggregateInput = {
    hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bsize?: SortOrder
    format?: SortOrder
    crawlId?: SortOrder
  }

  export type CrawlHashMinOrderByAggregateInput = {
    hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    bsize?: SortOrder
    format?: SortOrder
    crawlId?: SortOrder
  }

  export type CrawlHashSumOrderByAggregateInput = {
    bsize?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ScanErrorListRelationFilter = {
    every?: ScanErrorWhereInput
    some?: ScanErrorWhereInput
    none?: ScanErrorWhereInput
  }

  export type ScanResultListRelationFilter = {
    every?: ScanResultWhereInput
    some?: ScanResultWhereInput
    none?: ScanResultWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ScanErrorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScanResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScanScan_target_resultCompoundUniqueInput = {
    targetId: string
    result_folder: string
  }

  export type ScanCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    matches?: SortOrder
    timeouts?: SortOrder
    gigs_per_second?: SortOrder
    targetId?: SortOrder
  }

  export type ScanAvgOrderByAggregateInput = {
    matches?: SortOrder
    timeouts?: SortOrder
    gigs_per_second?: SortOrder
  }

  export type ScanMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    matches?: SortOrder
    timeouts?: SortOrder
    gigs_per_second?: SortOrder
    targetId?: SortOrder
  }

  export type ScanMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    targeted_date?: SortOrder
    result_folder?: SortOrder
    root_path?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    matches?: SortOrder
    timeouts?: SortOrder
    gigs_per_second?: SortOrder
    targetId?: SortOrder
  }

  export type ScanSumOrderByAggregateInput = {
    matches?: SortOrder
    timeouts?: SortOrder
    gigs_per_second?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }

  export type ScanScalarRelationFilter = {
    is?: ScanWhereInput
    isNot?: ScanWhereInput
  }

  export type ScanErrorCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    occurred_at?: SortOrder
    severity?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    scanId?: SortOrder
  }

  export type ScanErrorMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    occurred_at?: SortOrder
    severity?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    scanId?: SortOrder
  }

  export type ScanErrorMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    occurred_at?: SortOrder
    severity?: SortOrder
    error_name?: SortOrder
    error_desc?: SortOrder
    file?: SortOrder
    scanId?: SortOrder
  }

  export type EnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }

  export type EnumConfidenceFilter<$PrismaModel = never> = {
    equals?: $Enums.Confidence | EnumConfidenceFieldRefInput<$PrismaModel>
    in?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    not?: NestedEnumConfidenceFilter<$PrismaModel> | $Enums.Confidence
  }

  export type ScanResultCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    hash?: SortOrder
    file_path?: SortOrder
    mime_type?: SortOrder
    bsize?: SortOrder
    processed?: SortOrder
    errored?: SortOrder
    match?: SortOrder
    confidence?: SortOrder
    scanId?: SortOrder
  }

  export type ScanResultAvgOrderByAggregateInput = {
    bsize?: SortOrder
  }

  export type ScanResultMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    hash?: SortOrder
    file_path?: SortOrder
    mime_type?: SortOrder
    bsize?: SortOrder
    processed?: SortOrder
    errored?: SortOrder
    confidence?: SortOrder
    scanId?: SortOrder
  }

  export type ScanResultMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    hash?: SortOrder
    file_path?: SortOrder
    mime_type?: SortOrder
    bsize?: SortOrder
    processed?: SortOrder
    errored?: SortOrder
    confidence?: SortOrder
    scanId?: SortOrder
  }

  export type ScanResultSumOrderByAggregateInput = {
    bsize?: SortOrder
  }

  export type EnumConfidenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Confidence | EnumConfidenceFieldRefInput<$PrismaModel>
    in?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    not?: NestedEnumConfidenceWithAggregatesFilter<$PrismaModel> | $Enums.Confidence
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfidenceFilter<$PrismaModel>
    _max?: NestedEnumConfidenceFilter<$PrismaModel>
  }

  export type TargetCreaterootsInput = {
    set: string[]
  }

  export type CrawlCreateNestedManyWithoutTargetInput = {
    create?: XOR<CrawlCreateWithoutTargetInput, CrawlUncheckedCreateWithoutTargetInput> | CrawlCreateWithoutTargetInput[] | CrawlUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CrawlCreateOrConnectWithoutTargetInput | CrawlCreateOrConnectWithoutTargetInput[]
    createMany?: CrawlCreateManyTargetInputEnvelope
    connect?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
  }

  export type ScanCreateNestedManyWithoutTargetInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type AgentCreateNestedOneWithoutTargetsInput = {
    create?: XOR<AgentCreateWithoutTargetsInput, AgentUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutTargetsInput
    connect?: AgentWhereUniqueInput
  }

  export type CrawlUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<CrawlCreateWithoutTargetInput, CrawlUncheckedCreateWithoutTargetInput> | CrawlCreateWithoutTargetInput[] | CrawlUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CrawlCreateOrConnectWithoutTargetInput | CrawlCreateOrConnectWithoutTargetInput[]
    createMany?: CrawlCreateManyTargetInputEnvelope
    connect?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
  }

  export type ScanUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TargetUpdaterootsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CrawlUpdateManyWithoutTargetNestedInput = {
    create?: XOR<CrawlCreateWithoutTargetInput, CrawlUncheckedCreateWithoutTargetInput> | CrawlCreateWithoutTargetInput[] | CrawlUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CrawlCreateOrConnectWithoutTargetInput | CrawlCreateOrConnectWithoutTargetInput[]
    upsert?: CrawlUpsertWithWhereUniqueWithoutTargetInput | CrawlUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: CrawlCreateManyTargetInputEnvelope
    set?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    disconnect?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    delete?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    connect?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    update?: CrawlUpdateWithWhereUniqueWithoutTargetInput | CrawlUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: CrawlUpdateManyWithWhereWithoutTargetInput | CrawlUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: CrawlScalarWhereInput | CrawlScalarWhereInput[]
  }

  export type ScanUpdateManyWithoutTargetNestedInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutTargetInput | ScanUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutTargetInput | ScanUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutTargetInput | ScanUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type AgentUpdateOneRequiredWithoutTargetsNestedInput = {
    create?: XOR<AgentCreateWithoutTargetsInput, AgentUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutTargetsInput
    upsert?: AgentUpsertWithoutTargetsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutTargetsInput, AgentUpdateWithoutTargetsInput>, AgentUncheckedUpdateWithoutTargetsInput>
  }

  export type CrawlUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<CrawlCreateWithoutTargetInput, CrawlUncheckedCreateWithoutTargetInput> | CrawlCreateWithoutTargetInput[] | CrawlUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: CrawlCreateOrConnectWithoutTargetInput | CrawlCreateOrConnectWithoutTargetInput[]
    upsert?: CrawlUpsertWithWhereUniqueWithoutTargetInput | CrawlUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: CrawlCreateManyTargetInputEnvelope
    set?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    disconnect?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    delete?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    connect?: CrawlWhereUniqueInput | CrawlWhereUniqueInput[]
    update?: CrawlUpdateWithWhereUniqueWithoutTargetInput | CrawlUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: CrawlUpdateManyWithWhereWithoutTargetInput | CrawlUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: CrawlScalarWhereInput | CrawlScalarWhereInput[]
  }

  export type ScanUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput> | ScanCreateWithoutTargetInput[] | ScanUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutTargetInput | ScanCreateOrConnectWithoutTargetInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutTargetInput | ScanUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: ScanCreateManyTargetInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutTargetInput | ScanUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutTargetInput | ScanUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type TargetCreateNestedManyWithoutAgentInput = {
    create?: XOR<TargetCreateWithoutAgentInput, TargetUncheckedCreateWithoutAgentInput> | TargetCreateWithoutAgentInput[] | TargetUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutAgentInput | TargetCreateOrConnectWithoutAgentInput[]
    createMany?: TargetCreateManyAgentInputEnvelope
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
  }

  export type TargetUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<TargetCreateWithoutAgentInput, TargetUncheckedCreateWithoutAgentInput> | TargetCreateWithoutAgentInput[] | TargetUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutAgentInput | TargetCreateOrConnectWithoutAgentInput[]
    createMany?: TargetCreateManyAgentInputEnvelope
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TargetUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TargetCreateWithoutAgentInput, TargetUncheckedCreateWithoutAgentInput> | TargetCreateWithoutAgentInput[] | TargetUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutAgentInput | TargetCreateOrConnectWithoutAgentInput[]
    upsert?: TargetUpsertWithWhereUniqueWithoutAgentInput | TargetUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TargetCreateManyAgentInputEnvelope
    set?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    disconnect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    delete?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    update?: TargetUpdateWithWhereUniqueWithoutAgentInput | TargetUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TargetUpdateManyWithWhereWithoutAgentInput | TargetUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TargetScalarWhereInput | TargetScalarWhereInput[]
  }

  export type TargetUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TargetCreateWithoutAgentInput, TargetUncheckedCreateWithoutAgentInput> | TargetCreateWithoutAgentInput[] | TargetUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TargetCreateOrConnectWithoutAgentInput | TargetCreateOrConnectWithoutAgentInput[]
    upsert?: TargetUpsertWithWhereUniqueWithoutAgentInput | TargetUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TargetCreateManyAgentInputEnvelope
    set?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    disconnect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    delete?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    connect?: TargetWhereUniqueInput | TargetWhereUniqueInput[]
    update?: TargetUpdateWithWhereUniqueWithoutAgentInput | TargetUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TargetUpdateManyWithWhereWithoutAgentInput | TargetUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TargetScalarWhereInput | TargetScalarWhereInput[]
  }

  export type CrawlCreateextensionsInput = {
    set: string[]
  }

  export type CrawlCreateunsupported_filesInput = {
    set: string[]
  }

  export type CrawlErrorCreateNestedManyWithoutCrawlInput = {
    create?: XOR<CrawlErrorCreateWithoutCrawlInput, CrawlErrorUncheckedCreateWithoutCrawlInput> | CrawlErrorCreateWithoutCrawlInput[] | CrawlErrorUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlErrorCreateOrConnectWithoutCrawlInput | CrawlErrorCreateOrConnectWithoutCrawlInput[]
    createMany?: CrawlErrorCreateManyCrawlInputEnvelope
    connect?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
  }

  export type CrawlHashCreateNestedManyWithoutCrawlInput = {
    create?: XOR<CrawlHashCreateWithoutCrawlInput, CrawlHashUncheckedCreateWithoutCrawlInput> | CrawlHashCreateWithoutCrawlInput[] | CrawlHashUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlHashCreateOrConnectWithoutCrawlInput | CrawlHashCreateOrConnectWithoutCrawlInput[]
    createMany?: CrawlHashCreateManyCrawlInputEnvelope
    connect?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
  }

  export type TargetCreateNestedOneWithoutCrawlsInput = {
    create?: XOR<TargetCreateWithoutCrawlsInput, TargetUncheckedCreateWithoutCrawlsInput>
    connectOrCreate?: TargetCreateOrConnectWithoutCrawlsInput
    connect?: TargetWhereUniqueInput
  }

  export type CrawlErrorUncheckedCreateNestedManyWithoutCrawlInput = {
    create?: XOR<CrawlErrorCreateWithoutCrawlInput, CrawlErrorUncheckedCreateWithoutCrawlInput> | CrawlErrorCreateWithoutCrawlInput[] | CrawlErrorUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlErrorCreateOrConnectWithoutCrawlInput | CrawlErrorCreateOrConnectWithoutCrawlInput[]
    createMany?: CrawlErrorCreateManyCrawlInputEnvelope
    connect?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
  }

  export type CrawlHashUncheckedCreateNestedManyWithoutCrawlInput = {
    create?: XOR<CrawlHashCreateWithoutCrawlInput, CrawlHashUncheckedCreateWithoutCrawlInput> | CrawlHashCreateWithoutCrawlInput[] | CrawlHashUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlHashCreateOrConnectWithoutCrawlInput | CrawlHashCreateOrConnectWithoutCrawlInput[]
    createMany?: CrawlHashCreateManyCrawlInputEnvelope
    connect?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type CrawlUpdateextensionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CrawlUpdateunsupported_filesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CrawlErrorUpdateManyWithoutCrawlNestedInput = {
    create?: XOR<CrawlErrorCreateWithoutCrawlInput, CrawlErrorUncheckedCreateWithoutCrawlInput> | CrawlErrorCreateWithoutCrawlInput[] | CrawlErrorUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlErrorCreateOrConnectWithoutCrawlInput | CrawlErrorCreateOrConnectWithoutCrawlInput[]
    upsert?: CrawlErrorUpsertWithWhereUniqueWithoutCrawlInput | CrawlErrorUpsertWithWhereUniqueWithoutCrawlInput[]
    createMany?: CrawlErrorCreateManyCrawlInputEnvelope
    set?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    disconnect?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    delete?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    connect?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    update?: CrawlErrorUpdateWithWhereUniqueWithoutCrawlInput | CrawlErrorUpdateWithWhereUniqueWithoutCrawlInput[]
    updateMany?: CrawlErrorUpdateManyWithWhereWithoutCrawlInput | CrawlErrorUpdateManyWithWhereWithoutCrawlInput[]
    deleteMany?: CrawlErrorScalarWhereInput | CrawlErrorScalarWhereInput[]
  }

  export type CrawlHashUpdateManyWithoutCrawlNestedInput = {
    create?: XOR<CrawlHashCreateWithoutCrawlInput, CrawlHashUncheckedCreateWithoutCrawlInput> | CrawlHashCreateWithoutCrawlInput[] | CrawlHashUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlHashCreateOrConnectWithoutCrawlInput | CrawlHashCreateOrConnectWithoutCrawlInput[]
    upsert?: CrawlHashUpsertWithWhereUniqueWithoutCrawlInput | CrawlHashUpsertWithWhereUniqueWithoutCrawlInput[]
    createMany?: CrawlHashCreateManyCrawlInputEnvelope
    set?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    disconnect?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    delete?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    connect?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    update?: CrawlHashUpdateWithWhereUniqueWithoutCrawlInput | CrawlHashUpdateWithWhereUniqueWithoutCrawlInput[]
    updateMany?: CrawlHashUpdateManyWithWhereWithoutCrawlInput | CrawlHashUpdateManyWithWhereWithoutCrawlInput[]
    deleteMany?: CrawlHashScalarWhereInput | CrawlHashScalarWhereInput[]
  }

  export type TargetUpdateOneRequiredWithoutCrawlsNestedInput = {
    create?: XOR<TargetCreateWithoutCrawlsInput, TargetUncheckedCreateWithoutCrawlsInput>
    connectOrCreate?: TargetCreateOrConnectWithoutCrawlsInput
    upsert?: TargetUpsertWithoutCrawlsInput
    connect?: TargetWhereUniqueInput
    update?: XOR<XOR<TargetUpdateToOneWithWhereWithoutCrawlsInput, TargetUpdateWithoutCrawlsInput>, TargetUncheckedUpdateWithoutCrawlsInput>
  }

  export type CrawlErrorUncheckedUpdateManyWithoutCrawlNestedInput = {
    create?: XOR<CrawlErrorCreateWithoutCrawlInput, CrawlErrorUncheckedCreateWithoutCrawlInput> | CrawlErrorCreateWithoutCrawlInput[] | CrawlErrorUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlErrorCreateOrConnectWithoutCrawlInput | CrawlErrorCreateOrConnectWithoutCrawlInput[]
    upsert?: CrawlErrorUpsertWithWhereUniqueWithoutCrawlInput | CrawlErrorUpsertWithWhereUniqueWithoutCrawlInput[]
    createMany?: CrawlErrorCreateManyCrawlInputEnvelope
    set?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    disconnect?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    delete?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    connect?: CrawlErrorWhereUniqueInput | CrawlErrorWhereUniqueInput[]
    update?: CrawlErrorUpdateWithWhereUniqueWithoutCrawlInput | CrawlErrorUpdateWithWhereUniqueWithoutCrawlInput[]
    updateMany?: CrawlErrorUpdateManyWithWhereWithoutCrawlInput | CrawlErrorUpdateManyWithWhereWithoutCrawlInput[]
    deleteMany?: CrawlErrorScalarWhereInput | CrawlErrorScalarWhereInput[]
  }

  export type CrawlHashUncheckedUpdateManyWithoutCrawlNestedInput = {
    create?: XOR<CrawlHashCreateWithoutCrawlInput, CrawlHashUncheckedCreateWithoutCrawlInput> | CrawlHashCreateWithoutCrawlInput[] | CrawlHashUncheckedCreateWithoutCrawlInput[]
    connectOrCreate?: CrawlHashCreateOrConnectWithoutCrawlInput | CrawlHashCreateOrConnectWithoutCrawlInput[]
    upsert?: CrawlHashUpsertWithWhereUniqueWithoutCrawlInput | CrawlHashUpsertWithWhereUniqueWithoutCrawlInput[]
    createMany?: CrawlHashCreateManyCrawlInputEnvelope
    set?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    disconnect?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    delete?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    connect?: CrawlHashWhereUniqueInput | CrawlHashWhereUniqueInput[]
    update?: CrawlHashUpdateWithWhereUniqueWithoutCrawlInput | CrawlHashUpdateWithWhereUniqueWithoutCrawlInput[]
    updateMany?: CrawlHashUpdateManyWithWhereWithoutCrawlInput | CrawlHashUpdateManyWithWhereWithoutCrawlInput[]
    deleteMany?: CrawlHashScalarWhereInput | CrawlHashScalarWhereInput[]
  }

  export type CrawlCreateNestedOneWithoutErrorsInput = {
    create?: XOR<CrawlCreateWithoutErrorsInput, CrawlUncheckedCreateWithoutErrorsInput>
    connectOrCreate?: CrawlCreateOrConnectWithoutErrorsInput
    connect?: CrawlWhereUniqueInput
  }

  export type CrawlUpdateOneRequiredWithoutErrorsNestedInput = {
    create?: XOR<CrawlCreateWithoutErrorsInput, CrawlUncheckedCreateWithoutErrorsInput>
    connectOrCreate?: CrawlCreateOrConnectWithoutErrorsInput
    upsert?: CrawlUpsertWithoutErrorsInput
    connect?: CrawlWhereUniqueInput
    update?: XOR<XOR<CrawlUpdateToOneWithWhereWithoutErrorsInput, CrawlUpdateWithoutErrorsInput>, CrawlUncheckedUpdateWithoutErrorsInput>
  }

  export type CrawlHashCreatefile_pathsInput = {
    set: string[]
  }

  export type CrawlCreateNestedOneWithoutHashesInput = {
    create?: XOR<CrawlCreateWithoutHashesInput, CrawlUncheckedCreateWithoutHashesInput>
    connectOrCreate?: CrawlCreateOrConnectWithoutHashesInput
    connect?: CrawlWhereUniqueInput
  }

  export type CrawlHashUpdatefile_pathsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CrawlUpdateOneRequiredWithoutHashesNestedInput = {
    create?: XOR<CrawlCreateWithoutHashesInput, CrawlUncheckedCreateWithoutHashesInput>
    connectOrCreate?: CrawlCreateOrConnectWithoutHashesInput
    upsert?: CrawlUpsertWithoutHashesInput
    connect?: CrawlWhereUniqueInput
    update?: XOR<XOR<CrawlUpdateToOneWithWhereWithoutHashesInput, CrawlUpdateWithoutHashesInput>, CrawlUncheckedUpdateWithoutHashesInput>
  }

  export type ScanErrorCreateNestedManyWithoutScanInput = {
    create?: XOR<ScanErrorCreateWithoutScanInput, ScanErrorUncheckedCreateWithoutScanInput> | ScanErrorCreateWithoutScanInput[] | ScanErrorUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanErrorCreateOrConnectWithoutScanInput | ScanErrorCreateOrConnectWithoutScanInput[]
    createMany?: ScanErrorCreateManyScanInputEnvelope
    connect?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
  }

  export type ScanResultCreateNestedManyWithoutScanInput = {
    create?: XOR<ScanResultCreateWithoutScanInput, ScanResultUncheckedCreateWithoutScanInput> | ScanResultCreateWithoutScanInput[] | ScanResultUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanResultCreateOrConnectWithoutScanInput | ScanResultCreateOrConnectWithoutScanInput[]
    createMany?: ScanResultCreateManyScanInputEnvelope
    connect?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
  }

  export type TargetCreateNestedOneWithoutScansInput = {
    create?: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
    connectOrCreate?: TargetCreateOrConnectWithoutScansInput
    connect?: TargetWhereUniqueInput
  }

  export type ScanErrorUncheckedCreateNestedManyWithoutScanInput = {
    create?: XOR<ScanErrorCreateWithoutScanInput, ScanErrorUncheckedCreateWithoutScanInput> | ScanErrorCreateWithoutScanInput[] | ScanErrorUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanErrorCreateOrConnectWithoutScanInput | ScanErrorCreateOrConnectWithoutScanInput[]
    createMany?: ScanErrorCreateManyScanInputEnvelope
    connect?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
  }

  export type ScanResultUncheckedCreateNestedManyWithoutScanInput = {
    create?: XOR<ScanResultCreateWithoutScanInput, ScanResultUncheckedCreateWithoutScanInput> | ScanResultCreateWithoutScanInput[] | ScanResultUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanResultCreateOrConnectWithoutScanInput | ScanResultCreateOrConnectWithoutScanInput[]
    createMany?: ScanResultCreateManyScanInputEnvelope
    connect?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ScanErrorUpdateManyWithoutScanNestedInput = {
    create?: XOR<ScanErrorCreateWithoutScanInput, ScanErrorUncheckedCreateWithoutScanInput> | ScanErrorCreateWithoutScanInput[] | ScanErrorUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanErrorCreateOrConnectWithoutScanInput | ScanErrorCreateOrConnectWithoutScanInput[]
    upsert?: ScanErrorUpsertWithWhereUniqueWithoutScanInput | ScanErrorUpsertWithWhereUniqueWithoutScanInput[]
    createMany?: ScanErrorCreateManyScanInputEnvelope
    set?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    disconnect?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    delete?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    connect?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    update?: ScanErrorUpdateWithWhereUniqueWithoutScanInput | ScanErrorUpdateWithWhereUniqueWithoutScanInput[]
    updateMany?: ScanErrorUpdateManyWithWhereWithoutScanInput | ScanErrorUpdateManyWithWhereWithoutScanInput[]
    deleteMany?: ScanErrorScalarWhereInput | ScanErrorScalarWhereInput[]
  }

  export type ScanResultUpdateManyWithoutScanNestedInput = {
    create?: XOR<ScanResultCreateWithoutScanInput, ScanResultUncheckedCreateWithoutScanInput> | ScanResultCreateWithoutScanInput[] | ScanResultUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanResultCreateOrConnectWithoutScanInput | ScanResultCreateOrConnectWithoutScanInput[]
    upsert?: ScanResultUpsertWithWhereUniqueWithoutScanInput | ScanResultUpsertWithWhereUniqueWithoutScanInput[]
    createMany?: ScanResultCreateManyScanInputEnvelope
    set?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    disconnect?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    delete?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    connect?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    update?: ScanResultUpdateWithWhereUniqueWithoutScanInput | ScanResultUpdateWithWhereUniqueWithoutScanInput[]
    updateMany?: ScanResultUpdateManyWithWhereWithoutScanInput | ScanResultUpdateManyWithWhereWithoutScanInput[]
    deleteMany?: ScanResultScalarWhereInput | ScanResultScalarWhereInput[]
  }

  export type TargetUpdateOneRequiredWithoutScansNestedInput = {
    create?: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
    connectOrCreate?: TargetCreateOrConnectWithoutScansInput
    upsert?: TargetUpsertWithoutScansInput
    connect?: TargetWhereUniqueInput
    update?: XOR<XOR<TargetUpdateToOneWithWhereWithoutScansInput, TargetUpdateWithoutScansInput>, TargetUncheckedUpdateWithoutScansInput>
  }

  export type ScanErrorUncheckedUpdateManyWithoutScanNestedInput = {
    create?: XOR<ScanErrorCreateWithoutScanInput, ScanErrorUncheckedCreateWithoutScanInput> | ScanErrorCreateWithoutScanInput[] | ScanErrorUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanErrorCreateOrConnectWithoutScanInput | ScanErrorCreateOrConnectWithoutScanInput[]
    upsert?: ScanErrorUpsertWithWhereUniqueWithoutScanInput | ScanErrorUpsertWithWhereUniqueWithoutScanInput[]
    createMany?: ScanErrorCreateManyScanInputEnvelope
    set?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    disconnect?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    delete?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    connect?: ScanErrorWhereUniqueInput | ScanErrorWhereUniqueInput[]
    update?: ScanErrorUpdateWithWhereUniqueWithoutScanInput | ScanErrorUpdateWithWhereUniqueWithoutScanInput[]
    updateMany?: ScanErrorUpdateManyWithWhereWithoutScanInput | ScanErrorUpdateManyWithWhereWithoutScanInput[]
    deleteMany?: ScanErrorScalarWhereInput | ScanErrorScalarWhereInput[]
  }

  export type ScanResultUncheckedUpdateManyWithoutScanNestedInput = {
    create?: XOR<ScanResultCreateWithoutScanInput, ScanResultUncheckedCreateWithoutScanInput> | ScanResultCreateWithoutScanInput[] | ScanResultUncheckedCreateWithoutScanInput[]
    connectOrCreate?: ScanResultCreateOrConnectWithoutScanInput | ScanResultCreateOrConnectWithoutScanInput[]
    upsert?: ScanResultUpsertWithWhereUniqueWithoutScanInput | ScanResultUpsertWithWhereUniqueWithoutScanInput[]
    createMany?: ScanResultCreateManyScanInputEnvelope
    set?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    disconnect?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    delete?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    connect?: ScanResultWhereUniqueInput | ScanResultWhereUniqueInput[]
    update?: ScanResultUpdateWithWhereUniqueWithoutScanInput | ScanResultUpdateWithWhereUniqueWithoutScanInput[]
    updateMany?: ScanResultUpdateManyWithWhereWithoutScanInput | ScanResultUpdateManyWithWhereWithoutScanInput[]
    deleteMany?: ScanResultScalarWhereInput | ScanResultScalarWhereInput[]
  }

  export type ScanCreateNestedOneWithoutErrorsInput = {
    create?: XOR<ScanCreateWithoutErrorsInput, ScanUncheckedCreateWithoutErrorsInput>
    connectOrCreate?: ScanCreateOrConnectWithoutErrorsInput
    connect?: ScanWhereUniqueInput
  }

  export type EnumSeverityFieldUpdateOperationsInput = {
    set?: $Enums.Severity
  }

  export type ScanUpdateOneRequiredWithoutErrorsNestedInput = {
    create?: XOR<ScanCreateWithoutErrorsInput, ScanUncheckedCreateWithoutErrorsInput>
    connectOrCreate?: ScanCreateOrConnectWithoutErrorsInput
    upsert?: ScanUpsertWithoutErrorsInput
    connect?: ScanWhereUniqueInput
    update?: XOR<XOR<ScanUpdateToOneWithWhereWithoutErrorsInput, ScanUpdateWithoutErrorsInput>, ScanUncheckedUpdateWithoutErrorsInput>
  }

  export type ScanResultCreatematchInput = {
    set: string[]
  }

  export type ScanCreateNestedOneWithoutResultsInput = {
    create?: XOR<ScanCreateWithoutResultsInput, ScanUncheckedCreateWithoutResultsInput>
    connectOrCreate?: ScanCreateOrConnectWithoutResultsInput
    connect?: ScanWhereUniqueInput
  }

  export type ScanResultUpdatematchInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumConfidenceFieldUpdateOperationsInput = {
    set?: $Enums.Confidence
  }

  export type ScanUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<ScanCreateWithoutResultsInput, ScanUncheckedCreateWithoutResultsInput>
    connectOrCreate?: ScanCreateOrConnectWithoutResultsInput
    upsert?: ScanUpsertWithoutResultsInput
    connect?: ScanWhereUniqueInput
    update?: XOR<XOR<ScanUpdateToOneWithWhereWithoutResultsInput, ScanUpdateWithoutResultsInput>, ScanUncheckedUpdateWithoutResultsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }

  export type NestedEnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }

  export type NestedEnumConfidenceFilter<$PrismaModel = never> = {
    equals?: $Enums.Confidence | EnumConfidenceFieldRefInput<$PrismaModel>
    in?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    not?: NestedEnumConfidenceFilter<$PrismaModel> | $Enums.Confidence
  }

  export type NestedEnumConfidenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Confidence | EnumConfidenceFieldRefInput<$PrismaModel>
    in?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Confidence[] | ListEnumConfidenceFieldRefInput<$PrismaModel>
    not?: NestedEnumConfidenceWithAggregatesFilter<$PrismaModel> | $Enums.Confidence
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfidenceFilter<$PrismaModel>
    _max?: NestedEnumConfidenceFilter<$PrismaModel>
  }

  export type CrawlCreateWithoutTargetInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    errors?: CrawlErrorCreateNestedManyWithoutCrawlInput
    hashes?: CrawlHashCreateNestedManyWithoutCrawlInput
  }

  export type CrawlUncheckedCreateWithoutTargetInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    errors?: CrawlErrorUncheckedCreateNestedManyWithoutCrawlInput
    hashes?: CrawlHashUncheckedCreateNestedManyWithoutCrawlInput
  }

  export type CrawlCreateOrConnectWithoutTargetInput = {
    where: CrawlWhereUniqueInput
    create: XOR<CrawlCreateWithoutTargetInput, CrawlUncheckedCreateWithoutTargetInput>
  }

  export type CrawlCreateManyTargetInputEnvelope = {
    data: CrawlCreateManyTargetInput | CrawlCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type ScanCreateWithoutTargetInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    errors?: ScanErrorCreateNestedManyWithoutScanInput
    results?: ScanResultCreateNestedManyWithoutScanInput
  }

  export type ScanUncheckedCreateWithoutTargetInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    errors?: ScanErrorUncheckedCreateNestedManyWithoutScanInput
    results?: ScanResultUncheckedCreateNestedManyWithoutScanInput
  }

  export type ScanCreateOrConnectWithoutTargetInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput>
  }

  export type ScanCreateManyTargetInputEnvelope = {
    data: ScanCreateManyTargetInput | ScanCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type AgentCreateWithoutTargetsInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    location: string
    status?: $Enums.Status
    os: string
    os_version: string
    arch: string
    processor: string
    cores: number
    logical_cpus: number
    ram_gb: number
  }

  export type AgentUncheckedCreateWithoutTargetsInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    location: string
    status?: $Enums.Status
    os: string
    os_version: string
    arch: string
    processor: string
    cores: number
    logical_cpus: number
    ram_gb: number
  }

  export type AgentCreateOrConnectWithoutTargetsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutTargetsInput, AgentUncheckedCreateWithoutTargetsInput>
  }

  export type CrawlUpsertWithWhereUniqueWithoutTargetInput = {
    where: CrawlWhereUniqueInput
    update: XOR<CrawlUpdateWithoutTargetInput, CrawlUncheckedUpdateWithoutTargetInput>
    create: XOR<CrawlCreateWithoutTargetInput, CrawlUncheckedCreateWithoutTargetInput>
  }

  export type CrawlUpdateWithWhereUniqueWithoutTargetInput = {
    where: CrawlWhereUniqueInput
    data: XOR<CrawlUpdateWithoutTargetInput, CrawlUncheckedUpdateWithoutTargetInput>
  }

  export type CrawlUpdateManyWithWhereWithoutTargetInput = {
    where: CrawlScalarWhereInput
    data: XOR<CrawlUpdateManyMutationInput, CrawlUncheckedUpdateManyWithoutTargetInput>
  }

  export type CrawlScalarWhereInput = {
    AND?: CrawlScalarWhereInput | CrawlScalarWhereInput[]
    OR?: CrawlScalarWhereInput[]
    NOT?: CrawlScalarWhereInput | CrawlScalarWhereInput[]
    id?: StringFilter<"Crawl"> | string
    created_at?: DateTimeFilter<"Crawl"> | Date | string
    updated_at?: DateTimeFilter<"Crawl"> | Date | string
    targeted_date?: DateTimeFilter<"Crawl"> | Date | string
    result_folder?: StringFilter<"Crawl"> | string
    root_path?: StringFilter<"Crawl"> | string
    use_history?: BoolFilter<"Crawl"> | boolean
    file_count?: IntFilter<"Crawl"> | number
    dir_count?: IntFilter<"Crawl"> | number
    total_size?: BigIntFilter<"Crawl"> | bigint | number
    scan_size?: BigIntFilter<"Crawl"> | bigint | number
    largest_file_size?: BigIntFilter<"Crawl"> | bigint | number
    largest_file_path?: StringFilter<"Crawl"> | string
    extensions?: StringNullableListFilter<"Crawl">
    start_time?: DateTimeFilter<"Crawl"> | Date | string
    end_time?: DateTimeFilter<"Crawl"> | Date | string
    throughput?: FloatFilter<"Crawl"> | number
    unsupported_files?: StringNullableListFilter<"Crawl">
    targetId?: StringFilter<"Crawl"> | string
  }

  export type ScanUpsertWithWhereUniqueWithoutTargetInput = {
    where: ScanWhereUniqueInput
    update: XOR<ScanUpdateWithoutTargetInput, ScanUncheckedUpdateWithoutTargetInput>
    create: XOR<ScanCreateWithoutTargetInput, ScanUncheckedCreateWithoutTargetInput>
  }

  export type ScanUpdateWithWhereUniqueWithoutTargetInput = {
    where: ScanWhereUniqueInput
    data: XOR<ScanUpdateWithoutTargetInput, ScanUncheckedUpdateWithoutTargetInput>
  }

  export type ScanUpdateManyWithWhereWithoutTargetInput = {
    where: ScanScalarWhereInput
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyWithoutTargetInput>
  }

  export type ScanScalarWhereInput = {
    AND?: ScanScalarWhereInput | ScanScalarWhereInput[]
    OR?: ScanScalarWhereInput[]
    NOT?: ScanScalarWhereInput | ScanScalarWhereInput[]
    id?: StringFilter<"Scan"> | string
    created_at?: DateTimeFilter<"Scan"> | Date | string
    updated_at?: DateTimeFilter<"Scan"> | Date | string
    targeted_date?: DateTimeFilter<"Scan"> | Date | string
    result_folder?: StringFilter<"Scan"> | string
    root_path?: StringFilter<"Scan"> | string
    start_time?: DateTimeFilter<"Scan"> | Date | string
    end_time?: DateTimeNullableFilter<"Scan"> | Date | string | null
    matches?: IntFilter<"Scan"> | number
    timeouts?: IntFilter<"Scan"> | number
    gigs_per_second?: FloatFilter<"Scan"> | number
    targetId?: StringFilter<"Scan"> | string
  }

  export type AgentUpsertWithoutTargetsInput = {
    update: XOR<AgentUpdateWithoutTargetsInput, AgentUncheckedUpdateWithoutTargetsInput>
    create: XOR<AgentCreateWithoutTargetsInput, AgentUncheckedCreateWithoutTargetsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutTargetsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutTargetsInput, AgentUncheckedUpdateWithoutTargetsInput>
  }

  export type AgentUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    os?: StringFieldUpdateOperationsInput | string
    os_version?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    cores?: IntFieldUpdateOperationsInput | number
    logical_cpus?: IntFieldUpdateOperationsInput | number
    ram_gb?: FloatFieldUpdateOperationsInput | number
  }

  export type AgentUncheckedUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    os?: StringFieldUpdateOperationsInput | string
    os_version?: StringFieldUpdateOperationsInput | string
    arch?: StringFieldUpdateOperationsInput | string
    processor?: StringFieldUpdateOperationsInput | string
    cores?: IntFieldUpdateOperationsInput | number
    logical_cpus?: IntFieldUpdateOperationsInput | number
    ram_gb?: FloatFieldUpdateOperationsInput | number
  }

  export type TargetCreateWithoutAgentInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    crawls?: CrawlCreateNestedManyWithoutTargetInput
    scans?: ScanCreateNestedManyWithoutTargetInput
  }

  export type TargetUncheckedCreateWithoutAgentInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    crawls?: CrawlUncheckedCreateNestedManyWithoutTargetInput
    scans?: ScanUncheckedCreateNestedManyWithoutTargetInput
  }

  export type TargetCreateOrConnectWithoutAgentInput = {
    where: TargetWhereUniqueInput
    create: XOR<TargetCreateWithoutAgentInput, TargetUncheckedCreateWithoutAgentInput>
  }

  export type TargetCreateManyAgentInputEnvelope = {
    data: TargetCreateManyAgentInput | TargetCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type TargetUpsertWithWhereUniqueWithoutAgentInput = {
    where: TargetWhereUniqueInput
    update: XOR<TargetUpdateWithoutAgentInput, TargetUncheckedUpdateWithoutAgentInput>
    create: XOR<TargetCreateWithoutAgentInput, TargetUncheckedCreateWithoutAgentInput>
  }

  export type TargetUpdateWithWhereUniqueWithoutAgentInput = {
    where: TargetWhereUniqueInput
    data: XOR<TargetUpdateWithoutAgentInput, TargetUncheckedUpdateWithoutAgentInput>
  }

  export type TargetUpdateManyWithWhereWithoutAgentInput = {
    where: TargetScalarWhereInput
    data: XOR<TargetUpdateManyMutationInput, TargetUncheckedUpdateManyWithoutAgentInput>
  }

  export type TargetScalarWhereInput = {
    AND?: TargetScalarWhereInput | TargetScalarWhereInput[]
    OR?: TargetScalarWhereInput[]
    NOT?: TargetScalarWhereInput | TargetScalarWhereInput[]
    id?: StringFilter<"Target"> | string
    created_at?: DateTimeFilter<"Target"> | Date | string
    updated_at?: DateTimeFilter<"Target"> | Date | string
    roots?: StringNullableListFilter<"Target">
    skip_completed?: BoolFilter<"Target"> | boolean
    max_workers?: IntFilter<"Target"> | number
    mem_thresh?: IntFilter<"Target"> | number
    use_history?: BoolFilter<"Target"> | boolean
    default_timeout?: IntFilter<"Target"> | number
    agentId?: StringFilter<"Target"> | string
  }

  export type CrawlErrorCreateWithoutCrawlInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    error_name: string
    error_desc: string
    file: string
  }

  export type CrawlErrorUncheckedCreateWithoutCrawlInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    error_name: string
    error_desc: string
    file: string
  }

  export type CrawlErrorCreateOrConnectWithoutCrawlInput = {
    where: CrawlErrorWhereUniqueInput
    create: XOR<CrawlErrorCreateWithoutCrawlInput, CrawlErrorUncheckedCreateWithoutCrawlInput>
  }

  export type CrawlErrorCreateManyCrawlInputEnvelope = {
    data: CrawlErrorCreateManyCrawlInput | CrawlErrorCreateManyCrawlInput[]
    skipDuplicates?: boolean
  }

  export type CrawlHashCreateWithoutCrawlInput = {
    hash: string
    created_at?: Date | string
    updated_at?: Date | string
    file_paths?: CrawlHashCreatefile_pathsInput | string[]
    bsize: number
    format: string
  }

  export type CrawlHashUncheckedCreateWithoutCrawlInput = {
    hash: string
    created_at?: Date | string
    updated_at?: Date | string
    file_paths?: CrawlHashCreatefile_pathsInput | string[]
    bsize: number
    format: string
  }

  export type CrawlHashCreateOrConnectWithoutCrawlInput = {
    where: CrawlHashWhereUniqueInput
    create: XOR<CrawlHashCreateWithoutCrawlInput, CrawlHashUncheckedCreateWithoutCrawlInput>
  }

  export type CrawlHashCreateManyCrawlInputEnvelope = {
    data: CrawlHashCreateManyCrawlInput | CrawlHashCreateManyCrawlInput[]
    skipDuplicates?: boolean
  }

  export type TargetCreateWithoutCrawlsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    scans?: ScanCreateNestedManyWithoutTargetInput
    agent: AgentCreateNestedOneWithoutTargetsInput
  }

  export type TargetUncheckedCreateWithoutCrawlsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    agentId: string
    scans?: ScanUncheckedCreateNestedManyWithoutTargetInput
  }

  export type TargetCreateOrConnectWithoutCrawlsInput = {
    where: TargetWhereUniqueInput
    create: XOR<TargetCreateWithoutCrawlsInput, TargetUncheckedCreateWithoutCrawlsInput>
  }

  export type CrawlErrorUpsertWithWhereUniqueWithoutCrawlInput = {
    where: CrawlErrorWhereUniqueInput
    update: XOR<CrawlErrorUpdateWithoutCrawlInput, CrawlErrorUncheckedUpdateWithoutCrawlInput>
    create: XOR<CrawlErrorCreateWithoutCrawlInput, CrawlErrorUncheckedCreateWithoutCrawlInput>
  }

  export type CrawlErrorUpdateWithWhereUniqueWithoutCrawlInput = {
    where: CrawlErrorWhereUniqueInput
    data: XOR<CrawlErrorUpdateWithoutCrawlInput, CrawlErrorUncheckedUpdateWithoutCrawlInput>
  }

  export type CrawlErrorUpdateManyWithWhereWithoutCrawlInput = {
    where: CrawlErrorScalarWhereInput
    data: XOR<CrawlErrorUpdateManyMutationInput, CrawlErrorUncheckedUpdateManyWithoutCrawlInput>
  }

  export type CrawlErrorScalarWhereInput = {
    AND?: CrawlErrorScalarWhereInput | CrawlErrorScalarWhereInput[]
    OR?: CrawlErrorScalarWhereInput[]
    NOT?: CrawlErrorScalarWhereInput | CrawlErrorScalarWhereInput[]
    id?: StringFilter<"CrawlError"> | string
    created_at?: DateTimeFilter<"CrawlError"> | Date | string
    updated_at?: DateTimeFilter<"CrawlError"> | Date | string
    error_name?: StringFilter<"CrawlError"> | string
    error_desc?: StringFilter<"CrawlError"> | string
    file?: StringFilter<"CrawlError"> | string
    crawlId?: StringFilter<"CrawlError"> | string
  }

  export type CrawlHashUpsertWithWhereUniqueWithoutCrawlInput = {
    where: CrawlHashWhereUniqueInput
    update: XOR<CrawlHashUpdateWithoutCrawlInput, CrawlHashUncheckedUpdateWithoutCrawlInput>
    create: XOR<CrawlHashCreateWithoutCrawlInput, CrawlHashUncheckedCreateWithoutCrawlInput>
  }

  export type CrawlHashUpdateWithWhereUniqueWithoutCrawlInput = {
    where: CrawlHashWhereUniqueInput
    data: XOR<CrawlHashUpdateWithoutCrawlInput, CrawlHashUncheckedUpdateWithoutCrawlInput>
  }

  export type CrawlHashUpdateManyWithWhereWithoutCrawlInput = {
    where: CrawlHashScalarWhereInput
    data: XOR<CrawlHashUpdateManyMutationInput, CrawlHashUncheckedUpdateManyWithoutCrawlInput>
  }

  export type CrawlHashScalarWhereInput = {
    AND?: CrawlHashScalarWhereInput | CrawlHashScalarWhereInput[]
    OR?: CrawlHashScalarWhereInput[]
    NOT?: CrawlHashScalarWhereInput | CrawlHashScalarWhereInput[]
    hash?: StringFilter<"CrawlHash"> | string
    created_at?: DateTimeFilter<"CrawlHash"> | Date | string
    updated_at?: DateTimeFilter<"CrawlHash"> | Date | string
    file_paths?: StringNullableListFilter<"CrawlHash">
    bsize?: IntFilter<"CrawlHash"> | number
    format?: StringFilter<"CrawlHash"> | string
    crawlId?: StringFilter<"CrawlHash"> | string
  }

  export type TargetUpsertWithoutCrawlsInput = {
    update: XOR<TargetUpdateWithoutCrawlsInput, TargetUncheckedUpdateWithoutCrawlsInput>
    create: XOR<TargetCreateWithoutCrawlsInput, TargetUncheckedCreateWithoutCrawlsInput>
    where?: TargetWhereInput
  }

  export type TargetUpdateToOneWithWhereWithoutCrawlsInput = {
    where?: TargetWhereInput
    data: XOR<TargetUpdateWithoutCrawlsInput, TargetUncheckedUpdateWithoutCrawlsInput>
  }

  export type TargetUpdateWithoutCrawlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    scans?: ScanUpdateManyWithoutTargetNestedInput
    agent?: AgentUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type TargetUncheckedUpdateWithoutCrawlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    agentId?: StringFieldUpdateOperationsInput | string
    scans?: ScanUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type CrawlCreateWithoutErrorsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    hashes?: CrawlHashCreateNestedManyWithoutCrawlInput
    target: TargetCreateNestedOneWithoutCrawlsInput
  }

  export type CrawlUncheckedCreateWithoutErrorsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    targetId: string
    hashes?: CrawlHashUncheckedCreateNestedManyWithoutCrawlInput
  }

  export type CrawlCreateOrConnectWithoutErrorsInput = {
    where: CrawlWhereUniqueInput
    create: XOR<CrawlCreateWithoutErrorsInput, CrawlUncheckedCreateWithoutErrorsInput>
  }

  export type CrawlUpsertWithoutErrorsInput = {
    update: XOR<CrawlUpdateWithoutErrorsInput, CrawlUncheckedUpdateWithoutErrorsInput>
    create: XOR<CrawlCreateWithoutErrorsInput, CrawlUncheckedCreateWithoutErrorsInput>
    where?: CrawlWhereInput
  }

  export type CrawlUpdateToOneWithWhereWithoutErrorsInput = {
    where?: CrawlWhereInput
    data: XOR<CrawlUpdateWithoutErrorsInput, CrawlUncheckedUpdateWithoutErrorsInput>
  }

  export type CrawlUpdateWithoutErrorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    hashes?: CrawlHashUpdateManyWithoutCrawlNestedInput
    target?: TargetUpdateOneRequiredWithoutCrawlsNestedInput
  }

  export type CrawlUncheckedUpdateWithoutErrorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    targetId?: StringFieldUpdateOperationsInput | string
    hashes?: CrawlHashUncheckedUpdateManyWithoutCrawlNestedInput
  }

  export type CrawlCreateWithoutHashesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    errors?: CrawlErrorCreateNestedManyWithoutCrawlInput
    target: TargetCreateNestedOneWithoutCrawlsInput
  }

  export type CrawlUncheckedCreateWithoutHashesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
    targetId: string
    errors?: CrawlErrorUncheckedCreateNestedManyWithoutCrawlInput
  }

  export type CrawlCreateOrConnectWithoutHashesInput = {
    where: CrawlWhereUniqueInput
    create: XOR<CrawlCreateWithoutHashesInput, CrawlUncheckedCreateWithoutHashesInput>
  }

  export type CrawlUpsertWithoutHashesInput = {
    update: XOR<CrawlUpdateWithoutHashesInput, CrawlUncheckedUpdateWithoutHashesInput>
    create: XOR<CrawlCreateWithoutHashesInput, CrawlUncheckedCreateWithoutHashesInput>
    where?: CrawlWhereInput
  }

  export type CrawlUpdateToOneWithWhereWithoutHashesInput = {
    where?: CrawlWhereInput
    data: XOR<CrawlUpdateWithoutHashesInput, CrawlUncheckedUpdateWithoutHashesInput>
  }

  export type CrawlUpdateWithoutHashesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    errors?: CrawlErrorUpdateManyWithoutCrawlNestedInput
    target?: TargetUpdateOneRequiredWithoutCrawlsNestedInput
  }

  export type CrawlUncheckedUpdateWithoutHashesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    targetId?: StringFieldUpdateOperationsInput | string
    errors?: CrawlErrorUncheckedUpdateManyWithoutCrawlNestedInput
  }

  export type ScanErrorCreateWithoutScanInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    occurred_at: Date | string
    severity: $Enums.Severity
    error_name: string
    error_desc: string
    file: string
  }

  export type ScanErrorUncheckedCreateWithoutScanInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    occurred_at: Date | string
    severity: $Enums.Severity
    error_name: string
    error_desc: string
    file: string
  }

  export type ScanErrorCreateOrConnectWithoutScanInput = {
    where: ScanErrorWhereUniqueInput
    create: XOR<ScanErrorCreateWithoutScanInput, ScanErrorUncheckedCreateWithoutScanInput>
  }

  export type ScanErrorCreateManyScanInputEnvelope = {
    data: ScanErrorCreateManyScanInput | ScanErrorCreateManyScanInput[]
    skipDuplicates?: boolean
  }

  export type ScanResultCreateWithoutScanInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    hash: string
    file_path: string
    mime_type: string
    bsize: number
    processed: boolean
    errored: boolean
    match?: ScanResultCreatematchInput | string[]
    confidence: $Enums.Confidence
  }

  export type ScanResultUncheckedCreateWithoutScanInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    hash: string
    file_path: string
    mime_type: string
    bsize: number
    processed: boolean
    errored: boolean
    match?: ScanResultCreatematchInput | string[]
    confidence: $Enums.Confidence
  }

  export type ScanResultCreateOrConnectWithoutScanInput = {
    where: ScanResultWhereUniqueInput
    create: XOR<ScanResultCreateWithoutScanInput, ScanResultUncheckedCreateWithoutScanInput>
  }

  export type ScanResultCreateManyScanInputEnvelope = {
    data: ScanResultCreateManyScanInput | ScanResultCreateManyScanInput[]
    skipDuplicates?: boolean
  }

  export type TargetCreateWithoutScansInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    crawls?: CrawlCreateNestedManyWithoutTargetInput
    agent: AgentCreateNestedOneWithoutTargetsInput
  }

  export type TargetUncheckedCreateWithoutScansInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
    agentId: string
    crawls?: CrawlUncheckedCreateNestedManyWithoutTargetInput
  }

  export type TargetCreateOrConnectWithoutScansInput = {
    where: TargetWhereUniqueInput
    create: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
  }

  export type ScanErrorUpsertWithWhereUniqueWithoutScanInput = {
    where: ScanErrorWhereUniqueInput
    update: XOR<ScanErrorUpdateWithoutScanInput, ScanErrorUncheckedUpdateWithoutScanInput>
    create: XOR<ScanErrorCreateWithoutScanInput, ScanErrorUncheckedCreateWithoutScanInput>
  }

  export type ScanErrorUpdateWithWhereUniqueWithoutScanInput = {
    where: ScanErrorWhereUniqueInput
    data: XOR<ScanErrorUpdateWithoutScanInput, ScanErrorUncheckedUpdateWithoutScanInput>
  }

  export type ScanErrorUpdateManyWithWhereWithoutScanInput = {
    where: ScanErrorScalarWhereInput
    data: XOR<ScanErrorUpdateManyMutationInput, ScanErrorUncheckedUpdateManyWithoutScanInput>
  }

  export type ScanErrorScalarWhereInput = {
    AND?: ScanErrorScalarWhereInput | ScanErrorScalarWhereInput[]
    OR?: ScanErrorScalarWhereInput[]
    NOT?: ScanErrorScalarWhereInput | ScanErrorScalarWhereInput[]
    id?: StringFilter<"ScanError"> | string
    created_at?: DateTimeFilter<"ScanError"> | Date | string
    updated_at?: DateTimeFilter<"ScanError"> | Date | string
    occurred_at?: DateTimeFilter<"ScanError"> | Date | string
    severity?: EnumSeverityFilter<"ScanError"> | $Enums.Severity
    error_name?: StringFilter<"ScanError"> | string
    error_desc?: StringFilter<"ScanError"> | string
    file?: StringFilter<"ScanError"> | string
    scanId?: StringFilter<"ScanError"> | string
  }

  export type ScanResultUpsertWithWhereUniqueWithoutScanInput = {
    where: ScanResultWhereUniqueInput
    update: XOR<ScanResultUpdateWithoutScanInput, ScanResultUncheckedUpdateWithoutScanInput>
    create: XOR<ScanResultCreateWithoutScanInput, ScanResultUncheckedCreateWithoutScanInput>
  }

  export type ScanResultUpdateWithWhereUniqueWithoutScanInput = {
    where: ScanResultWhereUniqueInput
    data: XOR<ScanResultUpdateWithoutScanInput, ScanResultUncheckedUpdateWithoutScanInput>
  }

  export type ScanResultUpdateManyWithWhereWithoutScanInput = {
    where: ScanResultScalarWhereInput
    data: XOR<ScanResultUpdateManyMutationInput, ScanResultUncheckedUpdateManyWithoutScanInput>
  }

  export type ScanResultScalarWhereInput = {
    AND?: ScanResultScalarWhereInput | ScanResultScalarWhereInput[]
    OR?: ScanResultScalarWhereInput[]
    NOT?: ScanResultScalarWhereInput | ScanResultScalarWhereInput[]
    id?: StringFilter<"ScanResult"> | string
    created_at?: DateTimeFilter<"ScanResult"> | Date | string
    updated_at?: DateTimeFilter<"ScanResult"> | Date | string
    hash?: StringFilter<"ScanResult"> | string
    file_path?: StringFilter<"ScanResult"> | string
    mime_type?: StringFilter<"ScanResult"> | string
    bsize?: IntFilter<"ScanResult"> | number
    processed?: BoolFilter<"ScanResult"> | boolean
    errored?: BoolFilter<"ScanResult"> | boolean
    match?: StringNullableListFilter<"ScanResult">
    confidence?: EnumConfidenceFilter<"ScanResult"> | $Enums.Confidence
    scanId?: StringFilter<"ScanResult"> | string
  }

  export type TargetUpsertWithoutScansInput = {
    update: XOR<TargetUpdateWithoutScansInput, TargetUncheckedUpdateWithoutScansInput>
    create: XOR<TargetCreateWithoutScansInput, TargetUncheckedCreateWithoutScansInput>
    where?: TargetWhereInput
  }

  export type TargetUpdateToOneWithWhereWithoutScansInput = {
    where?: TargetWhereInput
    data: XOR<TargetUpdateWithoutScansInput, TargetUncheckedUpdateWithoutScansInput>
  }

  export type TargetUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    crawls?: CrawlUpdateManyWithoutTargetNestedInput
    agent?: AgentUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type TargetUncheckedUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    agentId?: StringFieldUpdateOperationsInput | string
    crawls?: CrawlUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type ScanCreateWithoutErrorsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    results?: ScanResultCreateNestedManyWithoutScanInput
    target: TargetCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateWithoutErrorsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    targetId: string
    results?: ScanResultUncheckedCreateNestedManyWithoutScanInput
  }

  export type ScanCreateOrConnectWithoutErrorsInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutErrorsInput, ScanUncheckedCreateWithoutErrorsInput>
  }

  export type ScanUpsertWithoutErrorsInput = {
    update: XOR<ScanUpdateWithoutErrorsInput, ScanUncheckedUpdateWithoutErrorsInput>
    create: XOR<ScanCreateWithoutErrorsInput, ScanUncheckedCreateWithoutErrorsInput>
    where?: ScanWhereInput
  }

  export type ScanUpdateToOneWithWhereWithoutErrorsInput = {
    where?: ScanWhereInput
    data: XOR<ScanUpdateWithoutErrorsInput, ScanUncheckedUpdateWithoutErrorsInput>
  }

  export type ScanUpdateWithoutErrorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    results?: ScanResultUpdateManyWithoutScanNestedInput
    target?: TargetUpdateOneRequiredWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateWithoutErrorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    targetId?: StringFieldUpdateOperationsInput | string
    results?: ScanResultUncheckedUpdateManyWithoutScanNestedInput
  }

  export type ScanCreateWithoutResultsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    errors?: ScanErrorCreateNestedManyWithoutScanInput
    target: TargetCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateWithoutResultsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
    targetId: string
    errors?: ScanErrorUncheckedCreateNestedManyWithoutScanInput
  }

  export type ScanCreateOrConnectWithoutResultsInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutResultsInput, ScanUncheckedCreateWithoutResultsInput>
  }

  export type ScanUpsertWithoutResultsInput = {
    update: XOR<ScanUpdateWithoutResultsInput, ScanUncheckedUpdateWithoutResultsInput>
    create: XOR<ScanCreateWithoutResultsInput, ScanUncheckedCreateWithoutResultsInput>
    where?: ScanWhereInput
  }

  export type ScanUpdateToOneWithWhereWithoutResultsInput = {
    where?: ScanWhereInput
    data: XOR<ScanUpdateWithoutResultsInput, ScanUncheckedUpdateWithoutResultsInput>
  }

  export type ScanUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    errors?: ScanErrorUpdateManyWithoutScanNestedInput
    target?: TargetUpdateOneRequiredWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateWithoutResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    targetId?: StringFieldUpdateOperationsInput | string
    errors?: ScanErrorUncheckedUpdateManyWithoutScanNestedInput
  }

  export type CrawlCreateManyTargetInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    use_history?: boolean
    file_count: number
    dir_count: number
    total_size: bigint | number
    scan_size: bigint | number
    largest_file_size: bigint | number
    largest_file_path: string
    extensions?: CrawlCreateextensionsInput | string[]
    start_time?: Date | string
    end_time: Date | string
    throughput: number
    unsupported_files?: CrawlCreateunsupported_filesInput | string[]
  }

  export type ScanCreateManyTargetInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    targeted_date: Date | string
    result_folder: string
    root_path: string
    start_time?: Date | string
    end_time?: Date | string | null
    matches: number
    timeouts: number
    gigs_per_second: number
  }

  export type CrawlUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    errors?: CrawlErrorUpdateManyWithoutCrawlNestedInput
    hashes?: CrawlHashUpdateManyWithoutCrawlNestedInput
  }

  export type CrawlUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
    errors?: CrawlErrorUncheckedUpdateManyWithoutCrawlNestedInput
    hashes?: CrawlHashUncheckedUpdateManyWithoutCrawlNestedInput
  }

  export type CrawlUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    use_history?: BoolFieldUpdateOperationsInput | boolean
    file_count?: IntFieldUpdateOperationsInput | number
    dir_count?: IntFieldUpdateOperationsInput | number
    total_size?: BigIntFieldUpdateOperationsInput | bigint | number
    scan_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    largest_file_path?: StringFieldUpdateOperationsInput | string
    extensions?: CrawlUpdateextensionsInput | string[]
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    throughput?: FloatFieldUpdateOperationsInput | number
    unsupported_files?: CrawlUpdateunsupported_filesInput | string[]
  }

  export type ScanUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    errors?: ScanErrorUpdateManyWithoutScanNestedInput
    results?: ScanResultUpdateManyWithoutScanNestedInput
  }

  export type ScanUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
    errors?: ScanErrorUncheckedUpdateManyWithoutScanNestedInput
    results?: ScanResultUncheckedUpdateManyWithoutScanNestedInput
  }

  export type ScanUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targeted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    result_folder?: StringFieldUpdateOperationsInput | string
    root_path?: StringFieldUpdateOperationsInput | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matches?: IntFieldUpdateOperationsInput | number
    timeouts?: IntFieldUpdateOperationsInput | number
    gigs_per_second?: FloatFieldUpdateOperationsInput | number
  }

  export type TargetCreateManyAgentInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    roots?: TargetCreaterootsInput | string[]
    skip_completed: boolean
    max_workers: number
    mem_thresh: number
    use_history: boolean
    default_timeout: number
  }

  export type TargetUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    crawls?: CrawlUpdateManyWithoutTargetNestedInput
    scans?: ScanUpdateManyWithoutTargetNestedInput
  }

  export type TargetUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
    crawls?: CrawlUncheckedUpdateManyWithoutTargetNestedInput
    scans?: ScanUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type TargetUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roots?: TargetUpdaterootsInput | string[]
    skip_completed?: BoolFieldUpdateOperationsInput | boolean
    max_workers?: IntFieldUpdateOperationsInput | number
    mem_thresh?: IntFieldUpdateOperationsInput | number
    use_history?: BoolFieldUpdateOperationsInput | boolean
    default_timeout?: IntFieldUpdateOperationsInput | number
  }

  export type CrawlErrorCreateManyCrawlInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    error_name: string
    error_desc: string
    file: string
  }

  export type CrawlHashCreateManyCrawlInput = {
    hash: string
    created_at?: Date | string
    updated_at?: Date | string
    file_paths?: CrawlHashCreatefile_pathsInput | string[]
    bsize: number
    format: string
  }

  export type CrawlErrorUpdateWithoutCrawlInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlErrorUncheckedUpdateWithoutCrawlInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlErrorUncheckedUpdateManyWithoutCrawlInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlHashUpdateWithoutCrawlInput = {
    hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_paths?: CrawlHashUpdatefile_pathsInput | string[]
    bsize?: IntFieldUpdateOperationsInput | number
    format?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlHashUncheckedUpdateWithoutCrawlInput = {
    hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_paths?: CrawlHashUpdatefile_pathsInput | string[]
    bsize?: IntFieldUpdateOperationsInput | number
    format?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlHashUncheckedUpdateManyWithoutCrawlInput = {
    hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_paths?: CrawlHashUpdatefile_pathsInput | string[]
    bsize?: IntFieldUpdateOperationsInput | number
    format?: StringFieldUpdateOperationsInput | string
  }

  export type ScanErrorCreateManyScanInput = {
    id: string
    created_at?: Date | string
    updated_at?: Date | string
    occurred_at: Date | string
    severity: $Enums.Severity
    error_name: string
    error_desc: string
    file: string
  }

  export type ScanResultCreateManyScanInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    hash: string
    file_path: string
    mime_type: string
    bsize: number
    processed: boolean
    errored: boolean
    match?: ScanResultCreatematchInput | string[]
    confidence: $Enums.Confidence
  }

  export type ScanErrorUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    occurred_at?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type ScanErrorUncheckedUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    occurred_at?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type ScanErrorUncheckedUpdateManyWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    occurred_at?: DateTimeFieldUpdateOperationsInput | Date | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    error_name?: StringFieldUpdateOperationsInput | string
    error_desc?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type ScanResultUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    mime_type?: StringFieldUpdateOperationsInput | string
    bsize?: IntFieldUpdateOperationsInput | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    errored?: BoolFieldUpdateOperationsInput | boolean
    match?: ScanResultUpdatematchInput | string[]
    confidence?: EnumConfidenceFieldUpdateOperationsInput | $Enums.Confidence
  }

  export type ScanResultUncheckedUpdateWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    mime_type?: StringFieldUpdateOperationsInput | string
    bsize?: IntFieldUpdateOperationsInput | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    errored?: BoolFieldUpdateOperationsInput | boolean
    match?: ScanResultUpdatematchInput | string[]
    confidence?: EnumConfidenceFieldUpdateOperationsInput | $Enums.Confidence
  }

  export type ScanResultUncheckedUpdateManyWithoutScanInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    mime_type?: StringFieldUpdateOperationsInput | string
    bsize?: IntFieldUpdateOperationsInput | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    errored?: BoolFieldUpdateOperationsInput | boolean
    match?: ScanResultUpdatematchInput | string[]
    confidence?: EnumConfidenceFieldUpdateOperationsInput | $Enums.Confidence
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
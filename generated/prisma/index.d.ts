
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
 * Model Propietario
 * 
 */
export type Propietario = $Result.DefaultSelection<Prisma.$PropietarioPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Propietarios
 * const propietarios = await prisma.propietario.findMany()
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
   * // Fetch zero or more Propietarios
   * const propietarios = await prisma.propietario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.propietario`: Exposes CRUD operations for the **Propietario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Propietarios
    * const propietarios = await prisma.propietario.findMany()
    * ```
    */
  get propietario(): Prisma.PropietarioDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Propietario: 'Propietario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "propietario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Propietario: {
        payload: Prisma.$PropietarioPayload<ExtArgs>
        fields: Prisma.PropietarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropietarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropietarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>
          }
          findFirst: {
            args: Prisma.PropietarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropietarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>
          }
          findMany: {
            args: Prisma.PropietarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>[]
          }
          create: {
            args: Prisma.PropietarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>
          }
          createMany: {
            args: Prisma.PropietarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropietarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>[]
          }
          delete: {
            args: Prisma.PropietarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>
          }
          update: {
            args: Prisma.PropietarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>
          }
          deleteMany: {
            args: Prisma.PropietarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropietarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropietarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>[]
          }
          upsert: {
            args: Prisma.PropietarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropietarioPayload>
          }
          aggregate: {
            args: Prisma.PropietarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropietario>
          }
          groupBy: {
            args: Prisma.PropietarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropietarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropietarioCountArgs<ExtArgs>
            result: $Utils.Optional<PropietarioCountAggregateOutputType> | number
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
    propietario?: PropietarioOmit
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
   * Models
   */

  /**
   * Model Propietario
   */

  export type AggregatePropietario = {
    _count: PropietarioCountAggregateOutputType | null
    _avg: PropietarioAvgAggregateOutputType | null
    _sum: PropietarioSumAggregateOutputType | null
    _min: PropietarioMinAggregateOutputType | null
    _max: PropietarioMaxAggregateOutputType | null
  }

  export type PropietarioAvgAggregateOutputType = {
    prop_id: number | null
    empresa_id: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type PropietarioSumAggregateOutputType = {
    prop_id: number | null
    empresa_id: number | null
    createdBy: number | null
    updatedBy: number | null
  }

  export type PropietarioMinAggregateOutputType = {
    prop_id: number | null
    prop_identificacion: string | null
    prop_nombre: string | null
    prop_apellido: string | null
    prop_email: string | null
    prop_celular: string | null
    prop_direccion: string | null
    prop_observaciones: string | null
    empresa_id: number | null
    activo: boolean | null
    createdBy: number | null
    updatedBy: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PropietarioMaxAggregateOutputType = {
    prop_id: number | null
    prop_identificacion: string | null
    prop_nombre: string | null
    prop_apellido: string | null
    prop_email: string | null
    prop_celular: string | null
    prop_direccion: string | null
    prop_observaciones: string | null
    empresa_id: number | null
    activo: boolean | null
    createdBy: number | null
    updatedBy: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PropietarioCountAggregateOutputType = {
    prop_id: number
    prop_identificacion: number
    prop_nombre: number
    prop_apellido: number
    prop_email: number
    prop_celular: number
    prop_direccion: number
    prop_observaciones: number
    empresa_id: number
    activo: number
    createdBy: number
    updatedBy: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PropietarioAvgAggregateInputType = {
    prop_id?: true
    empresa_id?: true
    createdBy?: true
    updatedBy?: true
  }

  export type PropietarioSumAggregateInputType = {
    prop_id?: true
    empresa_id?: true
    createdBy?: true
    updatedBy?: true
  }

  export type PropietarioMinAggregateInputType = {
    prop_id?: true
    prop_identificacion?: true
    prop_nombre?: true
    prop_apellido?: true
    prop_email?: true
    prop_celular?: true
    prop_direccion?: true
    prop_observaciones?: true
    empresa_id?: true
    activo?: true
    createdBy?: true
    updatedBy?: true
    created_at?: true
    updated_at?: true
  }

  export type PropietarioMaxAggregateInputType = {
    prop_id?: true
    prop_identificacion?: true
    prop_nombre?: true
    prop_apellido?: true
    prop_email?: true
    prop_celular?: true
    prop_direccion?: true
    prop_observaciones?: true
    empresa_id?: true
    activo?: true
    createdBy?: true
    updatedBy?: true
    created_at?: true
    updated_at?: true
  }

  export type PropietarioCountAggregateInputType = {
    prop_id?: true
    prop_identificacion?: true
    prop_nombre?: true
    prop_apellido?: true
    prop_email?: true
    prop_celular?: true
    prop_direccion?: true
    prop_observaciones?: true
    empresa_id?: true
    activo?: true
    createdBy?: true
    updatedBy?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PropietarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Propietario to aggregate.
     */
    where?: PropietarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propietarios to fetch.
     */
    orderBy?: PropietarioOrderByWithRelationInput | PropietarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropietarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propietarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propietarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Propietarios
    **/
    _count?: true | PropietarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropietarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropietarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropietarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropietarioMaxAggregateInputType
  }

  export type GetPropietarioAggregateType<T extends PropietarioAggregateArgs> = {
        [P in keyof T & keyof AggregatePropietario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropietario[P]>
      : GetScalarType<T[P], AggregatePropietario[P]>
  }




  export type PropietarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropietarioWhereInput
    orderBy?: PropietarioOrderByWithAggregationInput | PropietarioOrderByWithAggregationInput[]
    by: PropietarioScalarFieldEnum[] | PropietarioScalarFieldEnum
    having?: PropietarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropietarioCountAggregateInputType | true
    _avg?: PropietarioAvgAggregateInputType
    _sum?: PropietarioSumAggregateInputType
    _min?: PropietarioMinAggregateInputType
    _max?: PropietarioMaxAggregateInputType
  }

  export type PropietarioGroupByOutputType = {
    prop_id: number
    prop_identificacion: string
    prop_nombre: string
    prop_apellido: string
    prop_email: string
    prop_celular: string
    prop_direccion: string
    prop_observaciones: string
    empresa_id: number
    activo: boolean
    createdBy: number | null
    updatedBy: number | null
    created_at: Date
    updated_at: Date
    _count: PropietarioCountAggregateOutputType | null
    _avg: PropietarioAvgAggregateOutputType | null
    _sum: PropietarioSumAggregateOutputType | null
    _min: PropietarioMinAggregateOutputType | null
    _max: PropietarioMaxAggregateOutputType | null
  }

  type GetPropietarioGroupByPayload<T extends PropietarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropietarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropietarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropietarioGroupByOutputType[P]>
            : GetScalarType<T[P], PropietarioGroupByOutputType[P]>
        }
      >
    >


  export type PropietarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    prop_id?: boolean
    prop_identificacion?: boolean
    prop_nombre?: boolean
    prop_apellido?: boolean
    prop_email?: boolean
    prop_celular?: boolean
    prop_direccion?: boolean
    prop_observaciones?: boolean
    empresa_id?: boolean
    activo?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["propietario"]>

  export type PropietarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    prop_id?: boolean
    prop_identificacion?: boolean
    prop_nombre?: boolean
    prop_apellido?: boolean
    prop_email?: boolean
    prop_celular?: boolean
    prop_direccion?: boolean
    prop_observaciones?: boolean
    empresa_id?: boolean
    activo?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["propietario"]>

  export type PropietarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    prop_id?: boolean
    prop_identificacion?: boolean
    prop_nombre?: boolean
    prop_apellido?: boolean
    prop_email?: boolean
    prop_celular?: boolean
    prop_direccion?: boolean
    prop_observaciones?: boolean
    empresa_id?: boolean
    activo?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["propietario"]>

  export type PropietarioSelectScalar = {
    prop_id?: boolean
    prop_identificacion?: boolean
    prop_nombre?: boolean
    prop_apellido?: boolean
    prop_email?: boolean
    prop_celular?: boolean
    prop_direccion?: boolean
    prop_observaciones?: boolean
    empresa_id?: boolean
    activo?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PropietarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"prop_id" | "prop_identificacion" | "prop_nombre" | "prop_apellido" | "prop_email" | "prop_celular" | "prop_direccion" | "prop_observaciones" | "empresa_id" | "activo" | "createdBy" | "updatedBy" | "created_at" | "updated_at", ExtArgs["result"]["propietario"]>

  export type $PropietarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Propietario"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      prop_id: number
      prop_identificacion: string
      prop_nombre: string
      prop_apellido: string
      prop_email: string
      prop_celular: string
      prop_direccion: string
      prop_observaciones: string
      empresa_id: number
      activo: boolean
      createdBy: number | null
      updatedBy: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["propietario"]>
    composites: {}
  }

  type PropietarioGetPayload<S extends boolean | null | undefined | PropietarioDefaultArgs> = $Result.GetResult<Prisma.$PropietarioPayload, S>

  type PropietarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropietarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropietarioCountAggregateInputType | true
    }

  export interface PropietarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Propietario'], meta: { name: 'Propietario' } }
    /**
     * Find zero or one Propietario that matches the filter.
     * @param {PropietarioFindUniqueArgs} args - Arguments to find a Propietario
     * @example
     * // Get one Propietario
     * const propietario = await prisma.propietario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropietarioFindUniqueArgs>(args: SelectSubset<T, PropietarioFindUniqueArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Propietario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropietarioFindUniqueOrThrowArgs} args - Arguments to find a Propietario
     * @example
     * // Get one Propietario
     * const propietario = await prisma.propietario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropietarioFindUniqueOrThrowArgs>(args: SelectSubset<T, PropietarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Propietario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropietarioFindFirstArgs} args - Arguments to find a Propietario
     * @example
     * // Get one Propietario
     * const propietario = await prisma.propietario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropietarioFindFirstArgs>(args?: SelectSubset<T, PropietarioFindFirstArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Propietario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropietarioFindFirstOrThrowArgs} args - Arguments to find a Propietario
     * @example
     * // Get one Propietario
     * const propietario = await prisma.propietario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropietarioFindFirstOrThrowArgs>(args?: SelectSubset<T, PropietarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Propietarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropietarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Propietarios
     * const propietarios = await prisma.propietario.findMany()
     * 
     * // Get first 10 Propietarios
     * const propietarios = await prisma.propietario.findMany({ take: 10 })
     * 
     * // Only select the `prop_id`
     * const propietarioWithProp_idOnly = await prisma.propietario.findMany({ select: { prop_id: true } })
     * 
     */
    findMany<T extends PropietarioFindManyArgs>(args?: SelectSubset<T, PropietarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Propietario.
     * @param {PropietarioCreateArgs} args - Arguments to create a Propietario.
     * @example
     * // Create one Propietario
     * const Propietario = await prisma.propietario.create({
     *   data: {
     *     // ... data to create a Propietario
     *   }
     * })
     * 
     */
    create<T extends PropietarioCreateArgs>(args: SelectSubset<T, PropietarioCreateArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Propietarios.
     * @param {PropietarioCreateManyArgs} args - Arguments to create many Propietarios.
     * @example
     * // Create many Propietarios
     * const propietario = await prisma.propietario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropietarioCreateManyArgs>(args?: SelectSubset<T, PropietarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Propietarios and returns the data saved in the database.
     * @param {PropietarioCreateManyAndReturnArgs} args - Arguments to create many Propietarios.
     * @example
     * // Create many Propietarios
     * const propietario = await prisma.propietario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Propietarios and only return the `prop_id`
     * const propietarioWithProp_idOnly = await prisma.propietario.createManyAndReturn({
     *   select: { prop_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropietarioCreateManyAndReturnArgs>(args?: SelectSubset<T, PropietarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Propietario.
     * @param {PropietarioDeleteArgs} args - Arguments to delete one Propietario.
     * @example
     * // Delete one Propietario
     * const Propietario = await prisma.propietario.delete({
     *   where: {
     *     // ... filter to delete one Propietario
     *   }
     * })
     * 
     */
    delete<T extends PropietarioDeleteArgs>(args: SelectSubset<T, PropietarioDeleteArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Propietario.
     * @param {PropietarioUpdateArgs} args - Arguments to update one Propietario.
     * @example
     * // Update one Propietario
     * const propietario = await prisma.propietario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropietarioUpdateArgs>(args: SelectSubset<T, PropietarioUpdateArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Propietarios.
     * @param {PropietarioDeleteManyArgs} args - Arguments to filter Propietarios to delete.
     * @example
     * // Delete a few Propietarios
     * const { count } = await prisma.propietario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropietarioDeleteManyArgs>(args?: SelectSubset<T, PropietarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propietarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropietarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Propietarios
     * const propietario = await prisma.propietario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropietarioUpdateManyArgs>(args: SelectSubset<T, PropietarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propietarios and returns the data updated in the database.
     * @param {PropietarioUpdateManyAndReturnArgs} args - Arguments to update many Propietarios.
     * @example
     * // Update many Propietarios
     * const propietario = await prisma.propietario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Propietarios and only return the `prop_id`
     * const propietarioWithProp_idOnly = await prisma.propietario.updateManyAndReturn({
     *   select: { prop_id: true },
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
    updateManyAndReturn<T extends PropietarioUpdateManyAndReturnArgs>(args: SelectSubset<T, PropietarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Propietario.
     * @param {PropietarioUpsertArgs} args - Arguments to update or create a Propietario.
     * @example
     * // Update or create a Propietario
     * const propietario = await prisma.propietario.upsert({
     *   create: {
     *     // ... data to create a Propietario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Propietario we want to update
     *   }
     * })
     */
    upsert<T extends PropietarioUpsertArgs>(args: SelectSubset<T, PropietarioUpsertArgs<ExtArgs>>): Prisma__PropietarioClient<$Result.GetResult<Prisma.$PropietarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Propietarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropietarioCountArgs} args - Arguments to filter Propietarios to count.
     * @example
     * // Count the number of Propietarios
     * const count = await prisma.propietario.count({
     *   where: {
     *     // ... the filter for the Propietarios we want to count
     *   }
     * })
    **/
    count<T extends PropietarioCountArgs>(
      args?: Subset<T, PropietarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropietarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Propietario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropietarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropietarioAggregateArgs>(args: Subset<T, PropietarioAggregateArgs>): Prisma.PrismaPromise<GetPropietarioAggregateType<T>>

    /**
     * Group by Propietario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropietarioGroupByArgs} args - Group by arguments.
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
      T extends PropietarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropietarioGroupByArgs['orderBy'] }
        : { orderBy?: PropietarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropietarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropietarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Propietario model
   */
  readonly fields: PropietarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Propietario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropietarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Propietario model
   */
  interface PropietarioFieldRefs {
    readonly prop_id: FieldRef<"Propietario", 'Int'>
    readonly prop_identificacion: FieldRef<"Propietario", 'String'>
    readonly prop_nombre: FieldRef<"Propietario", 'String'>
    readonly prop_apellido: FieldRef<"Propietario", 'String'>
    readonly prop_email: FieldRef<"Propietario", 'String'>
    readonly prop_celular: FieldRef<"Propietario", 'String'>
    readonly prop_direccion: FieldRef<"Propietario", 'String'>
    readonly prop_observaciones: FieldRef<"Propietario", 'String'>
    readonly empresa_id: FieldRef<"Propietario", 'Int'>
    readonly activo: FieldRef<"Propietario", 'Boolean'>
    readonly createdBy: FieldRef<"Propietario", 'Int'>
    readonly updatedBy: FieldRef<"Propietario", 'Int'>
    readonly created_at: FieldRef<"Propietario", 'DateTime'>
    readonly updated_at: FieldRef<"Propietario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Propietario findUnique
   */
  export type PropietarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * Filter, which Propietario to fetch.
     */
    where: PropietarioWhereUniqueInput
  }

  /**
   * Propietario findUniqueOrThrow
   */
  export type PropietarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * Filter, which Propietario to fetch.
     */
    where: PropietarioWhereUniqueInput
  }

  /**
   * Propietario findFirst
   */
  export type PropietarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * Filter, which Propietario to fetch.
     */
    where?: PropietarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propietarios to fetch.
     */
    orderBy?: PropietarioOrderByWithRelationInput | PropietarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Propietarios.
     */
    cursor?: PropietarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propietarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propietarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Propietarios.
     */
    distinct?: PropietarioScalarFieldEnum | PropietarioScalarFieldEnum[]
  }

  /**
   * Propietario findFirstOrThrow
   */
  export type PropietarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * Filter, which Propietario to fetch.
     */
    where?: PropietarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propietarios to fetch.
     */
    orderBy?: PropietarioOrderByWithRelationInput | PropietarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Propietarios.
     */
    cursor?: PropietarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propietarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propietarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Propietarios.
     */
    distinct?: PropietarioScalarFieldEnum | PropietarioScalarFieldEnum[]
  }

  /**
   * Propietario findMany
   */
  export type PropietarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * Filter, which Propietarios to fetch.
     */
    where?: PropietarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Propietarios to fetch.
     */
    orderBy?: PropietarioOrderByWithRelationInput | PropietarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Propietarios.
     */
    cursor?: PropietarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Propietarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Propietarios.
     */
    skip?: number
    distinct?: PropietarioScalarFieldEnum | PropietarioScalarFieldEnum[]
  }

  /**
   * Propietario create
   */
  export type PropietarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * The data needed to create a Propietario.
     */
    data: XOR<PropietarioCreateInput, PropietarioUncheckedCreateInput>
  }

  /**
   * Propietario createMany
   */
  export type PropietarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Propietarios.
     */
    data: PropietarioCreateManyInput | PropietarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Propietario createManyAndReturn
   */
  export type PropietarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * The data used to create many Propietarios.
     */
    data: PropietarioCreateManyInput | PropietarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Propietario update
   */
  export type PropietarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * The data needed to update a Propietario.
     */
    data: XOR<PropietarioUpdateInput, PropietarioUncheckedUpdateInput>
    /**
     * Choose, which Propietario to update.
     */
    where: PropietarioWhereUniqueInput
  }

  /**
   * Propietario updateMany
   */
  export type PropietarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Propietarios.
     */
    data: XOR<PropietarioUpdateManyMutationInput, PropietarioUncheckedUpdateManyInput>
    /**
     * Filter which Propietarios to update
     */
    where?: PropietarioWhereInput
    /**
     * Limit how many Propietarios to update.
     */
    limit?: number
  }

  /**
   * Propietario updateManyAndReturn
   */
  export type PropietarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * The data used to update Propietarios.
     */
    data: XOR<PropietarioUpdateManyMutationInput, PropietarioUncheckedUpdateManyInput>
    /**
     * Filter which Propietarios to update
     */
    where?: PropietarioWhereInput
    /**
     * Limit how many Propietarios to update.
     */
    limit?: number
  }

  /**
   * Propietario upsert
   */
  export type PropietarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * The filter to search for the Propietario to update in case it exists.
     */
    where: PropietarioWhereUniqueInput
    /**
     * In case the Propietario found by the `where` argument doesn't exist, create a new Propietario with this data.
     */
    create: XOR<PropietarioCreateInput, PropietarioUncheckedCreateInput>
    /**
     * In case the Propietario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropietarioUpdateInput, PropietarioUncheckedUpdateInput>
  }

  /**
   * Propietario delete
   */
  export type PropietarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
    /**
     * Filter which Propietario to delete.
     */
    where: PropietarioWhereUniqueInput
  }

  /**
   * Propietario deleteMany
   */
  export type PropietarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Propietarios to delete
     */
    where?: PropietarioWhereInput
    /**
     * Limit how many Propietarios to delete.
     */
    limit?: number
  }

  /**
   * Propietario without action
   */
  export type PropietarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Propietario
     */
    select?: PropietarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Propietario
     */
    omit?: PropietarioOmit<ExtArgs> | null
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


  export const PropietarioScalarFieldEnum: {
    prop_id: 'prop_id',
    prop_identificacion: 'prop_identificacion',
    prop_nombre: 'prop_nombre',
    prop_apellido: 'prop_apellido',
    prop_email: 'prop_email',
    prop_celular: 'prop_celular',
    prop_direccion: 'prop_direccion',
    prop_observaciones: 'prop_observaciones',
    empresa_id: 'empresa_id',
    activo: 'activo',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PropietarioScalarFieldEnum = (typeof PropietarioScalarFieldEnum)[keyof typeof PropietarioScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PropietarioWhereInput = {
    AND?: PropietarioWhereInput | PropietarioWhereInput[]
    OR?: PropietarioWhereInput[]
    NOT?: PropietarioWhereInput | PropietarioWhereInput[]
    prop_id?: IntFilter<"Propietario"> | number
    prop_identificacion?: StringFilter<"Propietario"> | string
    prop_nombre?: StringFilter<"Propietario"> | string
    prop_apellido?: StringFilter<"Propietario"> | string
    prop_email?: StringFilter<"Propietario"> | string
    prop_celular?: StringFilter<"Propietario"> | string
    prop_direccion?: StringFilter<"Propietario"> | string
    prop_observaciones?: StringFilter<"Propietario"> | string
    empresa_id?: IntFilter<"Propietario"> | number
    activo?: BoolFilter<"Propietario"> | boolean
    createdBy?: IntNullableFilter<"Propietario"> | number | null
    updatedBy?: IntNullableFilter<"Propietario"> | number | null
    created_at?: DateTimeFilter<"Propietario"> | Date | string
    updated_at?: DateTimeFilter<"Propietario"> | Date | string
  }

  export type PropietarioOrderByWithRelationInput = {
    prop_id?: SortOrder
    prop_identificacion?: SortOrder
    prop_nombre?: SortOrder
    prop_apellido?: SortOrder
    prop_email?: SortOrder
    prop_celular?: SortOrder
    prop_direccion?: SortOrder
    prop_observaciones?: SortOrder
    empresa_id?: SortOrder
    activo?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PropietarioWhereUniqueInput = Prisma.AtLeast<{
    prop_id?: number
    prop_identificacion?: string
    prop_email?: string
    AND?: PropietarioWhereInput | PropietarioWhereInput[]
    OR?: PropietarioWhereInput[]
    NOT?: PropietarioWhereInput | PropietarioWhereInput[]
    prop_nombre?: StringFilter<"Propietario"> | string
    prop_apellido?: StringFilter<"Propietario"> | string
    prop_celular?: StringFilter<"Propietario"> | string
    prop_direccion?: StringFilter<"Propietario"> | string
    prop_observaciones?: StringFilter<"Propietario"> | string
    empresa_id?: IntFilter<"Propietario"> | number
    activo?: BoolFilter<"Propietario"> | boolean
    createdBy?: IntNullableFilter<"Propietario"> | number | null
    updatedBy?: IntNullableFilter<"Propietario"> | number | null
    created_at?: DateTimeFilter<"Propietario"> | Date | string
    updated_at?: DateTimeFilter<"Propietario"> | Date | string
  }, "prop_id" | "prop_identificacion" | "prop_email">

  export type PropietarioOrderByWithAggregationInput = {
    prop_id?: SortOrder
    prop_identificacion?: SortOrder
    prop_nombre?: SortOrder
    prop_apellido?: SortOrder
    prop_email?: SortOrder
    prop_celular?: SortOrder
    prop_direccion?: SortOrder
    prop_observaciones?: SortOrder
    empresa_id?: SortOrder
    activo?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PropietarioCountOrderByAggregateInput
    _avg?: PropietarioAvgOrderByAggregateInput
    _max?: PropietarioMaxOrderByAggregateInput
    _min?: PropietarioMinOrderByAggregateInput
    _sum?: PropietarioSumOrderByAggregateInput
  }

  export type PropietarioScalarWhereWithAggregatesInput = {
    AND?: PropietarioScalarWhereWithAggregatesInput | PropietarioScalarWhereWithAggregatesInput[]
    OR?: PropietarioScalarWhereWithAggregatesInput[]
    NOT?: PropietarioScalarWhereWithAggregatesInput | PropietarioScalarWhereWithAggregatesInput[]
    prop_id?: IntWithAggregatesFilter<"Propietario"> | number
    prop_identificacion?: StringWithAggregatesFilter<"Propietario"> | string
    prop_nombre?: StringWithAggregatesFilter<"Propietario"> | string
    prop_apellido?: StringWithAggregatesFilter<"Propietario"> | string
    prop_email?: StringWithAggregatesFilter<"Propietario"> | string
    prop_celular?: StringWithAggregatesFilter<"Propietario"> | string
    prop_direccion?: StringWithAggregatesFilter<"Propietario"> | string
    prop_observaciones?: StringWithAggregatesFilter<"Propietario"> | string
    empresa_id?: IntWithAggregatesFilter<"Propietario"> | number
    activo?: BoolWithAggregatesFilter<"Propietario"> | boolean
    createdBy?: IntNullableWithAggregatesFilter<"Propietario"> | number | null
    updatedBy?: IntNullableWithAggregatesFilter<"Propietario"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Propietario"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Propietario"> | Date | string
  }

  export type PropietarioCreateInput = {
    prop_identificacion: string
    prop_nombre: string
    prop_apellido: string
    prop_email: string
    prop_celular: string
    prop_direccion: string
    prop_observaciones: string
    empresa_id: number
    activo?: boolean
    createdBy?: number | null
    updatedBy?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PropietarioUncheckedCreateInput = {
    prop_id?: number
    prop_identificacion: string
    prop_nombre: string
    prop_apellido: string
    prop_email: string
    prop_celular: string
    prop_direccion: string
    prop_observaciones: string
    empresa_id: number
    activo?: boolean
    createdBy?: number | null
    updatedBy?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PropietarioUpdateInput = {
    prop_identificacion?: StringFieldUpdateOperationsInput | string
    prop_nombre?: StringFieldUpdateOperationsInput | string
    prop_apellido?: StringFieldUpdateOperationsInput | string
    prop_email?: StringFieldUpdateOperationsInput | string
    prop_celular?: StringFieldUpdateOperationsInput | string
    prop_direccion?: StringFieldUpdateOperationsInput | string
    prop_observaciones?: StringFieldUpdateOperationsInput | string
    empresa_id?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropietarioUncheckedUpdateInput = {
    prop_id?: IntFieldUpdateOperationsInput | number
    prop_identificacion?: StringFieldUpdateOperationsInput | string
    prop_nombre?: StringFieldUpdateOperationsInput | string
    prop_apellido?: StringFieldUpdateOperationsInput | string
    prop_email?: StringFieldUpdateOperationsInput | string
    prop_celular?: StringFieldUpdateOperationsInput | string
    prop_direccion?: StringFieldUpdateOperationsInput | string
    prop_observaciones?: StringFieldUpdateOperationsInput | string
    empresa_id?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropietarioCreateManyInput = {
    prop_id?: number
    prop_identificacion: string
    prop_nombre: string
    prop_apellido: string
    prop_email: string
    prop_celular: string
    prop_direccion: string
    prop_observaciones: string
    empresa_id: number
    activo?: boolean
    createdBy?: number | null
    updatedBy?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PropietarioUpdateManyMutationInput = {
    prop_identificacion?: StringFieldUpdateOperationsInput | string
    prop_nombre?: StringFieldUpdateOperationsInput | string
    prop_apellido?: StringFieldUpdateOperationsInput | string
    prop_email?: StringFieldUpdateOperationsInput | string
    prop_celular?: StringFieldUpdateOperationsInput | string
    prop_direccion?: StringFieldUpdateOperationsInput | string
    prop_observaciones?: StringFieldUpdateOperationsInput | string
    empresa_id?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropietarioUncheckedUpdateManyInput = {
    prop_id?: IntFieldUpdateOperationsInput | number
    prop_identificacion?: StringFieldUpdateOperationsInput | string
    prop_nombre?: StringFieldUpdateOperationsInput | string
    prop_apellido?: StringFieldUpdateOperationsInput | string
    prop_email?: StringFieldUpdateOperationsInput | string
    prop_celular?: StringFieldUpdateOperationsInput | string
    prop_direccion?: StringFieldUpdateOperationsInput | string
    prop_observaciones?: StringFieldUpdateOperationsInput | string
    empresa_id?: IntFieldUpdateOperationsInput | number
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    updatedBy?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PropietarioCountOrderByAggregateInput = {
    prop_id?: SortOrder
    prop_identificacion?: SortOrder
    prop_nombre?: SortOrder
    prop_apellido?: SortOrder
    prop_email?: SortOrder
    prop_celular?: SortOrder
    prop_direccion?: SortOrder
    prop_observaciones?: SortOrder
    empresa_id?: SortOrder
    activo?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PropietarioAvgOrderByAggregateInput = {
    prop_id?: SortOrder
    empresa_id?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type PropietarioMaxOrderByAggregateInput = {
    prop_id?: SortOrder
    prop_identificacion?: SortOrder
    prop_nombre?: SortOrder
    prop_apellido?: SortOrder
    prop_email?: SortOrder
    prop_celular?: SortOrder
    prop_direccion?: SortOrder
    prop_observaciones?: SortOrder
    empresa_id?: SortOrder
    activo?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PropietarioMinOrderByAggregateInput = {
    prop_id?: SortOrder
    prop_identificacion?: SortOrder
    prop_nombre?: SortOrder
    prop_apellido?: SortOrder
    prop_email?: SortOrder
    prop_celular?: SortOrder
    prop_direccion?: SortOrder
    prop_observaciones?: SortOrder
    empresa_id?: SortOrder
    activo?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PropietarioSumOrderByAggregateInput = {
    prop_id?: SortOrder
    empresa_id?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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
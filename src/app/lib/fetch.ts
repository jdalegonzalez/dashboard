import { Agent, Confidence, CrawlError, CrawlHash, Prisma, PrismaClient, ScanError, ScanResult, Severity, Status } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { getAgentDetails } from '@prisma/client/sql';
import { NextRequest } from 'next/server';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  if (!res.ok) {
    // TODO: Need to manage error handling
  }
  return res.json()
}

export async function updater<T = any>(url: RequestInfo, data:Partial<T>): Promise<JSON> {
  // TODO: There will need to be CORS and credentials added here.
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(data)
  }
  console.log(options);
  return fetcher(url, options)
}

const isNumeric = (str:string) => Number.isFinite(+str);

export interface PagedAPIResults<T> {
  pages: number;
  rowsPerPage: number;
  totalRows: number
  results: T[];
}

export const booleanParam = (req: NextRequest, paramName: string) => {
  const params = req.nextUrl.searchParams;
  const stringValue = (params.get(paramName) ?? "").trim().toLowerCase();    
  return stringValue && (stringValue === 'true' || stringValue === '1'); 
}

export const enumParam = (req: NextRequest, paramName: string, vals: object) => {
  const params = req.nextUrl.searchParams;
  const paramArray = (params.get(paramName)??"").split(',');
  const values = Object.values(vals);
  const valid = paramArray.filter((p) => values.includes(p));
  return valid.length > 0 ? valid : undefined;
}

export const enumWhere = (field: string, vals: string[] | undefined, defaultWhere: object) => {
  if (!vals) return defaultWhere;
  return {[field]: { in: vals }};
}

export const idParam = (req: NextRequest, paramName: string) => {
  const params = req.nextUrl.searchParams;
  const val = params.get(paramName);
  return val ? val.replace(/[^0-9a-zA-Z]/g,'') : val;    
}
export const stringParam = (req: NextRequest, paramName: string) => {
  const params = req.nextUrl.searchParams;
  const val = params.get(paramName);
  return val ? val.trim() : val;    
}

export const pagingParams = (req: NextRequest, defaultRows: number) => {
  const params = req.nextUrl.searchParams;
  const rowsParam = params.get('rows') ?? "";
  const startParam = params.get('page') ?? "";
  const rowsPerPage = rowsParam && isNumeric(rowsParam) ? Number(rowsParam) : defaultRows;
  const start = isNumeric(startParam) ? Number(startParam) : startParam;
  const skip = (start && typeof start == "number" && start > 0) ? start * rowsPerPage : 0;
  return ({
    skip,
    rowsPerPage
  })  
}

export const DEFAULT_ROWS = 25

export const metaToUrl = (meta:string) => meta.replace(/^.*\/api\//, '/api/').replace(/\/route.ts$/,'');

export const argsUrl = (meta:string, args?:Record<string, any>, rows?:number, page?:number, defaultRows = DEFAULT_ROWS) => {
  const extraArgs = (args === undefined) ? {} : args;
  if (page === undefined && rows !== undefined) page = 0;
  if (rows === undefined && page !== undefined) rows = defaultRows;

  const allParams:Record<string, any> = {...extraArgs, ...{page, rows}};
  // Remove any undefined values
  Object.keys(allParams).forEach(key => allParams[key] === undefined ? delete allParams[key] : {});

  const queryString = new URLSearchParams(allParams).toString();
  const q = queryString ? "?" + queryString : ""
  const base = metaToUrl(meta);
  return `${base}${q}`
}

export const unpagedUrl = (urlbase: string, args?:Record<string,any>) => {
  return argsUrl(urlbase, args)
}

export const pagedUrl = (urlbase: string, rows: number, page: number, extraArgs?:Record<string, any>) => {
  return argsUrl(urlbase, extraArgs, rows=rows, page=page)
}

export const defaultRows = 25;

export const crawlResultsPath = (rows: number = defaultRows, page: number = 1, extraArgs?:Record<string, any>) => {
  return pagedUrl('/api/agent/crawls/results', rows, page, extraArgs);
}
export type CrawlAPIResults = PagedAPIResults<CrawlHash>;

export const crawlErrorsPath = (rows: number = defaultRows, page: number = 1, extraArgs?:Record<string, any>) => {
  return pagedUrl('/api/agent/crawls/errors', rows, page, extraArgs);
}
export type CrawlErrorAPIResults = PagedAPIResults<CrawlError>;

export const findingsPath = (rows: number = defaultRows, page: number = 1, extraArgs?:object) => {
    return pagedUrl('/api/agent/findings', rows, page, extraArgs);
}
export type FindingsAPIResults = PagedAPIResults<ScanResult>;


export const scanErrorsPath = (rows: number = defaultRows, page: number = 1, extraArgs?:Record<string, any>) => {
    return pagedUrl('/api/agent/scans/errors', rows, page, extraArgs);
}
export type ScanErrorAPIResults = PagedAPIResults<ScanError>;

export interface IAgentResult extends Agent {
    crawls: {id: string}[],
    scans: {id: string}[]
}

export interface ScanSummaryAPIResults {
  series: {name: string, data: number[]}[];
  paths: string [];
  agents: string [];
  durations: number[];
  gigs_per_second: number[];
}

export interface AgentAPIResults {
    agentCount: number;
    warningCount: number;
    errorCount: number;
    unsupportedFilesCount: number;
    totalFilesCount: number;
    dedupedFilesCount: number;
}

export type AgentAPIDetailResults = getAgentDetails.Result[];
export const fetchPath = (details:boolean = false) => {
    return unpagedUrl('/api/agent', details ? {details} : undefined)
}



// TODO: It would be great to find a way to make crawlIdFilter and scanIdFilter
// a single function since they're almost identical but TypeScript is making that
// exceedingly challenging.  Rather than give up on type safety or wrestle with
// union types or something, I've centralized what I could and left the rest

const def1Query = ((field: string, id: string) => ({[field]: id}))
const defInQuery = ((field: string, ids: string[]) => ({[field]: { in: ids }}));
const manyQuery = (dates: Date[]) => ({
    select: {id: true},
    where: {end_time: {in: dates}}
})
const datesQuery = {
    by:['agentId' as const],
    _max: {
        end_time: true as const
    }
}

export const crawlIdFilter = async (prisma: PrismaClient, id: string | null) => {
    if (id) return def1Query('crawlId', id)
    const gb = prisma.crawl.groupBy
    const fm = prisma.crawl.findMany

    const newestDates = (await gb(datesQuery)).map(obj => obj._max.end_time) as Date[];
    const ids = (await fm(manyQuery(newestDates))).map(obj => obj.id)
    return defInQuery('crawlId', ids)
}

export const scanIdFilter = async (prisma: PrismaClient, id: string | null) => {
    if (id) return def1Query('scanId', id)
    const gb = prisma.scan.groupBy
    const fm = prisma.scan.findMany

    const newestDates = (await gb(datesQuery)).map(obj => obj._max.end_time) as Date[];
    const ids = (await fm(manyQuery(newestDates))).map(obj => obj.id)
    return defInQuery('scanId', ids)
}


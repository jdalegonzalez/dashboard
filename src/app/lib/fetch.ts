import { NextRequest } from 'next/server';

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
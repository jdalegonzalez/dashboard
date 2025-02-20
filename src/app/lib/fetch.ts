import { NextRequest } from 'next/server';

export default async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
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

export const pagedUrl = (urlbase: string, rows: number, page: number) => {
  const base = urlbase.replace(/^.*\/api\//, '/api/').replace(/\/route.ts$/,'');
  return `${base}?rows=${rows}&page=${page}`;
}
'use client';

import {useRef} from 'react';

import useSWR from 'swr';
import fetch from '@/app/lib/fetch';

type urlFunction = (pageSize: number, pageIndex:number) => string
interface Pageable {
    totalRows: number
}
interface PageInfo {
    pageSize: number,
    pageIndex: number
}
export default function usePagedResponse<T extends Pageable>(
    pathFunction: urlFunction, 
    pagination: PageInfo,
    blank: T) {
    
    const totalRowsRef = useRef(0);
    const apiPath = pathFunction(pagination.pageSize, pagination.pageIndex);
    const { data: swrResponse } = useSWR<T>(apiPath, fetch)
    if (swrResponse) totalRowsRef.current = swrResponse.totalRows;
    blank.totalRows = totalRowsRef.current;
    
    return swrResponse ?? blank

}
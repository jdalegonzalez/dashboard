'use client';

import React, { useState } from 'react';

import useElementSize from '@/hooks/useElementSize';
import usePagedResponse from '@/hooks/usePagedResponse';
import { type CrawlHash } from '@/prisma-client';
import { CrawlAPIResults, crawlResultsPath as fetchPath } from '@/app/lib/fetch';
import path from 'path';

import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

import { shorten, formatDate, bytesToHuman } from '@/utils/dataDisplay.util';

import Skeleton from '@/components/utils/ThemedSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import Tooltip from '@/components/ui/Tooltip';

import TableTemplate, { TableCardFooterTemplate } from '@/templates/common/TableParts.template';

interface ColumnInfo extends CrawlHash {
	matches?: number;
}
const columnHelper = createColumnHelper<ColumnInfo>();
const fileColumnSize = 60;
const fileColumnPercent = .57; // Close to 50% with a little fudge.
const sizerId = `${path.basename(import.meta.url)}-sizer`;

const skelClass = 'bg-opacity-5'
const columns = [
	columnHelper.accessor('updated_at', {
		cell: (info) => {
			return info.row.original.hash == 'loading' 
			? <Skeleton count={2} width='100%' className={`px-2 text-xl ${skelClass}`} /> 
			: formatDate(info.getValue())
		},
		size: 12,
		minSize: 12,
		maxSize: 12,
		header: 'Crawled',
		footer: 'Crawled'
	}),
	columnHelper.accessor('hash', {
		cell: (info) => (
			info.row.original.hash == 'loading'
			? <Skeleton 
				width='100%' 
				className={`text-sm rtl:mr-0 overflow-clip ${skelClass}`}
			/>			
			: 
			<Tooltip text={info.row.original.hash}>
				<div className='overflow-hidden text-nowrap text-ellipsis'>{info.getValue()}</div>
			</Tooltip>
		),
		size: fileColumnSize,
		maxSize: fileColumnSize,
		minSize: fileColumnSize,
		header: 'Hash',
		footer: 'Hash',
	}),
	columnHelper.accessor('bsize', {
		cell: (info) => (
			info.row.original.hash == 'loading'
			? <Skeleton 
				width='100%' 
				className={`text-sm rtl:mr-0 overflow-clip ${skelClass}`}
			/>			
			: 
			<div className='text-center'>{bytesToHuman(info.getValue())}</div>
		),
		size: 10,
		maxSize: 10,
		minSize: 10,
		header: () => <div className='w-full text-center'>Bytes</div>,
		footer: 'Bytes',
	}),
	columnHelper.accessor('file_paths', {
		cell: (info) => (
			info.row.original.hash == 'loading'
			? 
			<Skeleton 
				width='100%' 
				className={`text-sm rtl overflow-clip ${skelClass}`}
			/>
			: 
			<Tooltip text={(info.getValue()??[''])[0]}>
				<div className='text-sm rtl overflow-clip'>{shorten(sizerId, (info.getValue()??[''])[0], 80)}</div>
			</Tooltip>
		),
		size: fileColumnSize,
		header: 'Example File',
		footer: 'Example File',
	}),
	columnHelper.accessor('matches', {
		cell: (info) => (
			info.row.original.hash == 'loading'
			? 
			<Skeleton 
				width='100%' 
				className={`text-sm rtl overflow-clip ${skelClass}`}
			/>
			: 
			<div className='text-sm text-center'>{(info.row.original.file_paths??[]).length}</div>
		),
		size: 10,
		header: () => <div className='text-center w-full'>Matches</div>,
		footer: 'Matches',
	}),
];

const pageSize: number = 5;
const emptyDate = new Date(0)
const blankResult:CrawlHash = {
	hash: 'loading',
	created_at: emptyDate,
	updated_at: emptyDate,
	file_paths: [],
	bsize: 0,
	format: '',
	crawlId: '',
}
const blankResponse: CrawlAPIResults = {
	pages: 0,
	totalRows: 0,
	rowsPerPage: pageSize,
	results: Array.from({length: pageSize}, (v, i) => blankResult)
}

export interface IErrorListProps {
	crawlId?: string,
	title?: string,
	showTitle?: boolean
}

const defProps:Partial<IErrorListProps> = {
	title: 'Crawl Errors',
	showTitle: true
}

const CrawlResultsPartial = (props:IErrorListProps) => {
	const {crawlId, title, showTitle } = {...defProps, ...props} 

	const [pagination, setPagination] = useState({pageIndex: 0, pageSize});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

	const extraArgs = { crawlId };
	console.log(extraArgs)
	const response = usePagedResponse<CrawlAPIResults>(fetchPath, pagination, blankResponse, extraArgs);
	
	const table = useReactTable({
		data: response.results,
		columns,
		state: {
			sorting,
			globalFilter,
			pagination
		},
		onSortingChange: setSorting,
		enableGlobalFilter: true,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		//getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		rowCount: response.totalRows,
		// debugTable: true,
	});

	const [setEleRef, size] = useElementSize();

	return (
		<Card className='h-full'>
			<div style={{color:'rgba(0,0,0,0)', width: Math.floor(size.width * fileColumnPercent), left: -99999, top: -99999 }} id={sizerId} className='fixed -z-10 select-none text-sm h-0 pt-0 pb-0 text-opacity-0 bg-opacity-0'></div>
			{showTitle && (
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>{title}</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			)}
			<CardBody className='overflow-auto'>
				<TableTemplate
					ref={setEleRef}
					className='table-fixed max-md:min-w-[70rem]'
					table={table}
					hasFooter={false}
				/>
			</CardBody>
			<TableCardFooterTemplate table={table} />
		</Card>
	);
};

export default CrawlResultsPartial;

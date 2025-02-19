'use client';

import React, { useState } from 'react';

import useElementSize from '@/hooks/useElementSize';
import usePagedResponse from '@/hooks/usePagedResponse';
import { type ScanError, Severity } from '@prisma/client';
import { ErrorAPIResults, fetchPath } from '@/app/api/agent/errors/route';
import path from 'path';

import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import Skeleton from '@/components/utils/ThemedSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { shorten } from '@/app/lib/utils';

import Badge from '@/components/ui/Badge';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import Tooltip from '@/components/ui/Tooltip';

import TableTemplate, { TableCardFooterTemplate } from '@/templates/common/TableParts.template';

const columnHelper = createColumnHelper<ScanError>();
const fileColumnSize = 60;
const fileColumnPercent = .57; // Close to 50% with a little fudge.
const sizerId = `${path.basename(import.meta.url)}-sizer`;

const textToColor = (txt:Severity) => {
	switch (txt.trim().toUpperCase()) {
		case "HINT": return { color: "sky" as const, intensity: "600" as const};
		case "WARNING": return { color: "amber" as const, intensity: "600" as const};
		case "ERROR": return { color: "red" as const, intensity: "700" as const};
		case "FATAL": return { color: "violet" as const, intensity: "700" as const};
		default: return { color: "blue" as const, intensity: "600" as const};
	}
}

const cap = (val: string) => val.charAt(0).toUpperCase() + val.slice(1);
const skelClass = 'bg-opacity-5'
const columns = [
	columnHelper.accessor('occurred_at', {
		cell: (info) => {
			return info.row.original.id == 'loading' 
			? <Skeleton count={2} width='100%' className={`px-2 text-xl ${skelClass}`} /> 
			: new Date(info.getValue()).toLocaleString()
		},
		size: 12,
		minSize: 12,
		maxSize: 12,
		header: 'Occurred',
		footer: 'Occurred'
	}),
	columnHelper.accessor('severity', {
		cell: (info) => {
			const val = info.getValue();
			const {color,intensity} = textToColor(val);
			return (
				info.row.original.id == 'loading'
				? <Skeleton	
					width='100%'
					className={`px-2 text-4xl ${skelClass}`}
				/>
				: <Badge variant='outline' borderWidth='border' rounded='rounded' color={color} colorIntensity={intensity}>{val.length > 5 ? val.slice(0,4) : val}</Badge>
			);
		},
		size: 10,
		maxSize: 10,
		minSize: 10,
		header: 'Severity',
		footer: 'Severity',
	}),
	columnHelper.accessor('error_name', {
		cell: (info) => (
			info.row.original.id == 'loading'
			? <Skeleton 
				width='100%' 
				className={`text-sm rtl:mr-0 overflow-clip ${skelClass}`}
			/>			
			: 
			<Tooltip text={cap(info.row.original.error_desc)}>
				<div className='overflow-hidden text-nowrap text-ellipsis'>{info.getValue()}</div>
			</Tooltip>
		),
		size: -1,
		maxSize: -1,
		minSize: -1,
		header: 'Error',
		footer: 'Error',
	}),
	columnHelper.accessor('file', {
		cell: (info) => (
			info.row.original.id == 'loading'
			? 
			<Skeleton 
				width='100%' 
				className={`text-sm rtl overflow-clip ${skelClass}`}
			/>
			: 
			<Tooltip text={info.getValue()}>
				<div className='text-sm rtl overflow-clip'>{shorten(sizerId, info.getValue(), 80)}</div>
			</Tooltip>
		),
		size: fileColumnSize,
		header: 'File Name',
		footer: 'File Name',
	}),
];

const pageSize: number = 5;
const emptyDate = new Date(0)
const blankResult:ScanError = {
	id: 'loading',
	created_at: emptyDate,
	updated_at: emptyDate,
	occurred_at: emptyDate,
	severity: 'HINT',
	file: '',
	error_name: '',
	error_desc: '',
	scanId: '',
}
const blankResponse: ErrorAPIResults = {
	pages: 0,
	totalRows: 0,
	rowsPerPage: pageSize,
	results: Array.from({length: pageSize}, (v, i) => blankResult)
}

const ErrorListPartial = () => {
	const [pagination, setPagination] = useState({pageIndex: 0, pageSize});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

	const response = usePagedResponse<ErrorAPIResults>(fetchPath, pagination, blankResponse);
	
	
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
			<CardHeader>
				<div style={{color:'rgba(0,0,0,0)', width: Math.floor(size.width * fileColumnPercent), left: -99999, top: -99999 }} id={sizerId} className='fixed -z-10 select-none text-sm h-0 pt-0 pb-0 text-opacity-0 bg-opacity-0'></div>
				<CardHeaderChild>
					<CardTitle>Errors</CardTitle>
				</CardHeaderChild>
			</CardHeader>
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

export default ErrorListPartial;

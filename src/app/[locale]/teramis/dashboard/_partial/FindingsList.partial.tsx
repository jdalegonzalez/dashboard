'use client';

import React, { useState } from 'react';
import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import path from 'path';

import colors from '@/tailwindcss/colors.tailwind';
import Skeleton from 'react-loading-skeleton' ;
import 'react-loading-skeleton/dist/skeleton.css';

import useElementSize from '@/hooks/useElementSize';
import usePagedResponse from '@/hooks/usePagedResponse';

import { FindingsAPIResults, fetchPath } from '@/app/api/agent/findings/route';
import { type ScanResult } from '@prisma/client';

import FieldWrap from '@/components/form/FieldWrap';
import Input from '@/components/form/Input';
import Icon from '@/components/icon/Icon';
import MimeIcon from '@/components/icon/MimetypeIcons';
import Badge from '@/components/ui/Badge';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import Tooltip from '@/components/ui/Tooltip';

import TableTemplate, { TableCardFooterTemplate } from '@/templates/common/TableParts.template';

const columnHelper = createColumnHelper<ScanResult>();
const fileColumnSize = 50;
const fileColumnPercent = .48; // Close to 50% with a little fudge.
const sizerId = `${path.basename(import.meta.url)}-sizer`;

const textToColor = (txt:string) => {
	switch (txt.trim().toLowerCase()) {
		case "low": return { color: "sky" as const, intensity: "900" as const};
		case "medium": return { color: "amber" as const, intensity: "800" as const};
		case "high": return { color: "red" as const, intensity: "950" as const};
		default: return { color: "blue" as const, intensity: "600" as const};
	}
}

const shorten = (val:string, len:number = 20) => {
	if (!val) return val;
	const ele = document.getElementById(sizerId);
	if (!ele) return val.length < len ? val : val.slice(-len);
	
	ele.textContent = "..." + val
	if (!ele|| ele.scrollWidth < ele.offsetWidth) return val;
	
	let remainder = val.length;
	let chars = val.length;

	while (remainder > 0) {
		const offset = remainder > 1 ? Math.floor(remainder / 2) : 1;
		remainder -= offset;
		chars += ((ele.scrollWidth > ele.offsetWidth) ? -offset : offset);
		ele.textContent = "..." + val.slice(-chars);
	}

	return "..." + val.slice(-chars);
}

// {info.row.original.id
const skelBaseColor = colors['zinc']['900'];
const skelHighlightColor = colors['zinc']['800'];
const skelClass = 'bg-opacity-5'
const circleStyle = {margin:'auto'};
const circleClass = '!w-20 !h-20 !p-2';
const columns = [
	columnHelper.accessor('mime_type', {
		cell: (info) => (
			info.row.original.id == 'loading'
			? <Skeleton
				circle
				baseColor={skelBaseColor}
				highlightColor={skelHighlightColor}
				className={`${circleClass} ${skelClass}`}
				style={circleStyle}
			/>
			: <MimeIcon
				mimeType={info.getValue()}
				style={circleStyle}
				className={circleClass}
				size='text-6xl'
				rounded='rounded-full'
			/>
			
		),
		size: 10,
		maxSize: 10,
		minSize: 10,
		header: () => <div className='text-center w-full'>Type</div>,
		footer: 'Type',
		enableGlobalFilter: false,
		enableSorting: false,
	}),
	columnHelper.accessor('file_path', {
		cell: (info) => (
			info.row.original.id == 'loading'
			? 
			<Skeleton 
				width='100%' 
				baseColor={skelBaseColor}
				highlightColor={skelHighlightColor}
				className={`text-sm rtl overflow-clip ${skelClass}`}
			/>
			: 
			<Tooltip text={info.getValue()}>
				<div className='text-sm rtl overflow-clip'>{shorten(info.getValue(), 60)}</div>
			</Tooltip>
		),
		size: fileColumnSize,
		header: 'File Name',
		footer: 'File Name',
	}),
	columnHelper.accessor('match', {
		cell: (info) => (
			info.row.original.id == 'loading'
			? <Skeleton 
				width='100%' 
				baseColor={skelBaseColor}
				highlightColor={skelHighlightColor}
				className={`text-sm rtl:mr-0 overflow-clip ${skelClass}`}
			/>			
			: <div className='overflow-hidden text-nowrap text-ellipsis'>{info.getValue()}</div>
		),
		size: -1,
		maxSize: -1,
		minSize: -1,
		header: 'Match',
		footer: 'Match',
	}),
	columnHelper.accessor('confidence', {
		cell: (info) => {
			const val = info.getValue();
			const {color,intensity} = textToColor(val);
			return (
				info.row.original.id == 'loading'
				? <Skeleton 				
					baseColor={skelBaseColor}
					highlightColor={skelHighlightColor}
					width='60%'
					className={`inline-flex items-center justify-center px-2 text-4xl ${skelClass}`}
				/>
				: <Badge variant='solid' color={color} colorIntensity={intensity}>{val}</Badge>
			);
		},
		size: 15,
		maxSize: 15,
		minSize: 15,
		header: 'Confidence',
		footer: 'Confidence',
	}),
];

const pageSize: number = 5;
const emptyDate = new Date(0)
const blankResult:ScanResult = {
	id: 'loading',
	created_at: emptyDate,
	updated_at: emptyDate,
	hash: '',
	file_path: '',
	mime_type: '',
	confidence: 'NONE',
	match: [''],	
	bsize: 0,
	processed: false,
	errored: false,
	scanId: '',
}
const blankResponse: FindingsAPIResults = {
	pages: 0,
	totalRows: 0,
	rowsPerPage: pageSize,
	results: Array.from({length: pageSize}, (v, i) => blankResult)
}

const FindingsListPartial = () => {
	const [pagination, setPagination] = useState({pageIndex: 0, pageSize});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

	const response = usePagedResponse<FindingsAPIResults>(fetchPath, pagination, blankResponse);

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
					<CardTitle>Discovered CUI</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<FieldWrap
						firstSuffix={<Icon className='mx-2' icon='HeroMagnifyingGlass' />}
						lastSuffix={
							globalFilter && (
								<Icon
									icon='HeroXMark'
									color='red'
									className='mx-2 cursor-pointer'
									onClick={() => {
										setGlobalFilter('');
									}}
								/>
							)
						}>
						<Input
							id='cuisearch'
							name='findingsSearch'
							placeholder='Search...'
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
						/>
					</FieldWrap>
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

export default FindingsListPartial;

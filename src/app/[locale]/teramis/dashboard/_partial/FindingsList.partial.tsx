'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	RowData
} from '@tanstack/react-table';
import path from 'path';

import 'react-loading-skeleton/dist/skeleton.css';

import useElementSize from '@/hooks/useElementSize';
import usePagedResponse from '@/hooks/usePagedResponse';
import { FindingsAPIResults, findingsPath as fetchPath } from '@/app/lib/fetch'
import { Confidence, type ScanResult } from '@prisma/client';

// import FieldWrap from '@/components/form/FieldWrap';
// import Input from '@/components/form/Input';
// import Icon from '@/components/icon/Icon';

import MimeIcon from '@/components/icon/MimetypeIcons';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/utils/ThemedSkeleton';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import Tooltip from '@/components/ui/Tooltip';
import { shorten, confidenceToColor } from '@/utils/dataDisplay.util';
import TableTemplate, { TableCardFooterTemplate } from '@/templates/common/TableParts.template';
import Dropdown, { DropdownMenu, DropdownToggle } from '@/components/ui/Dropdown';
import Checkbox from '@/components/form/Checkbox';
import Button from '@/components/ui/Button';
import { filter } from 'lodash';
import { json } from 'd3-fetch';

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
	  addLeftBorder?: boolean,
	  sizeUnits?: string
	}
}

const columnHelper = createColumnHelper<ScanResult>();
const fileColumnSize = 50;
const fileColumnPercent = .47; // Close to 50% with a little fudge.
const sizerId = `${path.basename(import.meta.url)}-sizer`;

const skelClass = 'bg-opacity-5 p-0'
const circleStyle = {margin:'auto'};
const circleClass = '!w-16 !h-18';
const columns = [
	columnHelper.accessor('mime_type', {
		cell: (info) => (
			info.row.original.id == 'loading'
			? <div className={`${circleClass} rounded p-2 pl-4 pr-4`} style={circleStyle}>
				<Skeleton
				 className={`${skelClass} text-4xl`}
				 style={circleStyle}
				/>
			  </div>
			: <MimeIcon
				mimeType={info.getValue()}
				style={circleStyle}
				className={`${circleClass} p-2`}
				size='text-4xl'
			/>			
		),
		meta: {sizeUnits: 'rem'},
		size: 5,
		maxSize: 5,
		minSize: 5,
		header: () => <div className='text-center ml-2'>Type</div>,
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
				className={`text-sm rtl overflow-clip ${skelClass}`}
			/>
			: 
			<Tooltip text={info.getValue()}>
				<div className='text-sm rtl overflow-clip'>{shorten(sizerId, info.getValue(), 60)}</div>
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
				className={`text-sm rtl:mr-0 overflow-clip ${skelClass}`}
			/>			
			: <div className='truncate'>{info.getValue()}</div>
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
			const {color,intensity} = confidenceToColor(val);
			return (
				info.row.original.id == 'loading'
				? <Skeleton
					width='60%'
					className={`inline-flex items-center justify-center px-2 text-4xl ${skelClass}`}
				/>
				: <Badge 
					variant='outline' 
					borderWidth='border' 
					rounded='rounded' 
					color={color} 
					colorIntensity={intensity}>{val}
				</Badge>
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

export interface IFindingsListProps {
	scanId?: string,
	allResults?: boolean,
	title?: string,
	showTitle?: boolean
}

const defProps:Partial<IFindingsListProps> = {
	title: 'Discovered CUI',
	showTitle: true
}

const availableConf = Object.values(Confidence);
const allButNone = availableConf.filter((c) => c !== 'NONE');

const FindingsListPartial = (props:IFindingsListProps) => {
	const {scanId, allResults, title, showTitle } = {...defProps, ...props} 
	const confidences = allResults ? availableConf : allButNone;

	const [pagination, setPagination] = useState({pageIndex: 0, pageSize});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const [filteredConf, setFilteredConf] = useState<string[]>(confidences);
	

	const extraArgs = {
		scanId, 
		allResults, 
		confidence: globalFilter
	};

	const response = usePagedResponse<FindingsAPIResults>(fetchPath, pagination, blankResponse, extraArgs);
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
	const data = response.results;
	const rowCount = response.totalRows;
	const table = useReactTable({
		data,
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
		//getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		//getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		rowCount,
		// debugTable: true,
	});

	const [setEleRef, size] = useElementSize();

	useEffect(() => {
		if (!isFilterOpen) {
			if (filteredConf.length === confidences.length) {
				console.log('Turning off the filter');
				setGlobalFilter('');
			}
			else {
				setGlobalFilter(filteredConf.join(','));
				console.log('Turning on the filter');
			}
		}
	}, [isFilterOpen]);

	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (ref.current) {
			if (confidences.length > filteredConf.length && filteredConf.length > 0) {
				ref.current.checked = false;
				ref.current.indeterminate = true;
			} else {
				ref.current.checked = (confidences.length === filteredConf.length);
				ref.current.indeterminate = false;
			}
		}
	}, [confidences.length, filteredConf.length]);

	const handleSelectAll = () => {
		if (confidences.length > filteredConf.length) {
			setFilteredConf(confidences);
		} else {
			setFilteredConf(allButNone);
		}
	};

	const checkboxes = confidences.map((conf) => (
		<Checkbox
			key={conf}
			className='ms-4'
			dimension='sm'
			id={conf}
			name='projects'
			label={conf}
			onChange={()=>{
				if (filteredConf.includes(conf)) {
					setFilteredConf(filteredConf.filter((c) => c !== conf));
				} else {
					setFilteredConf([...filteredConf,conf]);
				}
			}}
			checked={filteredConf.includes(conf)}
		/>
	));
	return (
		<Card className='h-full'>
			<div style={{color:'rgba(0,0,0,0)', width: Math.floor(size.width * fileColumnPercent), left: -99999, top: -99999 }} id={sizerId} className='fixed -z-10 select-none text-sm h-0 pt-0 pb-0 text-opacity-0 bg-opacity-0'></div>
			<CardHeader>
				<CardHeaderChild>
				{showTitle && (
					<CardTitle>{title}</CardTitle>
				)}
				</CardHeaderChild>
				<CardHeaderChild>
					<Dropdown isOpen={isFilterOpen} setIsOpen={setIsFilterOpen}>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='DuoFilter'
								variant='outline'
								rounded='rounded'
								color='zinc'
								colorIntensity='500'
								>
								Confidence Level
							</Button>
						</DropdownToggle>
						<DropdownMenu className='p-4'>
							<Checkbox
								ref={ref}
								dimension='sm'
								name='selectAll'
								label='Select All'
								onChange={handleSelectAll}
								checked={filteredConf.length === confidences.length}
							/>
							{checkboxes}
						</DropdownMenu>
					</Dropdown>
				</CardHeaderChild>					
				{/* TODO: Bring back when I have time to implement search <CardHeaderChild>
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
				</CardHeaderChild> */}
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

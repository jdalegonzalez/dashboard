'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import { getAgentDetails } from '@/prisma-client/sql';
import useDarkMode from '@/hooks/useDarkMode';

import { formatDate, statusToColor, bytesToHuman, bytesToGigRatio } from '@/utils/dataDisplay.util';
import {
	SortingState,
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	CellContext,
	RowData
} from '@tanstack/react-table';
import { appPages } from '@/config/pages.config';
import Link from 'next/link';
import Container from '@/components/layouts/Container/Container';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import TableTemplate from '@/templates/common/TableParts.template';
import Skeleton from '@/components/utils/ThemedSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { TColorIntensity } from '@/types/colorIntensities.type';
import { useAgentDetails, blankResult } from '@/hooks/useAgent';

const columnHelper = createColumnHelper<getAgentDetails.Result>();

const editLinkPath = `/teramis/agents/`;

const darkIconIntensity = '500';

const lightIconIntensity = '100';

const isLoading = (info:CellContext<getAgentDetails.Result, any>) => info.row.original.agent_id === 'loading';

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
	  addLeftBorder?: boolean,
	  sizeUnits?: string
	}
}

// I don't know which columns are ultimately going to be in the list.
// So, I've got defines for all of them and have commented out the
// ones I'm deprioritizing for now.
const columnBuilder = (iconIntensity:TColorIntensity) => {
	return [
		columnHelper.accessor('agent_id', {
			cell: (info) => {
				const statVal = info.row.original.status;
				const {color,intensity} = statusToColor(statVal);
				return (
				isLoading(info) ?
				<Skeleton />
				: 				
				<Link href={`${editLinkPath}${info.row.original.agent_id}`}>
					<div className='flex items-center pr-4'>
						<div className='flex-shrink-0 w-[80px] mr-2'>
						<Badge 
							variant='outline' 
							borderWidth='border' 
							rounded='rounded' 
							color={color} 
							colorIntensity={intensity}>{statVal}
						</Badge>
						</div>
						<div className='flex-grow truncate'>
							<div className='text-sm text-nowrap'>{info.row.original.name}</div>
							<div className='text-sm truncate text-nowrap text-zinc-500'>{info.row.original.scan_root_path}</div>
						</div>
					</div>
				</Link>
			)},
			size: 280,
			header: 'Agent',
			footer: 'Agent',
			enableGlobalFilter: false,
			enableSorting: false,
		}),
		columnHelper.accessor('scan_start_time', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<span>{formatDate(info.getValue())}</span>
			),
			header: 'Scan Start',
			footer: 'Scan Start',
			meta: {addLeftBorder: true}
		}),
		columnHelper.accessor('scan_end_time', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<span>{formatDate(info.getValue())}</span>
			),
			header: 'Scan End',
			footer: 'Scan End',
		}),
		columnHelper.accessor('crawl_scan_size', {
			size: 90,
			header: () => <div className='flex flex-row w-full items-center justify-center gap-1 text-center'>Size</div>,		
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{bytesToHuman(info.getValue())}</div>
			),
			footer: 'Scan Size',
		}),
		columnHelper.accessor('matches', {
			size: 70,
			header: () => <div className='text-center w-full mr-4'>CUI</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{info.getValue()}</div>
			),
			footer: 'CUI',
		}),
		columnHelper.accessor('scan_errors', {
			size: 90,
			header: () => <div className='text-center w-full'>Errors</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='text-center w-full'>{info.getValue()}</div>
			),
			footer: 'Scan Errors',
		}),
		columnHelper.accessor('timeouts', {
			size: 100,
			header: () => <div className='text-center w-full'>Timeouts</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='text-center w-full'>{info.getValue()}</div>
			),
			footer: 'Timeouts',
		}),
		columnHelper.accessor('gigs_per_second', {
			size: 120,
			header: () => <div className='flex-col w-full align-center justify-center text-center'>Speed</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{bytesToHuman(Number(info.getValue() * bytesToGigRatio),undefined,"ps")}</div>
			),
			footer: 'Speed',
		}),
		columnHelper.accessor('crawl_start_time', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<span>{formatDate(info.getValue())}</span>
			),
			header: 'Crawl Start',
			footer: 'Crawl Start',
			meta: {addLeftBorder: true}
		}),
		columnHelper.accessor('crawl_end_time', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<span>{formatDate(info.getValue())}</span>
			),
			header: 'Crawl End',
			footer: 'Crawl End',
		}),
		// columnHelper.accessor('root_path', {
		// 	cell: (info) => (
		// 		isLoading(info) ?
		// 		<Skeleton />
		// 		:
		// 		info.getValue()
		// 	),
		// 	header: 'Crawl Path',
		// 	footer: 'Crawl Path',
		// }),
		columnHelper.accessor('total_size', {
			size: 90,
			header: () => <div className='flex flex-row w-full items-center justify-center gap-1'><span className='text-center'>Size</span></div>,		
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{bytesToHuman(info.getValue())}</div>
			),
			footer: 'Crawl Size',
		}),
		columnHelper.accessor('dir_count', {
			size: 90,
			header: () => <div className='w-full text-center'>Directories</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{info.getValue()}</div>
			),
			footer: 'Directories',
		}),
		columnHelper.accessor('file_count', {
			size: 90,
			header: () => <div className='w-full text-center'>Files</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{info.getValue()}</div>
			),
			footer: 'Files',
		}),
		columnHelper.accessor('crawl_errors', {
			size: 90,
			header: () => <div className='text-center w-full'>Errors</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='text-center w-full'>{info.getValue()}</div>
			),
			footer: 'Errors',
		}),
		columnHelper.accessor('throughput', {
			size: 120,
			header: () => <div className='flex-col w-full align-center justify-center text-center'>Speed</div>,
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{bytesToHuman(info.getValue(),undefined,"ps")}</div>
			),
			footer: 'Speed',
		}),
		columnHelper.accessor('largest_file_size', {
			size: 90,
			header: () => <div className='flex flex-col w-full items-center justify-center gap-1 text-center text-nowrap'>Largest File</div>,		
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{bytesToHuman(info.getValue())}</div>
			),
			footer: 'Largest File',
		}),
		// columnHelper.accessor('largest_file_path', {
		// 	cell: (info) => (
		// 		isLoading(info) ?
		// 		<Skeleton />
		// 		:
		// 		<span>{info.getValue()}</span>
		// 	),
		// 	header: 'Largest File',
		// 	footer: 'Largest File',
		// }),
	];
	
}

const pageSize = 5;
const darkColumns = columnBuilder(darkIconIntensity);
const lightColumns = columnBuilder(lightIconIntensity);
const blankResults =  Array.from({length: pageSize}, (v, i) => blankResult);

const AgentListClient = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const {isDarkTheme} = useDarkMode();
	const columns = isDarkTheme ? darkColumns : lightColumns

	const response = useAgentDetails();
	const data = response.isLoading ? blankResults : response.data;
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			globalFilter,
		},
		onSortingChange: setSorting,
		enableGlobalFilter: true,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: { pageSize: 5 },
		},
		// debugTable: true,
	});

	return (
		<PageWrapper>
			{/* Bring back when we want to support adding an agent and searching <Subheader>
				<SubheaderLeft>
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
							id='example'
							name='example'
							placeholder='Search...'
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
						/>
					</FieldWrap>
				</SubheaderLeft>
				<SubheaderRight>
					<Link href={`${editLinkPath}new`}>
						<Button variant='solid' icon='HeroPlus'>
							New Agent
						</Button>
					</Link>
				</SubheaderRight>
			</Subheader> */}
			<Container className='h-full max-w-full'>
				<Card className='h-full p-4'>
					<CardHeader className='mb-4'>
						<CardHeaderChild>
							<CardTitle>All Agents</CardTitle>
							{response.isLoading ? undefined
							:
							<Badge
								variant='outline'
								className='border-transparent px-4'
								rounded='rounded-full'>
								{table.getFilteredRowModel().rows.length} agents
							</Badge>
							}
						</CardHeaderChild>
					</CardHeader>
					<div className='mr-2 ml-2 h-full'>
						<CardBody className='h-full w-full overflow-auto mb-4 scrollbar-thin !p-0'>
							<TableTemplate className='table-fixed max-md:min-w-[70rem]' table={table} hasFooter={false} sizeUnits='px'/>
						</CardBody>
						{/* Bring back if we go paged.<TableCardFooterTemplate table={table} /> */}
					</div>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default AgentListClient;

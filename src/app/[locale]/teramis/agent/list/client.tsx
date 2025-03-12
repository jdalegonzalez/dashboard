'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';

import { formatDate, statusToColor, bytesToHuman, gigsToBytes } from '@/utils/dataDisplay.util';
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
import Link from 'next/link';
import Container from '@/components/layouts/Container/Container';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import TableTemplate from '@/templates/common/TableParts.template';
import Skeleton from '@/components/utils/ThemedSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAgentDetails, blankResult } from '@/hooks/useAgent';
import { AgentAPIResults } from '@/app/lib/fetch';
import { Agent } from '@/prisma-client';

const columnHelper = createColumnHelper<Agent>();

const editLinkPath = `/teramis/agent/`;

const isLoading = (info:CellContext<Agent, any>) => info.row.original.id === 'loading';

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
	  addLeftBorder?: boolean,
	  sizeUnits?: string
	}
}

const columnBuilder = () => {
	return [
		columnHelper.accessor('id', {
			cell: (info) => {
				const statVal = info.row.original.status;
				const {color,intensity} = statusToColor(statVal);
				return (
				isLoading(info) ?
				<Skeleton />
				: 				
				<Link href={`${editLinkPath}${info.row.original.id}`}>
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
						</div>
					</div>
				</Link>
			)},
			header: 'Agent',
			footer: 'Agent',
			enableGlobalFilter: false,
			enableSorting: false,
		}),
		columnHelper.accessor('location', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div>{info.getValue()}</div>
			),
			meta: {sizeUnits: 'rem'},
			size: 10,
			minSize: 10,
			maxSize: 10,
			footer: 'Location',
			header: "Location",
		}),
        columnHelper.accessor('updated_at', {
            cell: (info) => (
                isLoading(info) ?
                <Skeleton />
                :
                <span>{formatDate(info.getValue())}</span>
            ),
            header: 'Last Checkin',
            footer: 'Last Checkin',
        }),
		columnHelper.accessor('processor', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className=''>{info.getValue()}</div>
			),
			footer: 'Processor',
			header: "Processor",
		}),
		columnHelper.accessor('os', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<span>{`${info.getValue()} - ${info.row.original.os_version} - ${info.row.original.arch}`}</span>
			),
			header: 'Operating System',
			footer: 'Operating System',
		}),
		columnHelper.accessor('logical_cpus', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{info.getValue()}</div>
			),
			header: () => <div className='text-center w-full mr-4'>CPUs</div>,
			footer: 'Logical CPUs',
		}),
		columnHelper.accessor('cores', {
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<span>{info.getValue()}</span>
			),
			header: 'Cores',
			footer: 'Cores',
		}),
		columnHelper.accessor('ram_gb', {
			header: () => <div className='flex flex-row w-full items-center justify-center gap-1 text-center'>Ram</div>,		
			cell: (info) => (
				isLoading(info) ?
				<Skeleton />
				:
				<div className='w-full text-center'>{bytesToHuman(gigsToBytes(info.getValue(),undefined,true))}</div>
			),
			footer: 'Scan Size',
		}),
	];
	
}

const pageSize = 5;
const columns = columnBuilder();
const blankResults:AgentAPIResults =  Array.from({length: pageSize}, (v, i) => blankResult);
const AgentListClient = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

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

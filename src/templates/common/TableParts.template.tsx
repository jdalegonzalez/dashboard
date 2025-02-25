import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { flexRender, Table as TTableProps, Column as TColumn, ColumnMeta, RowData } from '@tanstack/react-table';
import { CardFooter, CardFooterChild } from '@/components/ui/Card';
import Mounted from '@/components/Mounted';
import Table, { ITableProps, TBody, Td, TFoot, Th, THead, Tr } from '../../components/ui/Table';
import Icon from '../../components/icon/Icon';
import Button from '../../components/ui/Button';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';

interface ITableHeaderTemplateProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	table: TTableProps<any>;
	sizeUnits?: string
}

const columnWidthStyle = (column:TColumn<any, unknown>, argUnits?: string) => {
	const size = column.getSize();
	const units = argUnits ?? '%';
	if (size && size >= 0) return { width: `${size}${units}`}
	return {}
}

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
	  addLeftBorder: boolean
	}
}

const leftBorderClass = classNames(
	'shadow-[inset_0.5px_0_0_0_rgba(0,0,0,0.15)]',
	'dark:shadow-[inset_0.5px_0_0_0_rgba(255,255,255,0.15)]',	
);

export const TableHeaderTemplate: FC<ITableHeaderTemplateProps> = ({ table, sizeUnits }) => {
	return (
		<THead>
			{table.getHeaderGroups().map((headerGroup) => (
				<Tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<Th
							key={header.id}
							isColumnBorder={false}
							style={{...columnWidthStyle(header.column, sizeUnits)}}
							className={classNames(
							{
								'text-left': header.id !== 'Actions',
								'text-right': header.id === 'Actions',
								[leftBorderClass]: header.column.columnDef.meta?.addLeftBorder
							})}>
							{header.isPlaceholder ? null : (
								<div
									key={header.id}
									aria-hidden='true'
									{...{
										className: header.column.getCanSort()
											? 'cursor-pointer select-none flex items-center'
											: '',
										onClick: header.column.getToggleSortingHandler(),
									}}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{{
										asc: (
											<Icon
												icon='HeroChevronUp'
												className='ltr:ml-1.5 rtl:mr-1.5'
											/>
										),
										desc: (
											<Icon
												icon='HeroChevronDown'
												className='ltr:ml-1.5 rtl:mr-1.5'
											/>
										),
									}[header.column.getIsSorted() as string] ?? null}
								</div>
							)}
						</Th>
					))}
				</Tr>
			))}
		</THead>
	);
};

interface ITableBodyTemplateProps {
	sizeUnits?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	table: TTableProps<any>;
}
export const TableBodyTemplate: FC<ITableBodyTemplateProps> = ({ table, sizeUnits }) => {
	return (
		<TBody>
			{table.getRowModel().rows.map((row) => (
				<Tr key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<Td
							key={cell.id}
							style={{...columnWidthStyle(cell.column, sizeUnits)}}
							className={classNames(
							{
								'text-left': cell.column.id !== 'Actions',
								'text-right': cell.column.id === 'Actions',
								[leftBorderClass]: cell.column.columnDef.meta?.addLeftBorder
							})}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</Td>
					))}
				</Tr>
			))}
		</TBody>
	);
};

interface ITableFooterTemplateProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	table: TTableProps<any>;
	sizeUnits?: string;
}
export const TableFooterTemplate: FC<ITableFooterTemplateProps> = ({ table, sizeUnits }) => {
	return (
		<TFoot>
			{table.getFooterGroups().map((footerGroup) => (
				<Tr key={footerGroup.id}>
					{footerGroup.headers.map((header) => (
						<Th
							key={header.id}
							isColumnBorder={false}
							style={{...columnWidthStyle(header.column, sizeUnits)}}
							className={classNames({
								'text-left': header.id !== 'Actions',
								'text-right': header.id === 'Actions',
							})}>
							{header.isPlaceholder ? null : (
								<div
									key={header.id}
									aria-hidden='true'
									{...{
										className: header.column.getCanSort()
											? 'cursor-pointer select-none flex items-center'
											: '',
										onClick: header.column.getToggleSortingHandler(),
									}}>
									{flexRender(
										header.column.columnDef.footer,
										header.getContext(),
									)}
									{{
										asc: (
											<Icon
												icon='HeroChevronUp'
												className='ltr:ml-1.5 rtl:mr-1.5'
											/>
										),
										desc: (
											<Icon
												icon='HeroChevronDown'
												className='ltr:ml-1.5 rtl:mr-1.5'
											/>
										),
									}[header.column.getIsSorted() as string] ?? null}
								</div>
							)}
						</Th>
					))}
				</Tr>
			))}
		</TFoot>
	);
};

interface ITableTemplateProps extends Partial<ITableProps> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	table: TTableProps<any>;
	sizeUnits?: string;
	hasHeader?: boolean;
	hasFooter?: boolean;
}
const TableTemplate: React.ForwardRefRenderFunction<HTMLTableElement, ITableTemplateProps> = (props, ref) => {
	const { children, hasHeader = true, hasFooter = true, sizeUnits, table, ...rest } = props;
	return (
		<Mounted>
			<Table ref={ref} {...rest}>
				{children || (
					<>
						{hasHeader && <TableHeaderTemplate table={table} sizeUnits={sizeUnits} />}
						<TableBodyTemplate table={table} sizeUnits={sizeUnits} />
						{hasFooter && <TableFooterTemplate table={table} sizeUnits={sizeUnits} />}
					</>
				)}
			</Table>
		</Mounted>
	);
};

interface ITableCardFooterTemplateProps extends Partial<ITableProps> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	table: TTableProps<any>;
}
export const TableCardFooterTemplate: FC<ITableCardFooterTemplateProps> = ({ table }) => {
	return (
		<CardFooter>
			<CardFooterChild>
				<Select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
					className='!w-fit'
					name='pageSize'>
					{[5, 10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</Select>
			</CardFooterChild>
			<CardFooterChild>
				<Button
					onClick={() => table.setPageIndex(0)}
					isDisable={!table.getCanPreviousPage()}
					icon='HeroChevronDoubleLeft'
					className='!px-0'
				/>
				<Button
					onClick={() => table.previousPage()}
					isDisable={!table.getCanPreviousPage()}
					icon='HeroChevronLeft'
					className='!px-0'
				/>
				<span className='flex items-center gap-1'>
					<div>Page</div>
					<strong>
						<Input
							value={table.getState().pagination.pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								table.setPageIndex(page);
							}}
							className='inline-flex !w-12 text-center'
							name='page'
						/>{' '}
						of {table.getPageCount()}
					</strong>
				</span>
				<Button
					onClick={() => table.nextPage()}
					isDisable={!table.getCanNextPage()}
					icon='HeroChevronRight'
					className='!px-0'
				/>
				<Button
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					isDisable={!table.getCanNextPage()}
					icon='HeroChevronDoubleRight'
					className='!px-0'
				/>
			</CardFooterChild>
		</CardFooter>
	);
};

export default forwardRef(TableTemplate);

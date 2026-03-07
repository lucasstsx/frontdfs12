import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	type PaginationState,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { Input } from "#/components/ui/input";
import { useDebounce } from "#/hooks/use-debounce";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchKey?: string;
	searchPlaceholder?: string;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	pageCount?: number;
	pageIndex?: number;
	onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchKey,
	searchPlaceholder = "Pesquisar...",
	searchValue,
	onSearchChange,
	pageCount,
	pageIndex,
	onPageChange,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [localSearch, setLocalSearch] = React.useState(searchValue ?? "");
	const debouncedSearch = useDebounce(localSearch, 300);
	const isServerPagination = typeof onPageChange === "function";

	const table = useReactTable({
		data,
		columns,
		pageCount: isServerPagination ? pageCount : undefined,
		manualPagination: isServerPagination,
		manualFiltering: !!onSearchChange,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: isServerPagination ? undefined : setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			pagination: isServerPagination
				? {
						pageIndex: (pageIndex ?? 1) - 1,
						pageSize: 10,
					}
				: pagination,
		},
	});

	// Sincroniza o valor externo com o campo local
	React.useEffect(() => {
		if (searchValue !== undefined) {
			setLocalSearch(searchValue);
		}
	}, [searchValue]);

	React.useEffect(() => {
		if (!searchKey) {
			return;
		}

		if (onSearchChange) {
			if (debouncedSearch !== (searchValue ?? "")) {
				onSearchChange(debouncedSearch);
			}
			return;
		}

		table.getColumn(searchKey)?.setFilterValue(debouncedSearch);
	}, [debouncedSearch, onSearchChange, searchKey, searchValue, table]);

	return (
		<div className="space-y-4">
			{searchKey && (
				<div className="flex items-center">
					<Input
						placeholder={searchPlaceholder}
						value={localSearch}
						onChange={(event) => setLocalSearch(event.target.value)}
						className="max-w-sm h-10 border-2  "
					/>
				</div>
			)}
			<div className="rounded-xl border-2 overflow-hidden bg-card">
				<Table>
					<TableHeader className="bg-muted/30">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="font-bold text-primary uppercase text-xs h-12"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="hover:bg-muted/10 transition-colors border-b last:border-0"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="py-3">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center text-muted-foreground italic"
								>
									Nenhum resultado encontrado.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} onPageChange={onPageChange} />
		</div>
	);
}

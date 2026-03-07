import type { Table } from "@tanstack/react-table";
import { Button } from "#/components/ui/button";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	onPageChange?: (page: number) => void;
}

export function DataTablePagination<TData>({
	table,
	onPageChange,
}: DataTablePaginationProps<TData>) {
	const pageIndex = table.getState().pagination.pageIndex + 1;
	const totalPages = table.getPageCount();

	const handlePrevious = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!table.getCanPreviousPage()) return;
		
		if (onPageChange) {
			onPageChange(pageIndex - 1);
		} else {
			table.previousPage();
		}
	};

	const handleNext = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!table.getCanNextPage()) return;

		if (onPageChange) {
			onPageChange(pageIndex + 1);
		} else {
			table.nextPage();
		}
	};

	// Não renderiza se não houver mais de uma página
	if (totalPages <= 1) return null;

	return (
		<div className="mt-4 flex items-center justify-end space-x-2 py-4 px-2">
			<Button
				variant="outline"
				size="sm"
				disabled={!table.getCanPreviousPage()}
				onClick={handlePrevious}
				className="font-bold border-2"
			>
				Anterior
			</Button>
			
			<div className="text-xs font-bold text-muted-foreground uppercase px-2">
				Página {pageIndex} de {totalPages}
			</div>

			<Button
				variant="outline"
				size="sm"
				disabled={!table.getCanNextPage()}
				onClick={handleNext}
				className="font-bold border-2"
			>
				Próximo
			</Button>
		</div>
	);
}

import { useMemo } from "react";
import { DataTable } from "#/components/ui/data-table/data-table";
import { type Conhecimento } from "#/lib/services/conhecimentos.service";
import { type ConhecimentoValues } from "#/components/ConhecimentoForm";
import { getColumns } from "./columns";

interface ConhecimentosAdminTableProps {
	data: Conhecimento[];
	titulo: string | undefined;
	editingConhecimento: Conhecimento | null;
	setEditingConhecimento: (val: Conhecimento | null) => void;
	handleEdit: (values: ConhecimentoValues) => Promise<void>;
	deletingId: string | null;
	setDeletingId: (val: string | null) => void;
	handleDelete: () => Promise<void>;
	handleSearchChange: (value: string) => void;
	pageCount?: number;
	pageIndex?: number;
	onPageChange?: (page: number) => void;
}

export function ConhecimentosAdminTable({
	data,
	titulo,
	editingConhecimento,
	setEditingConhecimento,
	handleEdit,
	deletingId,
	setDeletingId,
	handleDelete,
	handleSearchChange,
	pageCount,
	pageIndex,
	onPageChange,
}: ConhecimentosAdminTableProps) {
	const columns = useMemo(
		() =>
			getColumns({
				editingConhecimento,
				setEditingConhecimento,
				handleEdit,
				deletingId,
				setDeletingId,
				handleDelete,
			}),
		[
			editingConhecimento, 
			setEditingConhecimento, 
			handleEdit, 
			deletingId, 
			setDeletingId, 
			handleDelete
		],
	);

	return (
		<DataTable
			columns={columns}
			data={data}
			searchKey="titulo"
			searchPlaceholder="Filtrar por título..."
			searchValue={titulo}
			onSearchChange={handleSearchChange}
			pageCount={pageCount}
			pageIndex={pageIndex}
			onPageChange={onPageChange}
		/>
	);
}

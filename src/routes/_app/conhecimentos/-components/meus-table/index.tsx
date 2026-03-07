import { useMemo } from "react";
import type { ConhecimentoValues } from "#/components/ConhecimentoForm";
import { DataTable } from "#/components/ui/data-table/data-table";
import { type Conhecimento, getColumns } from "./columns";

interface MeusConhecimentosTableProps {
	data: Conhecimento[];
	titulo: string | undefined;
	editingConhecimento: Conhecimento | null;
	setEditingConhecimento: (val: Conhecimento | null) => void;
	deletingId: string | null;
	setDeletingId: (val: string | null) => void;
	handleEdit: (values: ConhecimentoValues) => Promise<void>;
	handleDelete: () => Promise<void>;
	handleSearchChange: (value: string) => void;
}

export function MeusConhecimentosTable({
	data,
	titulo,
	editingConhecimento,
	setEditingConhecimento,
	deletingId,
	setDeletingId,
	handleEdit,
	handleDelete,
	handleSearchChange,
}: MeusConhecimentosTableProps) {
	const columns = useMemo(
		() =>
			getColumns({
				editingConhecimento,
				setEditingConhecimento,
				deletingId,
				setDeletingId,
				handleEdit,
				handleDelete,
			}),
		[
			editingConhecimento,
			deletingId,
			handleEdit,
			handleDelete,
			setEditingConhecimento,
			setDeletingId,
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
		/>
	);
}

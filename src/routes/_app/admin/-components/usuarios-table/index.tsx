import { useMemo } from "react";
import { DataTable } from "#/components/ui/data-table/data-table";
import type { Pessoa } from "#/lib/services/pessoas.service";
import { getColumns } from "./columns";

interface UsuariosTableProps {
	data: Pessoa[];
	nome: string | undefined;
	editingPessoa: Pessoa | null;
	setEditingPessoa: (val: Pessoa | null) => void;
	handleEdit: (id: string, data: Partial<Pessoa>) => Promise<void>;
	deletingId: string | null;
	setDeletingId: (val: string | null) => void;
	handleDelete: () => Promise<void>;
	handleSearchChange: (value: string) => void;
	pageCount?: number;
	pageIndex?: number;
	onPageChange?: (page: number) => void;
}

export function UsuariosTable({
	data,
	nome,
	editingPessoa,
	setEditingPessoa,
	handleEdit,
	deletingId,
	setDeletingId,
	handleDelete,
	handleSearchChange,
	pageCount,
	pageIndex,
	onPageChange,
}: UsuariosTableProps) {
	// Mantemos as colunas memoizadas para evitar rerender em cascata no DataTable.
	const columns = useMemo(
		() =>
			getColumns({
				editingPessoa,
				setEditingPessoa,
				handleEdit,
				deletingId,
				setDeletingId,
				handleDelete,
			}),
		[
			editingPessoa,
			setEditingPessoa,
			handleEdit,
			deletingId,
			handleDelete,
			setDeletingId,
		],
	);

	return (
		<DataTable
			columns={columns}
			data={data}
			searchKey="nome"
			searchPlaceholder="Filtrar nome (página atual)..."
			searchValue={nome}
			onSearchChange={handleSearchChange}
			pageCount={pageCount}
			pageIndex={pageIndex}
			onPageChange={onPageChange}
		/>
	);
}

import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Edit, Trash2 } from "lucide-react";
import {
	ConhecimentoForm,
	type ConhecimentoValues,
} from "#/components/ConhecimentoForm";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "#/components/ui/alert-dialog";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";

export interface Conhecimento {
	id: string;
	titulo: string;
	descricao: string;
	categoria: string;
	nivel: string;
	pessoaId: string;
	criadoEm: string;
}

interface ColumnProps {
	editingConhecimento: Conhecimento | null;
	setEditingConhecimento: (val: Conhecimento | null) => void;
	deletingId: string | null;
	setDeletingId: (val: string | null) => void;
	handleEdit: (values: ConhecimentoValues) => Promise<void>;
	handleDelete: () => Promise<void>;
}

export const getColumns = ({
	editingConhecimento,
	setEditingConhecimento,
	deletingId,
	setDeletingId,
	handleEdit,
	handleDelete,
}: ColumnProps): ColumnDef<Conhecimento>[] => [
	{
		accessorKey: "titulo",
		header: "Título",
		cell: ({ row }) => (
			<div className="font-bold text-primary">{row.getValue("titulo")}</div>
		),
	},
	{
		accessorKey: "categoria",
		header: "Categoria",
		cell: ({ row }) => (
			<div className="text-center">
				<Badge
					variant="secondary"
					className="bg-secondary/30 text-primary font-bold text-[10px]"
				>
					{row.getValue("categoria")}
				</Badge>
			</div>
		),
	},
	{
		accessorKey: "nivel",
		header: "Nível",
		cell: ({ row }) => (
			<div className="text-center">
				<Badge
					variant={
						row.getValue("nivel") === "AVANCADO" ? "destructive" : "default"
					}
					className="text-[10px] font-bold"
				>
					{row.getValue("nivel")}
				</Badge>
			</div>
		),
	},
	{
		accessorKey: "criadoEm",
		header: "Criado em",
		cell: ({ row }) => (
			<div className="text-muted-foreground text-xs">
				{new Date(row.getValue("criadoEm")).toLocaleDateString("pt-BR")}
			</div>
		),
	},
	{
		id: "actions",
		header: () => <div className="text-right">Ações</div>,
		cell: ({ row }) => {
			const item = row.original;
			return (
				<div className="flex justify-end gap-2">
					<Dialog
						open={editingConhecimento?.id === item.id}
						onOpenChange={(open) => setEditingConhecimento(open ? item : null)}
					>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 text-primary border-primary/20 hover:bg-primary/10"
							>
								<Edit size={16} />
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-2 gap-0">
							<DialogHeader className="p-6 bg-muted/5 border-b">
								<DialogTitle className="text-2xl font-extrabold text-primary">
									Editar Conhecimento
								</DialogTitle>
								<DialogDescription>
									Atualize as informações da sua publicação.
								</DialogDescription>
							</DialogHeader>
							<div className="p-6">
								<ConhecimentoForm
									initialValues={item as Partial<ConhecimentoValues>}
									onSubmit={handleEdit}
									onCancel={() => setEditingConhecimento(null)}
									buttonText="Salvar Alterações"
								/>
							</div>
						</DialogContent>
					</Dialog>

					<AlertDialog
						open={deletingId === item.id}
						onOpenChange={(open) => setDeletingId(open ? item.id : null)}
					>
						<AlertDialogTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 text-destructive border-destructive/20 hover:bg-destructive/10"
							>
								<Trash2 size={16} />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="border-2">
							<AlertDialogHeader>
								<div className="flex items-center gap-2 text-destructive mb-2">
									<AlertTriangle size={24} />
									<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
								</div>
								<AlertDialogDescription className="text-base text-muted-foreground">
									Esta ação não pode ser desfeita. Isso excluirá permanentemente
									o conhecimento
									<strong className="text-foreground ml-1">
										"{item.titulo}"
									</strong>
									.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="mt-6">
								<AlertDialogCancel className="font-bold">
									Cancelar
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDelete}
									variant={"destructive"}
									className="font-bold"
								>
									Sim, excluir
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			);
		},
	},
];

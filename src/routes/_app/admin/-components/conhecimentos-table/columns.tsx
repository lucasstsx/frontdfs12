import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Edit, Trash2, User } from "lucide-react";
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
import type { Conhecimento } from "#/lib/services/conhecimentos.service";
import { cn } from "#/lib/utils";

interface ColumnProps {
	editingConhecimento: Conhecimento | null;
	setEditingConhecimento: (val: Conhecimento | null) => void;
	handleEdit: (values: ConhecimentoValues) => Promise<void>;
	deletingId: string | null;
	setDeletingId: (val: string | null) => void;
	handleDelete: () => Promise<void>;
}

export const getColumns = ({
	editingConhecimento,
	setEditingConhecimento,
	handleEdit,
	deletingId,
	setDeletingId,
	handleDelete,
}: ColumnProps): ColumnDef<Conhecimento>[] => [
	{
		accessorKey: "titulo",
		header: "Título",
		cell: ({ row }) => (
			<div className="flex flex-col">
				<span className="font-bold text-primary">{row.getValue("titulo")}</span>
				<span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
					ID: {row.original.id.slice(0, 8)}
				</span>
			</div>
		),
	},
	{
		accessorKey: "pessoa",
		header: "Criador",
		cell: ({ row }) => {
			const pessoa = row.original.pessoa;
			return (
				<div className="flex flex-col">
					<div className="flex items-center gap-1 text-xs font-bold text-foreground">
						<User size={10} className="text-primary" />
						{pessoa?.nome || "Membro"}
					</div>
					<span className="text-[10px] text-muted-foreground">
						{pessoa?.email}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "categoria",
		header: "Categoria",
		cell: ({ row }) => (
			<div className="text-center">
				<Badge
					variant="secondary"
					className="bg-secondary/30 text-primary font-bold text-[10px] uppercase"
				>
					{row.getValue("categoria")}
				</Badge>
			</div>
		),
	},
	{
		accessorKey: "nivel",
		header: "Nível",
		cell: ({ row }) => {
			const nivel = row.getValue("nivel") as string;

			return (
				<div className="text-center">
					<Badge
						variant={nivel === "AVANCADO" ? "destructive" : "default"}
						className={cn(
							"text-[10px] font-bold uppercase tracking-wider",
							nivel === "BASICO" && "bg-emerald-500 hover:bg-emerald-600",
							nivel === "INTERMEDIARIO" && "bg-amber-500 hover:bg-amber-600",
						)}
					>
						{nivel}
					</Badge>
				</div>
			);
		},
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
									Moderação: Editar Conteúdo
								</DialogTitle>
								<DialogDescription>
									Alterando conhecimento de{" "}
									<span className="font-bold">{item.pessoa?.nome}</span>.
								</DialogDescription>
							</DialogHeader>
							<div className="p-6">
								<ConhecimentoForm
									initialValues={item as Partial<ConhecimentoValues>}
									onSubmit={handleEdit}
									onCancel={() => setEditingConhecimento(null)}
									buttonText="Salvar Como Admin"
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
									<AlertDialogTitle>Remover Conteúdo?</AlertDialogTitle>
								</div>
								<AlertDialogDescription className="text-base text-muted-foreground">
									Como administrador, você está prestes a remover o conhecimento
									<strong className="text-foreground ml-1">
										"{item.titulo}"
									</strong>{" "}
									de <span className="font-bold">{item.pessoa?.nome}</span>.
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
									Sim, remover
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			);
		},
	},
];

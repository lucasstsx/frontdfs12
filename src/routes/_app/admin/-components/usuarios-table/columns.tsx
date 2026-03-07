import { useForm } from "@tanstack/react-form";
import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Edit, Save, Shield, Trash2, User } from "lucide-react";
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
import { Field, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import type { Pessoa } from "#/lib/services/pessoas.service";

interface ColumnProps {
	editingPessoa: Pessoa | null;
	setEditingPessoa: (val: Pessoa | null) => void;
	handleEdit: (id: string, data: Partial<Pessoa>) => Promise<void>;
	deletingId: string | null;
	setDeletingId: (val: string | null) => void;
	handleDelete: () => Promise<void>;
}

export const getColumns = ({
	editingPessoa,
	setEditingPessoa,
	handleEdit,
	deletingId,
	setDeletingId,
	handleDelete,
}: ColumnProps): ColumnDef<Pessoa>[] => [
	{
		accessorKey: "nome",
		header: "Nome",
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
					<User size={14} />
				</div>
				<span className="font-bold text-primary">{row.getValue("nome")}</span>
			</div>
		),
	},
	{
		accessorKey: "email",
		header: "E-mail",
		cell: ({ row }) => (
			<div className="text-muted-foreground font-medium">
				{row.getValue("email")}
			</div>
		),
	},
	{
		accessorKey: "isAdmin",
		header: "Perfil",
		cell: ({ row }) => {
			const isAdmin = row.getValue("isAdmin") as boolean;
			return (
				<div className="text-center">
					<Badge
						variant={isAdmin ? "destructive" : "secondary"}
						className="font-bold uppercase tracking-wider text-[10px] gap-1"
					>
						{isAdmin ? <Shield size={10} /> : null}
						{isAdmin ? "Admin" : "Usuário"}
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
						// Mantemos um unico modal de edicao aberto por vez via id selecionado.
						open={editingPessoa?.id === item.id}
						onOpenChange={(open) => setEditingPessoa(open ? item : null)}
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
						<DialogContent className="sm:max-w-[400px]">
							<DialogHeader>
								<DialogTitle>Editar Usuário</DialogTitle>
								<DialogDescription>
									Alterando informações básicas de{" "}
									<span className="font-bold">{item.nome}</span>.
								</DialogDescription>
							</DialogHeader>

							<UserEditForm
								user={item}
								onSubmit={(data) => handleEdit(item.id, data)}
								onCancel={() => setEditingPessoa(null)}
							/>
						</DialogContent>
					</Dialog>

					<AlertDialog
						// Mesmo padrao do edit: controle centralizado do item em remocao.
						open={deletingId === item.id}
						onOpenChange={(open) => setDeletingId(open ? item.id : null)}
					>
						<AlertDialogTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 text-destructive border-destructive/20 hover:bg-destructive/10"
								disabled={item.isAdmin}
							>
								<Trash2 size={16} />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="border-2">
							<AlertDialogHeader>
								<div className="flex items-center gap-2 text-destructive mb-2">
									<AlertTriangle size={24} />
									<AlertDialogTitle>Excluir Usuário?</AlertDialogTitle>
								</div>
								<AlertDialogDescription className="text-base text-muted-foreground">
									Esta ação removerá permanentemente
									<strong className="text-foreground ml-1">
										"{item.nome}"
									</strong>{" "}
									e todos os seus dados da plataforma.
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

function UserEditForm({
	user,
	onSubmit,
	onCancel,
}: {
	user: Pessoa;
	onSubmit: (data: Partial<Pessoa>) => void;
	onCancel: () => void;
}) {
	const form = useForm({
		defaultValues: {
			// Form abre preenchido com snapshot atual para edicao rapida no modal.
			nome: user.nome,
			telefone: user.telefone,
		},
		onSubmit: async ({ value }) => {
			onSubmit(value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-4 pt-4"
		>
			<FieldGroup>
				<form.Field name="nome">
					{(field) => (
						<Field>
							<FieldLabel className="font-bold">Nome</FieldLabel>
							<Input
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</Field>
					)}
				</form.Field>
				<form.Field name="telefone">
					{(field) => (
						<Field>
							<FieldLabel className="font-bold">Telefone</FieldLabel>
							<Input
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</Field>
					)}
				</form.Field>
				<div className="flex justify-end gap-2 pt-4">
					<Button type="button" variant="ghost" onClick={onCancel}>
						Cancelar
					</Button>
					<Button type="submit" className="font-bold">
						<Save size={16} className="mr-2" />
						Salvar
					</Button>
				</div>
			</FieldGroup>
		</form>
	);
}

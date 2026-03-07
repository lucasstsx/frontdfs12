import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { z } from "zod";
import { queryKeys } from "#/lib/query-keys";
import { adminUsuariosListQueryOptions } from "#/lib/query-options";
import type { Pessoa } from "#/lib/services/pessoas.service";
import { pessoasService } from "#/lib/services/pessoas.service";
import { UsuariosTable } from "./-components/usuarios-table";

const searchSchema = z.object({
	nome: z.string().optional().default(""),
	page: z.number().optional().default(1),
});

export const Route = createFileRoute("/_app/admin/usuarios")({
	validateSearch: (search) => searchSchema.parse(search),
	loaderDeps: ({ search }) => ({ page: searchSchema.parse(search).page }),
	loader: ({ context, deps }) =>
		context.queryClient.ensureQueryData(adminUsuariosListQueryOptions(deps)),
	component: UsuariosAdminPage,
});

function UsuariosPage() {
	const navigate = Route.useNavigate();
	const { nome, page } = Route.useSearch();
	const queryClient = useQueryClient();
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);

	// Busca todos os usuários
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		...adminUsuariosListQueryOptions({ page }),
	});

	const usuarios = response?.data || [];
	const meta = response?.meta || { totalPages: 1 };
	const normalizedNome = nome.trim().toLocaleLowerCase("pt-BR");
	const usuariosFiltrados = usuarios.filter((item) => {
		if (!normalizedNome) {
			return true;
		}

		return item.nome.toLocaleLowerCase("pt-BR").includes(normalizedNome);
	});

	// Mutação para excluir
	const deleteMutation = useMutation({
		mutationFn: (id: string) => pessoasService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.pessoas.adminLists,
			});
			setDeletingId(null);
		},
	});

	// Mutação para editar (Admin)
	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<Pessoa> }) =>
			pessoasService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.pessoas.adminLists,
			});
			setEditingPessoa(null);
		},
	});

	const handleEdit = useCallback(
		async (id: string, data: Partial<Pessoa>) => {
			updateMutation.mutate({ id, data });
		},
		[updateMutation],
	);

	const handleDelete = useCallback(async () => {
		if (deletingId) {
			deleteMutation.mutate(deletingId);
		}
	}, [deletingId, deleteMutation]);

	const handleSearchChange = (value: string) => {
		navigate({
			search: (prev) => ({ ...prev, nome: value, page: 1 }),
			replace: true,
		});
	};

	const handlePageChange = (newPage: number) => {
		navigate({
			search: (prev) => ({ ...prev, page: newPage }),
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col gap-8"
		>
			<div className="flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="flex flex-col gap-1 text-center md:text-left">
					<h1 className="text-3xl font-extrabold text-primary tracking-tight">
						Gestão de Usuários
					</h1>
					<p className="text-muted-foreground font-medium italic">
						Visualize e gerencie todos os membros da plataforma.
					</p>
				</div>
			</div>

			{isLoading ? (
				<div className="flex flex-col items-center justify-center py-20">
					<Loader2 size={48} className="text-primary animate-spin mb-4" />
					<p className="text-muted-foreground font-bold italic">
						Carregando usuários...
					</p>
				</div>
			) : error ? (
				<div className="flex flex-col items-center justify-center py-20 text-center bg-destructive/5 rounded-3xl border-2 border-dashed border-destructive/20">
					<h3 className="text-xl font-bold text-destructive">
						Erro ao carregar lista
					</h3>
					<p className="text-muted-foreground max-w-xs mt-1 font-bold italic">
						Certifique-se de que você tem permissões de administrador.
					</p>
				</div>
			) : (
				<div className="bg-card">
					<p className="mb-4 text-xs font-medium text-muted-foreground italic">
						Busca local por nome na página atual.
					</p>
					<UsuariosTable
						data={usuariosFiltrados}
						nome={nome}
						editingPessoa={editingPessoa}
						setEditingPessoa={setEditingPessoa}
						handleEdit={handleEdit}
						deletingId={deletingId}
						setDeletingId={setDeletingId}
						handleDelete={handleDelete}
						handleSearchChange={handleSearchChange}
						pageCount={meta.totalPages}
						pageIndex={page}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</motion.div>
	);
}

function UsuariosAdminPage() {
	return <UsuariosPage />;
}

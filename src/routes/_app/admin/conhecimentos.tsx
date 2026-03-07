import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { z } from "zod";
import type { ConhecimentoValues } from "#/components/ConhecimentoForm";
import { queryKeys } from "#/lib/query-keys";
import { adminConhecimentosListQueryOptions } from "#/lib/query-options";
import {
	type Conhecimento,
	conhecimentosService,
} from "#/lib/services/conhecimentos.service";
import { ConhecimentosAdminTable } from "./-components/conhecimentos-table";

const searchSchema = z.object({
	titulo: z.string().optional().default(""),
	page: z.number().optional().default(1),
});

export const Route = createFileRoute("/_app/admin/conhecimentos")({
	validateSearch: (search) => searchSchema.parse(search),
	// Faz o loader reagir a mudancas de filtro/paginacao e reaproveitar cache por chave.
	loaderDeps: ({ search }) => searchSchema.parse(search),
	loader: ({ context, deps }) =>
		context.queryClient.ensureQueryData(
			adminConhecimentosListQueryOptions(deps),
		),
	component: ConhecimentosAdminPage,
});

function ConhecimentosPage() {
	const navigate = Route.useNavigate();
	const { titulo, page } = Route.useSearch();
	const queryClient = useQueryClient();
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [editingConhecimento, setEditingConhecimento] =
		useState<Conhecimento | null>(null);

	// Busca todos os conhecimentos da plataforma
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		...adminConhecimentosListQueryOptions({ titulo, page }),
	});

	const conhecimentos = response?.data || [];
	const meta = response?.meta || { totalPages: 1 };

	// Mutação para editar (Admin)
	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<Conhecimento> }) =>
			conhecimentosService.update(id, data),
		onSuccess: (updatedConhecimento) => {
			// Admin altera dados que alimentam lista, dashboard e perfil do criador.
			queryClient.invalidateQueries({
				queryKey: queryKeys.conhecimentos.adminLists,
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.conhecimentos.adminSummary,
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.conhecimentos.all });
			queryClient.invalidateQueries({
				queryKey: queryKeys.profile.byId(updatedConhecimento.pessoaId),
			});
			setEditingConhecimento(null);
		},
	});

	// Mutação para excluir (Admin)
	const deleteMutation = useMutation({
		mutationFn: (id: string) => conhecimentosService.delete(id),
		onSuccess: (_, deletedId) => {
			// Mantemos as visoes agregadas sincronizadas sem precisar recarregar a pagina.
			queryClient.invalidateQueries({
				queryKey: queryKeys.conhecimentos.adminLists,
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.conhecimentos.adminSummary,
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.conhecimentos.all });

			// A API de delete nao devolve o dono, entao pegamos da lista atual para invalidar o perfil certo.
			const deletedConhecimento = conhecimentos.find(
				(item) => item.id === deletedId,
			);
			if (deletedConhecimento?.pessoaId) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.profile.byId(deletedConhecimento.pessoaId),
				});
			}

			setDeletingId(null);
		},
	});

	const handleEdit = useCallback(
		async (values: ConhecimentoValues) => {
			if (editingConhecimento) {
				updateMutation.mutate({ id: editingConhecimento.id, data: values });
			}
		},
		[editingConhecimento, updateMutation],
	);

	const handleDelete = useCallback(async () => {
		if (deletingId) {
			deleteMutation.mutate(deletingId);
		}
	}, [deletingId, deleteMutation]);

	const handleSearchChange = (value: string) => {
		// Sempre volta para a primeira pagina quando o termo muda.
		navigate({
			search: (prev) => ({ ...prev, titulo: value, page: 1 }),
			replace: true,
		});
	};

	const handlePageChange = (newPage: number) => {
		// Mantemos os outros filtros no estado da URL e trocamos somente a pagina.
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
						Gestão de Conteúdo
					</h1>
					<p className="text-muted-foreground font-medium italic">
						Monitore e modere todos os saberes compartilhados na plataforma.
					</p>
				</div>
			</div>

			{isLoading ? (
				<div className="flex flex-col items-center justify-center py-20">
					<Loader2 size={48} className="text-primary animate-spin mb-4" />
					<p className="text-muted-foreground font-bold italic">
						Carregando conteúdos...
					</p>
				</div>
			) : error ? (
				<div className="flex flex-col items-center justify-center py-20 text-center bg-destructive/5 rounded-3xl border-2 border-dashed border-destructive/20">
					<h3 className="text-xl font-bold text-destructive">
						Erro ao carregar lista
					</h3>
					<p className="text-muted-foreground max-w-xs mt-1 font-bold italic">
						Acesso negado ou erro na conexão com o servidor.
					</p>
				</div>
			) : (
				<div className="bg-card">
					<ConhecimentosAdminTable
						data={conhecimentos}
						titulo={titulo}
						editingConhecimento={editingConhecimento}
						setEditingConhecimento={setEditingConhecimento}
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

function ConhecimentosAdminPage() {
	return <ConhecimentosPage />;
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Loader2, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import {
	ConhecimentoForm,
	type ConhecimentoValues,
} from "#/components/ConhecimentoForm";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { queryKeys } from "#/lib/query-keys";
import { profileQueryOptions } from "#/lib/query-options";
import { authService } from "#/lib/services/auth.service";
import {
	type Conhecimento,
	conhecimentosService,
} from "#/lib/services/conhecimentos.service";
import { MeusConhecimentosTable } from "./-components/meus-table";

const searchSchema = z.object({
	titulo: z.string().optional().default(""),
});

export const Route = createFileRoute("/_app/conhecimentos/meus")({
	validateSearch: (search) => searchSchema.parse(search),
	loader: ({ context }) => {
		const user = authService.getUserFromToken();
		if (!user?.id) {
			return null;
		}

		return context.queryClient.ensureQueryData(profileQueryOptions(user.id));
	},
	component: MeusConhecimentosPage,
});

function MeusConhecimentosPage() {
	const navigate = Route.useNavigate();
	const { titulo } = Route.useSearch();
	const queryClient = useQueryClient();
	const userToken = authService.getUserFromToken();

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editingConhecimento, setEditingConhecimento] =
		useState<Conhecimento | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	// Busca os dados do perfil (que contém os conhecimentos do usuário)
	const {
		data: profile,
		isLoading,
		error,
	} = useQuery({
		...profileQueryOptions(userToken?.id || ""),
	});

	const meusConhecimentos = profile?.conhecimentos || [];
	const normalizedTitulo = titulo.trim().toLocaleLowerCase("pt-BR");

	// Filtragem local baseada na busca por título
	const filteredData = useMemo(
		() =>
			meusConhecimentos.filter((item) => {
				if (!normalizedTitulo) {
					return true;
				}

				return item.titulo
					.toLocaleLowerCase("pt-BR")
					.includes(normalizedTitulo);
			}),
		[meusConhecimentos, normalizedTitulo],
	);

	// Mutação para criar
	const createMutation = useMutation({
		mutationFn: conhecimentosService.create.bind(conhecimentosService),
		onSuccess: () => {
			if (userToken?.id) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.profile.byId(userToken.id),
				});
			}
			queryClient.invalidateQueries({ queryKey: queryKeys.conhecimentos.all });
			setIsCreateModalOpen(false);
		},
	});

	// Mutação para editar
	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<Conhecimento> }) =>
			conhecimentosService.update(id, data),
		onSuccess: () => {
			if (userToken?.id) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.profile.byId(userToken.id),
				});
			}
			queryClient.invalidateQueries({ queryKey: queryKeys.conhecimentos.all });
			setEditingConhecimento(null);
		},
	});

	// Mutação para excluir
	const deleteMutation = useMutation({
		mutationFn: (id: string) => conhecimentosService.delete(id),
		onSuccess: () => {
			if (userToken?.id) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.profile.byId(userToken.id),
				});
			}
			queryClient.invalidateQueries({ queryKey: queryKeys.conhecimentos.all });
			setDeletingId(null);
		},
	});

	const handleCreate = useCallback(
		async (values: ConhecimentoValues) => {
			if (userToken?.id) {
				createMutation.mutate({ ...values, pessoaId: userToken.id });
			}
		},
		[createMutation, userToken],
	);

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
		navigate({
			search: (prev) => ({ ...prev, titulo: value }),
			replace: true,
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="container mx-auto px-4 py-8 max-w-5xl"
		>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex flex-col gap-2 text-center md:text-left">
						<h1 className="text-4xl font-extrabold text-primary tracking-tight">
							Meus Conhecimentos
						</h1>
						<p className="text-muted-foreground text-lg italic">
							Gerencie as aulas e saberes que você compartilha com a comunidade.
						</p>
					</div>

					<Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
						<DialogTrigger asChild>
							<Button className="flex items-center gap-2 px-6 py-6 rounded-xl font-bold shadow-lg transition-all hover:scale-105">
								<Plus size={20} />
								Novo Conhecimento
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-2 gap-0">
							<DialogHeader className="p-6 bg-muted/5 border-b">
								<DialogTitle className="text-2xl font-extrabold text-primary">
									Novo Conhecimento
								</DialogTitle>
								<DialogDescription>
									Compartilhe um novo saber com a comunidade.
								</DialogDescription>
							</DialogHeader>
							<div className="p-6">
								<ConhecimentoForm
									onSubmit={handleCreate}
									onCancel={() => setIsCreateModalOpen(false)}
									buttonText={
										createMutation.isPending ? "Publicando..." : "Publicar"
									}
									isSubmitting={createMutation.isPending}
								/>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				{isLoading ? (
					<div className="flex flex-col items-center justify-center py-20">
						<Loader2 size={48} className="text-primary animate-spin mb-4" />
						<p className="text-muted-foreground font-bold">
							Carregando seus saberes...
						</p>
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center py-20 text-center bg-destructive/5 rounded-3xl border-2 border-dashed border-destructive/20">
						<h3 className="text-xl font-bold text-destructive">
							Erro ao carregar seus dados
						</h3>
						<p className="text-muted-foreground max-w-xs mt-1">
							Verifique sua conexão ou se o backend está ativo.
						</p>
					</div>
				) : meusConhecimentos.length > 0 ? (
					<MeusConhecimentosTable
						data={filteredData}
						titulo={titulo}
						editingConhecimento={editingConhecimento}
						setEditingConhecimento={setEditingConhecimento}
						deletingId={deletingId}
						setDeletingId={setDeletingId}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						handleSearchChange={handleSearchChange}
					/>
				) : (
					<div className="flex flex-col items-center justify-center py-20 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-secondary/20">
						<BookOpen
							size={48}
							className="text-muted-foreground mb-4 opacity-20"
						/>
						<h3 className="text-xl font-bold text-primary">
							Você ainda não publicou nada
						</h3>
						<p className="text-muted-foreground max-w-xs mt-1 mb-6">
							Que tal começar agora e compartilhar seu conhecimento com o mundo?
						</p>
						<Button
							onClick={() => setIsCreateModalOpen(true)}
							className="font-bold px-8"
						>
							Criar meu primeiro conhecimento
						</Button>
					</div>
				)}
			</div>
		</motion.div>
	);
}

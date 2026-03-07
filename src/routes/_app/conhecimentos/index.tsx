import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Loader2, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
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
} from "#/components/ui/dialog";
import { queryKeys } from "#/lib/query-keys";
import { conhecimentosListQueryOptions } from "#/lib/query-options";
import { authService } from "#/lib/services/auth.service";
import { conhecimentosService } from "#/lib/services/conhecimentos.service";
import { ConhecimentoCard } from "./-components/ConhecimentoCard";
import { ConhecimentoFilters } from "./-components/ConhecimentoFilters";

export const conhecimentosSearchSchema = z.object({
	busca: z.string().optional().catch(""),
	categoria: z
		.enum([
			"TODOS",
			"MUSICA",
			"TECNOLOGIA",
			"EDUCACAO",
			"ARTES",
			"IDIOMAS",
			"OUTROS",
		])
		.optional()
		.catch("TODOS"),
	nivel: z
		.enum(["TODOS", "BASICO", "INTERMEDIARIO", "AVANCADO"])
		.optional()
		.catch("TODOS"),
	page: z.number().int().min(1).optional().catch(1),
});

export const Route = createFileRoute("/_app/conhecimentos/")({
	validateSearch: (search) => conhecimentosSearchSchema.parse(search),
	loaderDeps: ({ search }) => conhecimentosSearchSchema.parse(search),
	loader: ({ context, deps }) =>
		context.queryClient.ensureQueryData(conhecimentosListQueryOptions(deps)),
	component: ConhecimentosPage,
});

function ConhecimentosPage() {
	const searchParams = Route.useSearch();
	const navigate = Route.useNavigate();
	const queryClient = useQueryClient();
	const userToken = authService.getUserFromToken();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	// Busca de conhecimentos reais via API
	const {
		data: response,
		isLoading,
		error,
	} = useQuery({
		...conhecimentosListQueryOptions(searchParams),
	});

	const conhecimentos = (response?.data || []).filter(
		(item): item is typeof item & { pessoa: NonNullable<typeof item.pessoa> } =>
			Boolean(item.pessoa),
	);
	const meta = response?.meta || { totalPages: 1 };

	// Mutação para criar conhecimento
	const createMutation = useMutation({
		mutationFn: conhecimentosService.create.bind(conhecimentosService),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.conhecimentos.all });
			setIsCreateModalOpen(false);
		},
	});

	const handleCreateConhecimento = async (values: ConhecimentoValues) => {
		if (userToken?.id) {
			createMutation.mutate({ ...values, pessoaId: userToken.id });
		}
	};

	const currentPage = searchParams.page ?? 1;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="container mx-auto px-4 py-8 max-w-7xl"
		>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex flex-col gap-2 text-center md:text-left">
						<h1 className="text-4xl font-extrabold text-primary tracking-tight">
							Explorar Conhecimentos
						</h1>
						<p className="text-muted-foreground text-lg italic">
							Descubra o que a comunidade tem a oferecer e comece sua jornada de
							aprendizado.
						</p>
					</div>

					<Button
						onClick={() => setIsCreateModalOpen(true)}
						className="flex items-center gap-2 px-6 py-6 rounded-xl font-bold shadow-lg transition-all hover:scale-105 whitespace-nowrap"
					>
						<Plus size={20} />
						Criar Conhecimento
					</Button>

					<Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
						<DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-2 gap-0">
							<DialogHeader className="p-6 bg-muted/5 border-b">
								<DialogTitle className="text-2xl font-extrabold text-primary">
									Novo Conhecimento
								</DialogTitle>
								<DialogDescription>
									Compartilhe seus saberes com a comunidade PessoaConhecimentos.
								</DialogDescription>
							</DialogHeader>
							<div className="p-6">
								<ConhecimentoForm
									onSubmit={handleCreateConhecimento}
									onCancel={() => setIsCreateModalOpen(false)}
									buttonText={
										createMutation.isPending
											? "Publicando..."
											: "Publicar Conhecimento"
									}
									isSubmitting={createMutation.isPending}
								/>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
					<ConhecimentoFilters searchParams={searchParams} />

					<div className="flex flex-col gap-6">
						<div className="flex justify-between items-center px-2">
							<span className="text-sm text-muted-foreground font-medium italic">
								{isLoading
									? "Buscando conhecimentos..."
									: `Mostrando ${conhecimentos.length} conhecimentos encontrados`}
							</span>
						</div>

						{isLoading ? (
							<div className="flex flex-col items-center justify-center py-20">
								<Loader2 size={48} className="text-primary animate-spin mb-4" />
								<p className="text-muted-foreground font-bold">
									Carregando saberes...
								</p>
							</div>
						) : error ? (
							<div className="flex flex-col items-center justify-center py-20 text-center bg-destructive/5 rounded-3xl border-2 border-dashed border-destructive/20">
								<h3 className="text-xl font-bold text-destructive">
									Erro ao carregar dados
								</h3>
								<p className="text-muted-foreground max-w-xs mt-1">
									Não foi possível conectar ao servidor. Verifique se the
									backend está rodando localmente.
								</p>
							</div>
						) : conhecimentos.length > 0 ? (
							<motion.div
								variants={{
									hidden: { opacity: 0 },
									show: {
										opacity: 1,
										transition: { staggerChildren: 0.1 },
									},
								}}
								initial="hidden"
								animate="show"
								className="grid grid-cols-1 md:grid-cols-2 gap-6"
							>
								{conhecimentos.map((item) => (
									<motion.div
										key={item.id}
										variants={{
											hidden: { opacity: 0, y: 20 },
											show: { opacity: 1, y: 0 },
										}}
									>
										<ConhecimentoCard item={item} />
									</motion.div>
								))}
							</motion.div>
						) : (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="flex flex-col items-center justify-center py-20 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-secondary/20"
							>
								<BookOpen
									size={48}
									className="text-muted-foreground mb-4 opacity-20"
								/>
								<h3 className="text-xl font-bold text-primary">
									Nenhum resultado encontrado
								</h3>
								<p className="text-muted-foreground max-w-xs mt-1">
									Tente ajustar seus filtros ou termos de busca para encontrar o
									que procura.
								</p>
							</motion.div>
						)}

						{!isLoading && meta.totalPages > 1 && (
							<div className="mt-8 flex items-center justify-end space-x-2">
								<Button
									variant="outline"
									size="sm"
									disabled={currentPage <= 1}
									onClick={(e) => {
										e.preventDefault();
										navigate({
											search: (prev) => ({ ...prev, page: currentPage - 1 }),
										});
									}}
									className="font-bold border-2"
								>
									Anterior
								</Button>

								<div className="text-xs font-bold text-muted-foreground uppercase px-2">
									Página {currentPage} de {meta.totalPages}
								</div>

								<Button
									variant="outline"
									size="sm"
									disabled={currentPage >= meta.totalPages}
									onClick={(e) => {
										e.preventDefault();
										navigate({
											search: (prev) => ({ ...prev, page: currentPage + 1 }),
										});
									}}
									className="font-bold border-2"
								>
									Próximo
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

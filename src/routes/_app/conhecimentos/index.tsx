import { createFileRoute } from "@tanstack/react-router";
import {
	BookOpen,
	Plus,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "#/components/ui/pagination";
import { ConhecimentoCard, type Conhecimento } from "./-components/ConhecimentoCard";
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

const MOCK_CONHECIMENTOS: Conhecimento[] = [
	{
		id: "1",
		titulo: "Lógica de Programação com Python",
		descricao:
			"Aprenda os fundamentos da programação do zero usando a linguagem Python. Variáveis, loops e funções.",
		categoria: "TECNOLOGIA",
		nivel: "BASICO",
		pessoa: {
			id: "p1",
			nome: "Lucas Silva",
			email: "lucas@teste.com",
			telefone: "(11) 99999-9999",
		},
		criadoEm: "2024-03-01T10:00:00Z",
	},
	{
		id: "2",
		titulo: "Violão Clássico: Nível Médio",
		descricao:
			"Técnicas avançadas de dedilhado e leitura de partitura para violão erudito.",
		categoria: "MUSICA",
		nivel: "INTERMEDIARIO",
		pessoa: {
			id: "p2",
			nome: "Ana Costa",
			email: "ana@musica.com",
			telefone: "(21) 88888-8888",
		},
		criadoEm: "2024-03-02T15:30:00Z",
	},
	{
		id: "3",
		titulo: "Inglês para Negócios",
		descricao:
			"Prepare-se para reuniões, apresentações e negociações em ambiente corporativo internacional.",
		categoria: "IDIOMAS",
		nivel: "AVANCADO",
		pessoa: {
			id: "p3",
			nome: "John Doe",
			email: "john@english.com",
			telefone: "(11) 77777-7777",
		},
		criadoEm: "2024-03-03T09:00:00Z",
	},
	{
		id: "4",
		titulo: "Pintura em Aquarela",
		descricao:
			"Workshop prático de técnicas de transparência e mistura de cores com aquarela.",
		categoria: "ARTES",
		nivel: "BASICO",
		pessoa: {
			id: "p4",
			nome: "Maria Arte",
			email: "maria@artes.com",
			telefone: "(31) 66666-6666",
		},
		criadoEm: "2024-03-04T14:00:00Z",
	},
	{
		id: "5",
		titulo: "Matemática para Concursos",
		descricao:
			"Resolução de problemas de lógica e álgebra focados nos principais editais do país.",
		categoria: "EDUCACAO",
		nivel: "INTERMEDIARIO",
		pessoa: {
			id: "p5",
			nome: "Professor Carlos",
			email: "carlos@edu.com",
			telefone: "(41) 55555-5555",
		},
		criadoEm: "2024-03-05T11:00:00Z",
	},
];

export const Route = createFileRoute("/_app/conhecimentos/")({
	validateSearch: (search) => conhecimentosSearchSchema.parse(search),
	component: ConhecimentosPage,
});

function ConhecimentosPage() {
	const searchParams = Route.useSearch();
	const navigate = Route.useNavigate();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const filteredData = useMemo(() => {
		return MOCK_CONHECIMENTOS.filter((item) => {
			const matchesSearch =
				!searchParams.busca ||
				item.titulo.toLowerCase().includes(searchParams.busca.toLowerCase()) ||
				item.descricao.toLowerCase().includes(searchParams.busca.toLowerCase());

			const matchesCategory =
				searchParams.categoria === "TODOS" ||
				item.categoria === searchParams.categoria;
			const matchesLevel =
				searchParams.nivel === "TODOS" || item.nivel === searchParams.nivel;

			return matchesSearch && matchesCategory && matchesLevel;
		});
	}, [searchParams]);

	const handleCreateConhecimento = async (values: ConhecimentoValues) => {
		console.log("Novo conhecimento via modal:", values);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsCreateModalOpen(false);
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
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

					<Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
						<DialogTrigger asChild>
							<Button className="flex items-center gap-2 px-6 py-6 rounded-xl font-bold shadow-lg transition-all hover:scale-105 whitespace-nowrap">
								<Plus size={20} />
								Criar Conhecimento
							</Button>
						</DialogTrigger>
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
									buttonText="Publicar Conhecimento"
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
								Mostrando {filteredData.length} conhecimentos encontrados
							</span>
						</div>

						{filteredData.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{filteredData.map((item) => (
									<ConhecimentoCard key={item.id} item={item} />
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-20 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-secondary/20">
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
							</div>
						)}

						{filteredData.length > 0 && (
							<div className="mt-8">
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious
												disabled={searchParams.page === 1}
												onClick={() =>
													navigate({
														search: (prev) => ({
															...prev,
															page: Math.max(1, (prev.page ?? 1) - 1),
														}),
													})
												}
												className="cursor-pointer"
											/>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink isActive>
												{searchParams.page}
											</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationNext
												onClick={() =>
													navigate({
														search: (prev) => ({
															...prev,
															page: (prev.page ?? 1) + 1,
														}),
													})
												}
												className="cursor-pointer"
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

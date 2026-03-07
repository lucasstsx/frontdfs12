import {
	createFileRoute,
} from "@tanstack/react-router";
import { BookOpen, Plus } from "lucide-react";
import { useCallback, useState } from "react";
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
import { MeusConhecimentosTable } from "./-components/meus-table";

// Mock de dados do usuário logado
const MEUS_CONHECIMENTOS = [
	{
		id: "1",
		titulo: "Lógica de Programação com Python",
		descricao:
			"Aprenda os fundamentos da programação do zero usando a linguagem Python. Variáveis, loops e funções.",
		categoria: "TECNOLOGIA",
		nivel: "BASICO",
		criadoEm: "2024-03-01T10:00:00Z",
	},
];

type Conhecimento = (typeof MEUS_CONHECIMENTOS)[0];

const searchSchema = z.object({
	titulo: z.string().optional().default(""),
});

export const Route = createFileRoute("/_app/conhecimentos/meus")({
	validateSearch: (search) => searchSchema.parse(search),
	component: MeusConhecimentosPage,
});

function MeusConhecimentosPage() {
	const navigate = Route.useNavigate();
	const { titulo } = Route.useSearch();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editingConhecimento, setEditingConhecimento] =
		useState<Conhecimento | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleCreate = useCallback(async (values: ConhecimentoValues) => {
		console.log("Criando:", values);
		await new Promise((r) => setTimeout(r, 1000));
		setIsCreateModalOpen(false);
	}, []);

	const handleEdit = useCallback(
		async (values: ConhecimentoValues) => {
			console.log("Editando:", editingConhecimento?.id, values);
			await new Promise((r) => setTimeout(r, 1000));
			setEditingConhecimento(null);
		},
		[editingConhecimento],
	);

	const handleDelete = useCallback(async () => {
		console.log("Excluindo:", deletingId);
		await new Promise((r) => setTimeout(r, 1000));
		setDeletingId(null);
	}, [deletingId]);

	const handleSearchChange = (value: string) => {
		navigate({
			search: (prev) => ({ ...prev, titulo: value }),
			replace: true,
		});
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-5xl">
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
									buttonText="Publicar"
								/>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				{MEUS_CONHECIMENTOS.length > 0 ? (
					<MeusConhecimentosTable
						data={MEUS_CONHECIMENTOS}
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
		</div>
	);
}

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Clock, Loader2, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
	adminConhecimentosSummaryQueryOptions,
	adminUsuariosSummaryQueryOptions,
} from "#/lib/query-options";

export const Route = createFileRoute("/_app/admin/")({
	loader: ({ context }) =>
		// Precarrega os dois blocos do dashboard para evitar loading em cascata.
		Promise.all([
			context.queryClient.ensureQueryData(adminUsuariosSummaryQueryOptions()),
			context.queryClient.ensureQueryData(
				adminConhecimentosSummaryQueryOptions(),
			),
		]),
	component: AdminDashboard,
});

function AdminDashboard() {
	const { data: usersResponse, isLoading: loadingUsers } = useQuery({
		...adminUsuariosSummaryQueryOptions(),
	});

	const usuarios = usersResponse?.data || [];
	const totalUsuarios = usersResponse?.meta?.total ?? usuarios.length;

	const { data: response, isLoading: loadingConhecimentos } = useQuery({
		...adminConhecimentosSummaryQueryOptions(),
	});

	const conhecimentos = response?.data || [];
	const totalConhecimentos = response?.meta?.total ?? conhecimentos.length;

	if (loadingUsers || loadingConhecimentos) {
		return (
			<div className="flex flex-col items-center justify-center h-full gap-4">
				<Loader2 size={40} className="text-primary animate-spin" />
				<p className="text-muted-foreground font-bold italic">
					Carregando estatísticas...
				</p>
			</div>
		);
	}

	const stats = [
		// Cards combinam totais vindos da API com derivacoes locais simples.
		{
			title: "Total de Usuários",
			value: totalUsuarios,
			icon: <Users className="text-blue-500" />,
			description: "Usuários cadastrados na plataforma",
			color: "bg-blue-500/10 border-blue-500/20",
		},
		{
			title: "Total de Conhecimentos",
			value: totalConhecimentos,
			icon: <BookOpen className="text-emerald-500" />,
			description: "Saberes compartilhados",
			color: "bg-emerald-500/10 border-emerald-500/20",
		},
		{
			title: "Média de Saberes",
			value:
				totalUsuarios > 0 ? (totalConhecimentos / totalUsuarios).toFixed(1) : 0,
			icon: <TrendingUp className="text-amber-500" />,
			description: "Saberes por pessoa",
			color: "bg-amber-500/10 border-amber-500/20",
		},
	];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col gap-8"
		>
			<div>
				<h1 className="text-3xl font-extrabold text-primary tracking-tight">
					Dashboard Administrativo
				</h1>
				<p className="text-muted-foreground font-medium mt-1 italic">
					Visão geral da plataforma PessoaConhecimentos.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{stats.map((stat) => (
					<Card
						key={stat.title}
						className={`border-2 shadow-lg transition-transform hover:scale-105 ${stat.color}`}
					>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
								{stat.title}
							</CardTitle>
							<div className="p-2 bg-white rounded-lg shadow-sm">
								{stat.icon}
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-black text-primary mb-1">
								{stat.value}
							</div>
							<p className="text-xs text-muted-foreground font-bold">
								{stat.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6">
				<Card className="border-2 shadow-xl">
					<CardHeader className="border-b bg-muted/5">
						<CardTitle className="text-lg flex items-center gap-2">
							<Clock size={20} className="text-primary" />
							Atividades Recentes
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="divide-y">
							{conhecimentos.map((item) => (
								<div
									key={item.id}
									className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
								>
									<div className="flex items-center gap-4">
										<div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold">
											{item.titulo[0].toUpperCase()}
										</div>
										<div>
											<p className="font-bold text-primary text-sm">
												{item.titulo}
											</p>
											<p className="text-xs text-muted-foreground font-medium">
												Criado por{" "}
												<span className="text-foreground font-bold">
													{item.pessoa?.nome || "Membro"}
												</span>
											</p>
										</div>
									</div>
									<div className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md">
										{new Date(item.criadoEm).toLocaleDateString("pt-BR")}
									</div>
								</div>
							))}
							{conhecimentos.length === 0 && (
								<div className="p-12 text-center text-muted-foreground italic">
									Nenhuma atividade recente registrada.
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}

import { Calendar, Mail, Phone, User } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { cn } from "#/lib/utils";

export interface Conhecimento {
	id: string;
	titulo: string;
	descricao: string;
	categoria: "MUSICA" | "TECNOLOGIA" | "EDUCACAO" | "ARTES" | "IDIOMAS" | "OUTROS";
	nivel: "BASICO" | "INTERMEDIARIO" | "AVANCADO";
	pessoa: {
		id: string;
		nome: string;
		email: string;
		telefone: string;
	};
	criadoEm: string;
}

interface ConhecimentoCardProps {
	item: Conhecimento;
}

export function ConhecimentoCard({ item }: ConhecimentoCardProps) {
	return (
		<Card className="group overflow-hidden border-2 border-secondary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1 bg-card flex flex-col">
			<CardHeader className="pb-3">
				<div className="flex justify-between items-start mb-2">
					<Badge
						variant="secondary"
						className="bg-secondary/30 text-primary font-bold"
					>
						{item.categoria}
					</Badge>
					<Badge
						variant={item.nivel === "AVANCADO" ? "destructive" : "default"}
						className={cn(
							"font-bold uppercase tracking-wider",
							item.nivel === "BASICO" && "bg-emerald-500 hover:bg-emerald-600",
							item.nivel === "INTERMEDIARIO" && "bg-amber-500 hover:bg-amber-600",
						)}
					>
						{item.nivel}
					</Badge>
				</div>
				<CardTitle className="text-xl font-extrabold text-primary group-hover:text-accent transition-colors line-clamp-1">
					{item.titulo}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-5 flex-1">
				<p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
					{item.descricao}
				</p>

				<div className="flex flex-col gap-5 mt-auto">
					<div className="pt-4 border-t border-secondary/10 flex flex-col gap-3">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<User size={14} className="text-primary" />
							<span className="font-bold text-foreground">
								{item.pessoa.nome}
							</span>
						</div>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<Calendar size={14} />
							Publicado em: {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
						</div>
					</div>

					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full font-bold uppercase tracking-wider group-hover:scale-105 transition-transform shadow-md">
								Saber Mais
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-2 gap-0">
							<DialogHeader className="p-6 pr-12 bg-muted/5 border-b">
								<div className="flex justify-between items-start mb-2">
									<Badge
										variant="secondary"
										className="bg-secondary/30 text-primary font-bold"
									>
										{item.categoria}
									</Badge>
									<Badge
										variant={item.nivel === "AVANCADO" ? "destructive" : "default"}
										className={cn(
											"font-bold uppercase tracking-wider",
											item.nivel === "BASICO" && "bg-emerald-500",
											item.nivel === "INTERMEDIARIO" && "bg-amber-500",
										)}
									>
										{item.nivel}
									</Badge>
								</div>
								<DialogTitle className="text-2xl font-extrabold text-primary">
									{item.titulo}
								</DialogTitle>
								<DialogDescription className="flex items-center gap-2 mt-1 font-medium">
									<User size={14} className="text-primary" />
									Oferecido por:{" "}
									<span className="text-foreground font-bold">
										{item.pessoa.nome}
									</span>
								</DialogDescription>
							</DialogHeader>
							<div className="p-6 space-y-6">
								<div className="space-y-2">
									<h4 className="text-sm font-bold text-primary uppercase tracking-wider">
										Sobre este Conhecimento
									</h4>
									<p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4 py-1 bg-muted/10 rounded-r-lg">
										{item.descricao}
									</p>
								</div>

								<div className="space-y-3 pt-4 border-t border-dashed">
									<h4 className="text-sm font-bold text-primary uppercase tracking-wider">
										Informações de Contato
									</h4>
									<div className="grid grid-cols-1 gap-3">
										<div className="flex items-center gap-3 p-3 bg-white! border-2 rounded-xl group/contact hover:border-primary/50 transition-colors">
											<div className="p-2 bg-primary/10 rounded-lg text-primary group-hover/contact:bg-primary group-hover/contact:text-white transition-all">
												<Mail size={18} />
											</div>
											<div className="flex flex-col">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">
													E-mail
												</span>
												<span className="font-bold text-primary">
													{item.pessoa.email}
												</span>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 bg-white! border-2 rounded-xl group/contact hover:border-primary/50 transition-colors">
											<div className="p-2 bg-primary/10 rounded-lg text-primary group-hover/contact:bg-primary group-hover/contact:text-white transition-all">
												<Phone size={18} />
											</div>
											<div className="flex flex-col">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">
													Telefone
												</span>
												<span className="font-bold text-primary">
													{item.pessoa.telefone}
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="pt-2">
									<p className="text-[10px] text-center text-muted-foreground italic">
										Publicado em {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
									</p>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardContent>
		</Card>
	);
}

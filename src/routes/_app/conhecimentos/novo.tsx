import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";

const novoConhecimentoSchema = z.object({
	titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
	descricao: z
		.string()
		.min(20, "A descrição deve ter pelo menos 20 caracteres"),
	categoria: z.enum([
		"MUSICA",
		"TECNOLOGIA",
		"EDUCACAO",
		"ARTES",
		"IDIOMAS",
		"OUTROS",
	]),
	nivel: z.enum(["BASICO", "INTERMEDIARIO", "AVANCADO"]),
});

export const Route = createFileRoute("/_app/conhecimentos/novo")({
	component: NovoConhecimentoPage,
});

function NovoConhecimentoPage() {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		defaultValues: {
			titulo: "",
			descricao: "",
			categoria: "TECNOLOGIA" as z.infer<typeof novoConhecimentoSchema>["categoria"],
			nivel: "BASICO" as z.infer<typeof novoConhecimentoSchema>["nivel"],
		},
		validators: {
			onChange: novoConhecimentoSchema,
		},
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			try {
				console.log("Criando conhecimento:", value);
				await new Promise((resolve) => setTimeout(resolve, 1500));
				navigate({ to: "/conhecimentos" });
			} catch (error) {
				console.error("Erro ao criar:", error);
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	return (
		<div className="container mx-auto px-4 py-10 max-w-2xl">
			<Button
				variant="ghost"
				className="mb-6 gap-2 text-muted-foreground hover:text-primary"
				onClick={() => navigate({ to: "/conhecimentos" })}
			>
				<ArrowLeft size={18} />
				Voltar para listagem
			</Button>

			<Card className="border-2 shadow-xl bg-card gap-0">
				<CardHeader className="text-center pb-8 border-b border-secondary/10 bg-muted/5">
					<CardTitle className="text-3xl font-extrabold text-primary">
						Partilhe seu Conhecimento
					</CardTitle>
					<CardDescription className="text-lg">
						Preencha os detalhes abaixo para que outros possam aprender com
						você.
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-8">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldGroup className="gap-8">
							<form.Field name="titulo">
								{(field) => (
									<Field>
										<FieldLabel
											htmlFor={field.name}
											className="text-primary font-bold"
										>
											Título do Conhecimento
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Ex: Violão para Iniciantes"
											className="bg-white! py-6 text-lg"
										/>
										<FieldError errors={field.state.meta.errors} />
									</Field>
								)}
							</form.Field>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.Field name="categoria">
									{(field) => (
										<Field>
											<FieldLabel
												htmlFor={field.name}
												className="text-primary font-bold"
											>
												Categoria
											</FieldLabel>
											<Select
												value={field.state.value}
												onValueChange={(val) =>
													field.handleChange(
														val as z.infer<typeof novoConhecimentoSchema>["categoria"],
													)
												}
											>
												<SelectTrigger
													id={field.name}
													className="bg-white! py-6"
												>
													<SelectValue placeholder="Selecione..." />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="MUSICA">Música</SelectItem>
													<SelectItem value="TECNOLOGIA">Tecnologia</SelectItem>
													<SelectItem value="EDUCACAO">Educação</SelectItem>
													<SelectItem value="ARTES">Artes</SelectItem>
													<SelectItem value="IDIOMAS">Idiomas</SelectItem>
													<SelectItem value="OUTROS">Outros</SelectItem>
												</SelectContent>
											</Select>
											<FieldError errors={field.state.meta.errors} />
										</Field>
									)}
								</form.Field>

								<form.Field name="nivel">
									{(field) => (
										<Field>
											<FieldLabel
												htmlFor={field.name}
												className="text-primary font-bold"
											>
												Nível de Dificuldade
											</FieldLabel>
											<Select
												value={field.state.value}
												onValueChange={(val) =>
													field.handleChange(
														val as z.infer<typeof novoConhecimentoSchema>["nivel"],
													)
												}
											>
												<SelectTrigger
													id={field.name}
													className="bg-white! py-6"
												>
													<SelectValue placeholder="Selecione..." />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="BASICO">Básico</SelectItem>
													<SelectItem value="INTERMEDIARIO">
														Intermediário
													</SelectItem>
													<SelectItem value="AVANCADO">Avançado</SelectItem>
												</SelectContent>
											</Select>
											<FieldError errors={field.state.meta.errors} />
										</Field>
									)}
								</form.Field>
							</div>

							<form.Field name="descricao">
								{(field) => (
									<Field>
										<FieldLabel
											htmlFor={field.name}
											className="text-primary font-bold"
										>
											Descrição Detalhada
										</FieldLabel>
										<textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Explique o que o aluno irá aprender, pré-requisitos e formato das aulas..."
											className="flex min-h-[150px] w-full rounded-md border border-input bg-white! px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										/>
										<FieldError errors={field.state.meta.errors} />
									</Field>
								)}
							</form.Field>

							<Button
								type="submit"
								size="lg"
								className="w-full font-bold py-8 text-xl shadow-lg hover:scale-[1.02] transition-all"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-6 w-6 animate-spin" />
										Salvando...
									</>
								) : (
									<>
										<Save className="mr-2 h-6 w-6" />
										Publicar Conhecimento
									</>
								)}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

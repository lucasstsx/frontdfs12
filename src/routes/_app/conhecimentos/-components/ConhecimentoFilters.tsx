import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Filter, Search } from "lucide-react";
import type { z } from "zod";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import type { conhecimentosSearchSchema } from "../index";

interface ConhecimentoFiltersProps {
	searchParams: z.infer<typeof conhecimentosSearchSchema>;
}

export function ConhecimentoFilters({
	searchParams,
}: ConhecimentoFiltersProps) {
	const navigate = useNavigate({ from: "/conhecimentos/" });

	const form = useForm({
		defaultValues: {
			busca: searchParams.busca ?? "",
			categoria: searchParams.categoria ?? "TODOS",
			nivel: searchParams.nivel ?? "TODOS",
		},
		onSubmit: async ({ value }) => {
			navigate({
				search: {
					...searchParams,
					...value,
					page: 1,
				},
			});
		},
	});

	return (
		<aside className="flex flex-col gap-6">
			<Card className="border-2 shadow-sm sticky top-24">
				<CardHeader className="pb-4">
					<CardTitle className="text-lg flex items-center gap-2">
						<Filter size={18} className="text-primary" />
						Filtros
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldGroup className="gap-6">
							<form.Field name="busca">
								{(field) => (
									<Field>
										<FieldLabel
											htmlFor={field.name}
											className="text-primary font-bold uppercase tracking-wider text-xs"
										>
											Busca
										</FieldLabel>
										<div className="relative">
											<Search
												className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
												size={16}
											/>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Título ou descrição..."
												className="pl-9 bg-white!"
											/>
										</div>
									</Field>
								)}
							</form.Field>

							<form.Field name="categoria">
								{(field) => (
									<Field>
										<FieldLabel
											htmlFor={field.name}
											className="text-primary font-bold uppercase tracking-wider text-xs"
										>
											Categoria
										</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(val) => {
												field.handleChange(
													val as Exclude<
														z.infer<
															typeof conhecimentosSearchSchema
														>["categoria"],
														undefined
													>,
												);
												form.handleSubmit();
											}}
										>
											<SelectTrigger id={field.name} className="bg-white!">
												<SelectValue placeholder="Todas as Categorias" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="TODOS">
													Todas as Categorias
												</SelectItem>
												<SelectItem value="MUSICA">Música</SelectItem>
												<SelectItem value="TECNOLOGIA">Tecnologia</SelectItem>
												<SelectItem value="EDUCACAO">Educação</SelectItem>
												<SelectItem value="ARTES">Artes</SelectItem>
												<SelectItem value="IDIOMAS">Idiomas</SelectItem>
												<SelectItem value="OUTROS">Outros</SelectItem>
											</SelectContent>
										</Select>
									</Field>
								)}
							</form.Field>

							<form.Field name="nivel">
								{(field) => (
									<Field>
										<FieldLabel
											htmlFor={field.name}
											className="text-primary font-bold uppercase tracking-wider text-xs"
										>
											Nível
										</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(val) => {
												field.handleChange(
													val as Exclude<
														z.infer<typeof conhecimentosSearchSchema>["nivel"],
														undefined
													>,
												);
												form.handleSubmit();
											}}
										>
											<SelectTrigger id={field.name} className="bg-white!">
												<SelectValue placeholder="Todos os Níveis" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="TODOS">Todos os Níveis</SelectItem>
												<SelectItem value="BASICO">Básico</SelectItem>
												<SelectItem value="INTERMEDIARIO">
													Intermediário
												</SelectItem>
												<SelectItem value="AVANCADO">Avançado</SelectItem>
											</SelectContent>
										</Select>
									</Field>
								)}
							</form.Field>

							<div className="flex flex-col gap-2">
								<Button type="submit" className="w-full font-bold">
									Aplicar Filtros
								</Button>
								<Button
									type="button"
									variant="destructive"
									className="w-full"
									onClick={() => {
										form.reset();
										navigate({
											search: {
												busca: "",
												categoria: "TODOS",
												nivel: "TODOS",
												page: 1,
											},
										});
									}}
								>
									Limpar Tudo
								</Button>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</aside>
	);
}

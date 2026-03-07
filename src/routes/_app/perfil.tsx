import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Mail, Phone, Save, User } from "lucide-react";
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
import { Separator } from "#/components/ui/separator";

const profileSchema = z.object({
	nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("E-mail inválido"),
	telefone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos"),
	bio: z.string().max(160, "A bio deve ter no máximo 160 caracteres").catch(""),
});

export const Route = createFileRoute("/_app/perfil")({
	component: UserProfilePage,
});

function UserProfilePage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		defaultValues: {
			nome: "Usuário Teste",
			email: "usuario@teste.com.br",
			telefone: "(11) 99999-9999",
			bio: "Entusiasta de tecnologia e compartilhamento de conhecimentos.",
		},
		validators: {
			onChange: profileSchema,
		},
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			try {
				console.log("Perfil atualizado:", value);
				await new Promise((resolve) => setTimeout(resolve, 1500));
				alert("Perfil atualizado com sucesso!");
			} catch (error) {
				console.error("Erro ao atualizar perfil:", error);
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	return (
		<div className="container mx-auto px-4 py-8 max-w-3xl">
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-2 text-center md:text-left">
					<h1 className="text-4xl font-extrabold text-primary tracking-tight">
						Meu Perfil
					</h1>
					<p className="text-muted-foreground text-lg italic">
						Gerencie suas informações pessoais e como você aparece para a
						comunidade.
					</p>
				</div>

				<Card className="border-2 shadow-sm overflow-hidden gap-0">
					<CardHeader className=" border-b pb-6">
						<div className="flex flex-col gap-1 text-center md:text-left">
							<CardTitle className="text-2xl font-bold text-primary">
								Configurações da Conta
							</CardTitle>
							<CardDescription className="text-base">
								Membro desde Março de 2024
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="p-6 md:p-8">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
							className="space-y-6"
						>
							<FieldGroup className="gap-6">
								<form.Field name="nome">
									{(field) => (
										<Field>
											<div className="flex items-center gap-2 mb-2">
												<User size={18} className="text-primary" />
												<FieldLabel
													htmlFor={field.name}
													className="font-bold text-primary"
												>
													Nome Completo
												</FieldLabel>
											</div>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="h-12 border-2   bg-white!"
												placeholder="Como você quer ser chamado?"
											/>
											{field.state.meta.errors.length > 0 && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)}
								</form.Field>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<form.Field name="email">
										{(field) => (
											<Field>
												<div className="flex items-center gap-2 mb-2">
													<Mail size={18} className="text-primary" />
													<FieldLabel
														htmlFor={field.name}
														className="font-bold text-primary"
													>
														E-mail
													</FieldLabel>
												</div>
												<Input
													id={field.name}
													name={field.name}
													type="email"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className="h-12 border-2   bg-white!"
													placeholder="seu@email.com"
												/>
												{field.state.meta.errors.length > 0 && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										)}
									</form.Field>

									<form.Field name="telefone">
										{(field) => (
											<Field>
												<div className="flex items-center gap-2 mb-2">
													<Phone size={18} className="text-primary" />
													<FieldLabel
														htmlFor={field.name}
														className="font-bold text-primary"
													>
														Telefone
													</FieldLabel>
												</div>
												<Input
													id={field.name}
													name={field.name}
													type="tel"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className="h-12 border-2   bg-white!"
													placeholder="(00) 00000-0000"
												/>
												{field.state.meta.errors.length > 0 && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										)}
									</form.Field>
								</div>

								<form.Field name="bio">
									{(field) => (
										<Field>
											<div className="flex items-center gap-2 mb-2">
												<FileText size={18} className="text-primary" />
												<FieldLabel
													htmlFor={field.name}
													className="font-bold text-primary"
												>
													Bio (Descrição)
												</FieldLabel>
											</div>
											<textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="flex min-h-[120px] w-full rounded-md border-2 border-input bg-white! px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2   focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												placeholder="Conte um pouco sobre você..."
											/>
											<div className="flex justify-between mt-1">
												<p className="text-xs text-muted-foreground italic">
													Esta informação será visível para outros usuários.
												</p>
												{field.state.meta.errors.length > 0 && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</div>
										</Field>
									)}
								</form.Field>
							</FieldGroup>

							<Separator className="my-8 bg-primary/10" />

							<div className="flex flex-col sm:flex-row justify-end gap-4">
								<Button
									type="button"
									variant="outline"
									className="font-bold px-8 border-2"
									onClick={() => form.reset()}
								>
									Descartar Alterações
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="font-bold px-8 shadow-lg hover:scale-105 transition-all"
								>
									{isSubmitting ? (
										"Salvando..."
									) : (
										<span className="flex items-center gap-2">
											<Save size={18} />
											Salvar Perfil
										</span>
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

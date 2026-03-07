import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Loader2, Mail, Phone, Save, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
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
import { queryKeys } from "#/lib/query-keys";
import { profileQueryOptions } from "#/lib/query-options";
import { authService } from "#/lib/services/auth.service";

const profileSchema = z.object({
	nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("E-mail inválido"),
	telefone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos"),
	descricao: z
		.string()
		.max(160, "A bio deve ter no máximo 160 caracteres")
		.catch(""),
	novaSenha: z
		.string()
		.min(6, "A nova senha deve ter pelo menos 6 caracteres")
		.catch(""),
});

export const Route = createFileRoute("/_app/perfil")({
	loader: ({ context }) => {
		const user = authService.getUserFromToken();
		if (!user?.id) {
			return null;
		}

		return context.queryClient.ensureQueryData(profileQueryOptions(user.id));
	},
	component: UserProfilePage,
});

function UserProfilePage() {
	const queryClient = useQueryClient();
	const userToken = authService.getUserFromToken();
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	// Busca dados reais do perfil
	const { data: profile, isLoading } = useQuery({
		...profileQueryOptions(userToken?.id || ""),
	});

	const updateMutation = useMutation({
		mutationFn: (
			data: Partial<z.infer<typeof profileSchema>> & { senha?: string },
		) => authService.updateProfile(userToken?.id || "", data),
		onSuccess: () => {
			if (userToken?.id) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.profile.byId(userToken.id),
				});
			}
			setSuccessMessage("Perfil atualizado com sucesso!");
			setTimeout(() => setSuccessMessage(null), 3000);
		},
	});

	const form = useForm({
		defaultValues: {
			nome: profile?.nome ?? "",
			email: profile?.email ?? "",
			telefone: profile?.telefone ?? "",
			descricao: profile?.descricao ?? "",
			novaSenha: "",
		},
		validators: {
			onChange: profileSchema,
		},
		onSubmit: async ({ value }) => {
			const { novaSenha, ...rest } = value;
			const dataToUpdate: Partial<z.infer<typeof profileSchema>> & {
				senha?: string;
			} = { ...rest };

			// Se digitou uma nova senha, envia no formato que a API espera
			if (novaSenha && novaSenha.trim() !== "") {
				dataToUpdate.senha = novaSenha;
			}

			updateMutation.mutate(dataToUpdate);
		},
	});

	useEffect(() => {
		if (!profile) {
			return;
		}

		form.reset({
			nome: profile.nome,
			email: profile.email,
			telefone: profile.telefone,
			descricao: profile.descricao ?? "",
			novaSenha: "",
		});
	}, [form, profile]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="container mx-auto px-4 py-12 max-w-3xl"
		>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-extrabold text-primary tracking-tight">
						Meu Perfil
					</h1>
					<p className="text-muted-foreground text-lg">
						Gerencie suas informações pessoais e como as pessoas veem você.
					</p>
				</div>

				<Card className="border-2 shadow-xl overflow-hidden">
					<CardHeader className="bg-muted/5 border-b border-secondary/10 pb-8 pt-8 px-8">
						<div className="flex flex-col md:flex-row items-center gap-6">
							<div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
								<User size={48} />
							</div>
							<div className="text-center md:text-left flex-1">
								<CardTitle className="text-3xl font-extrabold text-primary">
									{profile?.nome}
								</CardTitle>
								<CardDescription className="text-base font-medium mt-1">
									Membro desde{" "}
									{profile
										? new Date(profile.criadoEm).toLocaleDateString("pt-BR")
										: ""}
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-8">
						{successMessage && (
							<div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-600 font-bold flex items-center gap-3">
								<Save size={20} />
								{successMessage}
							</div>
						)}

						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<FieldGroup className="gap-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<form.Field name="nome">
										{(field) => (
											<Field>
												<FieldLabel className="text-primary font-bold flex items-center gap-2">
													<User size={16} />
													Nome Completo
												</FieldLabel>
												<Input
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className="bg-white! py-6 font-medium"
												/>
												<FieldError errors={field.state.meta.errors} />
											</Field>
										)}
									</form.Field>

									<form.Field name="email">
										{(field) => (
											<Field>
												<FieldLabel className="text-primary font-bold flex items-center gap-2">
													<Mail size={16} />
													E-mail
												</FieldLabel>
												<Input
													type="email"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className="bg-white! py-6 font-medium"
													disabled
												/>
												<FieldError errors={field.state.meta.errors} />
											</Field>
										)}
									</form.Field>
								</div>

								<form.Field name="telefone">
									{(field) => (
										<Field>
											<FieldLabel className="text-primary font-bold flex items-center gap-2">
												<Phone size={16} />
												Telefone
											</FieldLabel>
											<Input
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="bg-white! py-6 font-medium"
											/>
											<FieldError errors={field.state.meta.errors} />
										</Field>
									)}
								</form.Field>

								<form.Field name="descricao">
									{(field) => (
										<Field>
											<FieldLabel className="text-primary font-bold flex items-center gap-2">
												<FileText size={16} />
												Biografia
											</FieldLabel>
											<textarea
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="flex min-h-[120px] w-full rounded-xl border-2 border-input bg-white! px-4 py-3 text-sm font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
												placeholder="Escreva um pouco sobre sua trajetória..."
											/>
											<FieldError errors={field.state.meta.errors} />
										</Field>
									)}
								</form.Field>

								<form.Field name="novaSenha">
									{(field) => (
										<Field>
											<FieldLabel className="text-primary font-bold flex items-center gap-2">
												Alterar Senha
											</FieldLabel>
											<Input
												type="password"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="bg-white! py-6 font-medium"
												placeholder="Deixe em branco para manter a atual..."
											/>
											<FieldError errors={field.state.meta.errors} />
										</Field>
									)}
								</form.Field>

								<div className="pt-4 border-t border-secondary/10">
									<Button
										type="submit"
										className="w-full md:w-auto px-12 py-7 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-all"
										disabled={updateMutation.isPending}
									>
										{updateMutation.isPending ? (
											<span className="flex items-center gap-2">
												<Loader2 size={20} className="animate-spin" />
												Salvando...
											</span>
										) : (
											<span className="flex items-center gap-2">
												<Save size={20} />
												Salvar Perfil
											</span>
										)}
									</Button>
								</div>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}

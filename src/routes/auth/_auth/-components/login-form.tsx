import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
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
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { authService, type LoginResponse } from "#/lib/services/auth.service";
import { cn } from "#/lib/utils";

const loginSchema = z.object({
	email: z.string().email("E-mail inválido"),
	senha: z.string().min(1, "A senha é obrigatória"),
});

type ApiErrorPayload = {
	message?: string;
};

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const navigate = useNavigate();
	const search = useSearch({ from: "/auth/_auth/login" }) as {
		redirect?: string;
		registered?: string;
	};
	const [error, setError] = useState<string | null>(null);
	// Flag vindo do cadastro para mostrar feedback de sucesso no primeiro acesso ao login.
	const showRegisteredSuccess = search.registered === "1";

	const loginMutation = useMutation<
		LoginResponse,
		AxiosError<ApiErrorPayload>,
		z.infer<typeof loginSchema>
	>({
		mutationFn: (credentials) => authService.login(credentials),
		onSuccess: (data) => {
			authService.setToken(data.token);
			const target = search.redirect || "/conhecimentos";
			// Evita redirecionar para URL externa via querystring.
			const safeTarget = target.startsWith("/") ? target : "/conhecimentos";
			navigate({ to: safeTarget });
		},
		onError: (err) => {
			const message =
				err.response?.data?.message || "E-mail ou senha inválidos.";
			setError(message);
		},
	});

	const form = useForm({
		defaultValues: {
			email: "",
			senha: "",
		},
		validators: {
			onChange: loginSchema,
		},
		onSubmit: async ({ value }) => {
			// Limpa feedback antigo para evitar erro "preso" entre tentativas.
			setError(null);
			loginMutation.mutate(value);
		},
	});

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl text-primary font-bold">
						Vamos começar a aprender!
					</CardTitle>
					<CardDescription className="text-primary">
						Acesse nossa comunidade feito por pessoas para pessoas!
					</CardDescription>
				</CardHeader>
				<CardContent>
					{showRegisteredSuccess && (
						<div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
							<CheckCircle2 size={20} />
							<p className="text-sm font-bold">
								Cadastro realizado com sucesso! Agora faca seu login.
							</p>
						</div>
					)}

					{error && (
						<div className="mb-6 p-4 rounded-xl bg-destructive/10 border-2 border-destructive/20 text-destructive flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
							<AlertCircle size={20} />
							<p className="text-sm font-bold">{error}</p>
						</div>
					)}

					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<div className="flex flex-col gap-3">
								<Button
									type="button"
									className="bg-[#587DBD] hover:bg-[#587DBD]/80"
								>
									<svg
										height="20px"
										width="20px"
										id="Layer_1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 382 382"
										xmlSpace="preserve"
										fill="#000000"
										className="mr-2"
									>
										<title>LinkdIn Icone</title>
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g
											id="SVGRepo_tracerCarrier"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<g id="SVGRepo_iconCarrier">
											<path
												style={{
													fill: "#FFFFFF",
												}}
												d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"
											/>
										</g>
									</svg>
									Continue com LinkedIn
								</Button>
								<Button
									type="button"
									className="bg-[#55B8FF] hover:bg-[#55B8FF]/80"
								>
									<svg
										viewBox="-3 0 262 262"
										xmlns="http://www.w3.org/2000/svg"
										preserveAspectRatio="xMidYMid"
										fill="#000000"
										height="20px"
										width="20px"
										className="mr-2"
									>
										<title>Google Icon</title>
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g
											id="SVGRepo_tracerCarrier"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<g id="SVGRepo_iconCarrier">
											<path
												d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
												fill="#4285F4"
											/>
											<path
												d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
												fill="#34A853"
											/>
											<path
												d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
												fill="#FBBC05"
											/>
											<path
												d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
												fill="#EB4335"
											/>
										</g>
									</svg>
									Continue com Google
								</Button>
							</div>

							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card *:data-[slot=field-separator-line]:bg-secondary">
								<span className="text-secondary">Ou continue com</span>
							</FieldSeparator>

							<form.Field name="email">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel
												htmlFor={field.name}
												className="text-primary font-bold"
											>
												Email
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="email"
												placeholder="Seu email"
												className="placeholder:text-secondary bg-white!"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<form.Field name="senha">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<div className="flex items-center">
												<FieldLabel
													htmlFor={field.name}
													className="text-primary font-bold"
												>
													Senha
												</FieldLabel>
												<button
													type="button"
													className="ml-auto text-sm underline-offset-4 hover:underline text-primary bg-transparent border-none p-0 h-auto font-normal cursor-pointer"
												>
													Esqueceu a senha?
												</button>
											</div>
											<Input
												id={field.name}
												name={field.name}
												type="password"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												className="placeholder:text-secondary bg-white!"
												placeholder="*******"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>

							<Field>
								<Button type="submit" disabled={loginMutation.isPending}>
									{loginMutation.isPending ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Entrando...
										</>
									) : (
										"Login"
									)}
								</Button>
								<FieldDescription className="text-center">
									Não possui uma conta?{" "}
									<Link
										to="/auth/cadastro"
										className="underline font-bold text-primary"
									>
										Cadastre-se
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center text-xs text-muted-foreground">
				Ao clicar em login, você está concordando com nossos{" "}
				<Link to="/" className="underline">
					Termos de Serviço
				</Link>{" "}
				e{" "}
				<Link to="/" className="underline">
					Política de Privacidade
				</Link>
				.
			</FieldDescription>
		</div>
	);
}

import axios from "axios";
import { useState } from "react";
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
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";

export function CadastroForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		try {
			const response = await axios.post("link api", {
				email,
				password,
			});

			const token = response.data.token;

			localStorage.setItem("token", token);

			console.log("Cadastro realizado com sucesso!");
		} catch (error: any) {
			console.error(
				"Cadastro no login:",
				error.response ? error.response.data : error.message,
			);
		}
	}
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="bg-[#DAEEE3]/10">
				<CardHeader className="text-center">
					<CardTitle className="text-xl text-primary">
						Crie seu cadastro!
					</CardTitle>
					<CardDescription className="text-primary">
						É fácil e simples! E no final você terá acesso a nossa comunidade!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<Button
									type="button"
									className="bg-[#587DBD] hover:bg-[#587DBD]/80"
								>
									<svg
										height="200px"
										width="200px"
										id="Layer_1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 382 382"
										xmlSpace="preserve"
										fill="#000000"
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
							</Field>
							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card *:data-[slot=field-separator-line]:bg-secondary">
								<span className="text-secondary">Ou continue com</span>
							</FieldSeparator>
							<Field>
								<FieldLabel htmlFor="email" className="text-primary font-bold">
									Email*
								</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="Seu email"
									className="placeholder:text-secondary"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel
										htmlFor="password"
										className="text-primary font-bold"
									>
										Senha*
									</FieldLabel>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel
										htmlFor="password"
										className="text-primary font-bold"
									>
										Confirme sua senha*
									</FieldLabel>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="Celular" className="text-primary font-bold">
									Número do celular*
								</FieldLabel>
								<Input
									id="email"
									type="telephone"
									placeholder="(XX) XXXXX-XXXX"
									className="placeholder:text-secondary"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="Descrição" className="text-primary font-bold">
									Descrição
								</FieldLabel>
								<Input
									id="email"
									type="description"
									placeholder="Diga-nos sua profissão, o que você está aprendendo agora, fique a vontade!"
									className="placeholder:text-secondary"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</Field>
							<Field>
								<Button type="submit">Cadastrar</Button>
								<FieldDescription className="text-center">
									Já possui uma conta? Faça seu <a href="#">login</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				Ao clicar em login, você está concordando com nossos{" "}
				<a href="#">Termos de Serviço</a> e{" "}
				<a href="#">Política de Privacidade</a>.
			</FieldDescription>
		</div>
	);
}

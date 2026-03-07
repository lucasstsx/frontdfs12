import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { authService } from "#/lib/services/auth.service";
import { LoginForm } from "./-components/login-form";

const loginSearchSchema = z.object({
	redirect: z.string().optional().catch(""),
	// Sinal vindo da tela de cadastro para exibir feedback no login.
	registered: z.string().optional().catch(""),
});

export const Route = createFileRoute("/auth/_auth/login")({
	validateSearch: (search) => loginSearchSchema.parse(search),
	beforeLoad: () => {
		// Se ja existe sessao valida, evita voltar para tela de login.
		if (authService.isAuthenticated()) {
			throw redirect({
				to: "/conhecimentos",
			});
		}
	},
	component: LoginPage,
});

function LoginPage() {
	return <LoginForm />;
}

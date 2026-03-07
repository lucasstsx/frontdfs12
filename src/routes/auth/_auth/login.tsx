import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { LoginForm } from "./-components/login-form";
import { authService } from "#/lib/services/auth.service";

const loginSearchSchema = z.object({
	redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/auth/_auth/login")({
	validateSearch: (search) => loginSearchSchema.parse(search),
	beforeLoad: () => {
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

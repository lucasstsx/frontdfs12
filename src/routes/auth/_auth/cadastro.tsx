import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "#/lib/services/auth.service";

export const Route = createFileRoute("/auth/_auth/cadastro")({
	beforeLoad: () => {
		if (authService.isAuthenticated()) {
			throw redirect({
				to: "/conhecimentos",
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Em breve: Página de Cadastro protegida.</div>;
}

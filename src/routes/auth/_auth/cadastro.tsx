import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "#/lib/services/auth.service";
import { CadastroForm } from "#/components/cadastro-form";


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
	return <CadastroForm></CadastroForm>;
}

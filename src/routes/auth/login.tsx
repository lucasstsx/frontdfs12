import { createFileRoute } from "@tanstack/react-router";
import {
	HeaderActions,
	HeaderContent,
	HeaderLink,
	HeaderLogo,
	HeaderRoot,
} from "../../components/Header";

export const Route = createFileRoute("/auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col min-h-screen">
			<HeaderRoot>
				<HeaderContent>
					<HeaderLogo />

					<HeaderActions>
						<HeaderLink to="/">Voltar para Home</HeaderLink>
					</HeaderActions>
				</HeaderContent>
			</HeaderRoot>

			<main className="flex-1 flex items-center justify-center p-4">
				<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border-4 border-secondary">
					<h1 className="text-3xl font-extrabold text-primary mb-6 text-center">
						Entrar
					</h1>
					<p className="text-center text-muted-foreground">
						Tela de login em construção...
					</p>
				</div>
			</main>
		</div>
	);
}

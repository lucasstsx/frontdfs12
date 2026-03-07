import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "#/components/Footer";
import {
	HeaderActions,
	HeaderContent,
	HeaderLink,
	HeaderLogo,
	HeaderRoot,
} from "#/components/Header";

export const Route = createFileRoute("/auth/_auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="flex flex-col min-h-screen bg-background">
			{/* Header enxuto no fluxo de auth reduz distracoes e foco em login/cadastro. */}
			<HeaderRoot>
				<HeaderContent>
					<HeaderLogo />

					<HeaderActions>
						<HeaderLink to="/">Voltar para Home</HeaderLink>
					</HeaderActions>
				</HeaderContent>
			</HeaderRoot>

			<main className="flex-1 flex items-center justify-center p-4">
				{/* Outlet recebe login/cadastro mantendo mesmo envelope visual. */}
				<div className="w-full h-full sm:p-12 md:p-24 container flex items-center justify-center">
					<Outlet />
				</div>
			</main>
			<Footer></Footer>
		</div>
	);
}

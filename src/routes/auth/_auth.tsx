import { createFileRoute, Outlet } from "@tanstack/react-router";
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
			<HeaderRoot>
				<HeaderContent>
					<HeaderLogo />

					<HeaderActions>
						<HeaderLink to="/">Voltar para Home</HeaderLink>
					</HeaderActions>
				</HeaderContent>
			</HeaderRoot>

			<main className="flex-1 flex items-center justify-center p-4">
				<div className="w-full h-full flex items-center justify-center">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

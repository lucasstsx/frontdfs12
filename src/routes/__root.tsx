import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Header } from "../components/Header";
import "../styles.css";
import { Footer } from "#/components/Footer";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				name: "Pessoas Conhecimentos",
				content:
					"Uma plataforma de compartilhamento de conhecimentos e experiências, onde as pessoas podem se conectar, aprender e crescer juntas.",
			},
			{
				title: "PessoaS2onhecimentos",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	const location = useLocation();
	const isAuthPage = location.pathname.startsWith("/auth");

	return (
		<>
			<div className="flex min-h-screen flex-col bg-background text-foreground">
				{!isAuthPage && <Header />}

				<main className="flex-1">
					<Outlet />
				</main>

				<Footer />
			</div>
			<TanStackRouterDevtools />
		</>
	);
}

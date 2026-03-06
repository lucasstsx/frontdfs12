import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Header } from "../components/Header";
import "../styles.css";
import { Footer } from "#/components/Footer";
import {NotFound} from "#/components/NotFound";

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
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<>
			<div className="min-h-screen flex flex-col bg-(--background) text-(--foreground)">
				<Header />

				<main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
					<Outlet />
				</main>
			</div>
			<Footer>footer</Footer>
			<TanStackRouterDevtools />
		</>
	);
}

import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import "../styles.css";
import { NotFound } from "#/components/NotFound";

const TanStackRouterDevtools = import.meta.env.DEV
	? lazy(() =>
			import("@tanstack/react-router-devtools").then((module) => ({
				default: module.TanStackRouterDevtools,
			})),
		)
	: null;

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [
			{
				name: "Pessoas Conhecimentos",
				content:
					"Uma plataforma de compartilhamento de conhecimentos e experiências, onde as pessoas podem se conectar, aprender e crescer juntas.",
			},
		],
		title: "PessoaS2onhecimentos",
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
	component: RootComponent,
	// Centraliza a 404 da aplicacao em um unico componente customizado.
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<>
			<Outlet />
			{TanStackRouterDevtools ? (
				<Suspense fallback={null}>
					<TanStackRouterDevtools />
				</Suspense>
			) : null}
		</>
	);
}

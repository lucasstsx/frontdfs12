import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type QueryClient } from "@tanstack/react-query";
import "../styles.css";

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
});

function RootComponent() {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}

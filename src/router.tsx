import type { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter(queryClient: QueryClient) {
	const router = createTanStackRouter({
		routeTree,
		context: {
			queryClient,
		},
		// Mantem comportamento de navegacao nativo entre transicoes de rota.
		scrollRestoration: true,
		// Preload por intencao acelera navegacao sem baixar paginas nunca visitadas.
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}

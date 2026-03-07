import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { AUTH_UNAUTHORIZED_EVENT } from "#/lib/api";
import { getRouter } from "./router";

const ReactQueryDevtools = import.meta.env.DEV
	? lazy(() =>
			import("@tanstack/react-query-devtools").then((module) => ({
				default: module.ReactQueryDevtools,
			})),
		)
	: null;

// Configuração do Query Client para o TanStack Query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutos
			gcTime: 1000 * 60 * 60 * 24, // 24 horas
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

const router = getRouter(queryClient);

if (typeof window !== "undefined") {
	window.addEventListener(AUTH_UNAUTHORIZED_EVENT, async () => {
		await router.invalidate();
		await router.navigate({ to: "/auth/login" });
	});
}

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			{ReactQueryDevtools ? (
				<Suspense fallback={null}>
					<ReactQueryDevtools initialIsOpen={false} />
				</Suspense>
			) : null}
		</QueryClientProvider>,
	);
}

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "#/components/Footer";
import { Header } from "#/components/Header";

export const Route = createFileRoute("/_site")({
	component: SiteLayout,
});

function SiteLayout() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			{/* Layout publico reaproveita Header/Footer e troca apenas o miolo por rota. */}
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

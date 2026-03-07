import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { conhecimentosLandingQueryOptions } from "#/lib/query-options";
import { ComoFuncionaSection } from "./-components/ComoFuncionaSection";
import { CTASection } from "./-components/CTASection";
import { HeroSection } from "./-components/HeroSection";

const ScrollVelocityBanner = lazy(() =>
	import("./-components/ScrollVelocityBanner").then((module) => ({
		default: module.ScrollVelocityBanner,
	})),
);
const ConhecimentosCarrosselSection = lazy(() =>
	import("./-components/ConhecimentosCarrosselSection").then((module) => ({
		default: module.ConhecimentosCarrosselSection,
	})),
);

export const Route = createFileRoute("/_site/")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(conhecimentosLandingQueryOptions()),
	component: HomePage,
});

function HomePage() {
	return (
		<>
			<HeroSection />
			<Suspense fallback={null}>
				<ScrollVelocityBanner />
			</Suspense>
			<ComoFuncionaSection />
			<Suspense fallback={null}>
				<ConhecimentosCarrosselSection />
			</Suspense>
			<CTASection />
		</>
	);
}

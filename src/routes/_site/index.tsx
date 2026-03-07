import { createFileRoute } from "@tanstack/react-router";
import { ComoFuncionaSection } from "./-components/ComoFuncionaSection";
import { ConhecimentosCarrosselSection } from "./-components/ConhecimentosCarrosselSection";
import { CTASection } from "./-components/CTASection";
import { HeroSection } from "./-components/HeroSection";
import { ScrollVelocityBanner } from "./-components/ScrollVelocityBanner";

export const Route = createFileRoute("/_site/")({ component: HomePage });

function HomePage() {
	return (
		<>
			<HeroSection />
			<ScrollVelocityBanner />
			<ComoFuncionaSection />
			<ConhecimentosCarrosselSection />
			<CTASection />
		</>
	);
}

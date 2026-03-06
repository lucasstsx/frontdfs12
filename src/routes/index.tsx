import { createFileRoute } from "@tanstack/react-router";
import { ComoFuncionaSection } from "#/components/sections/ComoFuncionaSection";
import { ConhecimentosCarrosselSection } from "#/components/sections/ConhecimentosCarrosselSection";
import { CTASection } from "#/components/sections/CTASection";
import { HeroSection } from "#/components/sections/HeroSection";
import { ScrollVelocityBanner } from "#/components/sections/ScrollVelocityBanner";

export const Route = createFileRoute("/")({ component: HomePage });

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

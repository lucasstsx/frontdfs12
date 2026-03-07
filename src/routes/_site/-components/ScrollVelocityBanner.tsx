import { useEffect, useRef, useState } from "react";
import ScrollVelocity from "#/components/ScrollVelocity";

export function ScrollVelocityBanner() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isInViewport, setIsInViewport] = useState(true);
	const [isPageVisible, setIsPageVisible] = useState(true);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				// Pausa a animacao quando o banner sai da viewport para economizar render.
				setIsInViewport(entry?.isIntersecting ?? false);
			},
			{ threshold: 0.1 },
		);

		observer.observe(container);

		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsPageVisible(document.visibilityState === "visible");
		};

		handleVisibilityChange();
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	const paused = !isInViewport || !isPageVisible;
	// A combinacao viewport + visibilidade evita animacao rodando em aba oculta.

	return (
		<div
			ref={containerRef}
			className="overflow-hidden border-y border-secondary/30 bg-secondary/10 py-4"
		>
			<ScrollVelocity
				texts={[
					"Programação · Culinária · Violão · Idiomas · Fitness · Fotografia",
				]}
				velocity={60}
				paused={paused}
				className="font-semibold text-primary/70"
			/>
			<ScrollVelocity
				texts={[
					"Design · Meditação · Dança · Carpintaria · Marketing · Escrita Criativa",
				]}
				velocity={-60}
				paused={paused}
				className="font-semibold text-primary/70"
			/>
		</div>
	);
}

import ScrollVelocity from "#/components/ScrollVelocity";

export function ScrollVelocityBanner() {
	return (
		<div className="overflow-hidden border-y border-secondary/30 bg-secondary/10 py-4">
			<ScrollVelocity
				texts={[
					"Programação · Culinária · Violão · Idiomas · Fitness · Fotografia",
				]}
				velocity={60}
				className="font-semibold text-primary/70"
			/>
			<ScrollVelocity
				texts={[
					"Design · Meditação · Dança · Carpintaria · Marketing · Escrita Criativa",
				]}
				velocity={-60}
				className="font-semibold text-primary/70"
			/>
		</div>
	);
}

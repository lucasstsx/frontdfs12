import { useQuery } from "@tanstack/react-query";
import {
	BookOpen,
	ChefHat,
	Code2,
	Languages,
	Loader2,
	Music,
} from "lucide-react";
import { motion } from "motion/react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { CarouselItem } from "#/components/Carousel";
import { conhecimentosLandingQueryOptions } from "#/lib/query-options";
import { SectionWrapper } from "./SectionWrapper";

const Carousel = lazy(() => import("#/components/Carousel"));

const categoryIcons: Record<string, React.ReactNode> = {
	TECNOLOGIA: <Code2 className="h-4 w-4 text-primary" />,
	MUSICA: <Music className="h-4 w-4 text-primary" />,
	IDIOMAS: <Languages className="h-4 w-4 text-primary" />,
	ARTES: <BookOpen className="h-4 w-4 text-primary" />,
	EDUCACAO: <BookOpen className="h-4 w-4 text-primary" />,
	OUTROS: <ChefHat className="h-4 w-4 text-primary" />,
};

export function ConhecimentosCarrosselSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [carouselWidth, setCarouselWidth] = useState(380);

	// Busca conhecimentos reais da API para o carrossel
	const { data: response, isLoading } = useQuery({
		...conhecimentosLandingQueryOptions(),
	});

	const conhecimentos = response?.data || [];

	const carouselItems = useMemo<CarouselItem[]>(() => {
		if (!Array.isArray(conhecimentos) || conhecimentos.length === 0) return [];
		return conhecimentos.slice(0, 6).map((item, index) => ({
			id: Number.parseInt(item.id.slice(0, 8), 16) || index + 1,
			title: item.titulo,
			description: `${item.pessoa?.nome || "Membro"} · ${item.categoria} ~ ${item.descricao}`,
			icon: categoryIcons[item.categoria] || (
				<BookOpen className="h-4 w-4 text-primary" />
			),
		}));
	}, [conhecimentos]);

	useEffect(() => {
		const update = () => {
			if (containerRef.current) {
				setCarouselWidth(containerRef.current.offsetWidth);
			}
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return (
		<SectionWrapper id="ofertas">
			<motion.div
				className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				{/* Left label */}
				<div className="lg:w-1/3">
					<span className="mb-3 inline-block rounded-full bg-secondary/30 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-primary">
						Ofertas da comunidade
					</span>
					<h2 className="mt-2 text-3xl font-extrabold leading-tight text-primary md:text-4xl">
						Conheça os saberes disponíveis na plataforma!
					</h2>
				</div>

				{/* Carousel */}
				<div
					ref={containerRef}
					className="flex-1 min-h-[300px] flex items-center justify-center"
				>
					{isLoading ? (
						<Loader2 size={40} className="text-primary animate-spin" />
					) : carouselItems.length > 0 ? (
						<Suspense
							fallback={
								<Loader2 size={40} className="text-primary animate-spin" />
							}
						>
							<Carousel
								items={carouselItems}
								baseWidth={carouselWidth}
								autoplay
								autoplayDelay={4000}
								pauseOnHover
								loop
							/>
						</Suspense>
					) : (
						<div className="text-center text-muted-foreground italic">
							Novos conhecimentos em breve...
						</div>
					)}
				</div>
			</motion.div>
		</SectionWrapper>
	);
}

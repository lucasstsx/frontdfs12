import {
	BookOpen,
	ChefHat,
	Code2,
	Dumbbell,
	Languages,
	Music,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CarouselItem } from "#/components/Carousel";
import Carousel from "#/components/Carousel";
import { SectionWrapper } from "./SectionWrapper";

const ofertas: CarouselItem[] = [
	{
		id: 1,
		title: "Programação Web",
		description:
			"Bruno Alves · Desenvolvedor Back-end ~ Ensino fundamentos de Node.js, APIs REST e bancos de dados. Ideal para quem quer entrar no mercado de tecnologia.",
		icon: <Code2 className="h-4 w-4 text-primary" />,
	},
	{
		id: 2,
		title: "Culinária Italiana",
		description:
			"Ana Ferreira · Chef de Cozinha ~ Compartilho receitas autênticas e técnicas profissionais. Do básico ao avançado, aprender a cozinhar é para todos.",
		icon: <ChefHat className="h-4 w-4 text-primary" />,
	},
	{
		id: 3,
		title: "Violão & Harmonia",
		description:
			"Carlos Menezes · Professor de Música ~ Aulas de violão do zero ao intermediário, com foco em harmonia prática e leitura de cifras.",
		icon: <Music className="h-4 w-4 text-primary" />,
	},
	{
		id: 4,
		title: "Inglês Conversacional",
		description:
			"Maria Santos · Professora de Idiomas ~ Metodologia imersiva para ganhar fluência. Foco em situações do dia a dia e do mundo profissional.",
		icon: <Languages className="h-4 w-4 text-primary" />,
	},
	{
		id: 5,
		title: "Design de Interfaces",
		description:
			"Pedro Lima · Designer UI/UX ~ Ensino Figma, princípios de design e como criar experiências digitais que encantam os usuários.",
		icon: <BookOpen className="h-4 w-4 text-primary" />,
	},
	{
		id: 6,
		title: "Treino Funcional",
		description:
			"Sofia Costa · Personal Trainer ~ Montagem de treinos personalizados e orientação nutricional básica para quem quer saúde e bem-estar.",
		icon: <Dumbbell className="h-4 w-4 text-primary" />,
	},
];

export function ConhecimentosCarrosselSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [carouselWidth, setCarouselWidth] = useState(380);

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
				<div ref={containerRef} className="flex-1">
					<Carousel
						items={ofertas}
						baseWidth={carouselWidth}
						autoplay
						autoplayDelay={4000}
						pauseOnHover
						loop
					/>
				</div>
			</motion.div>
		</SectionWrapper>
	);
}

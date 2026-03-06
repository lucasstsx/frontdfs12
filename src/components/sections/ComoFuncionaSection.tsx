import type { LucideIcon } from "lucide-react";
import { Handshake, Ship, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { SectionWrapper } from "./SectionWrapper";

const steps: {
	number: string;
	Icon: LucideIcon;
	title: string;
	description: string;
}[] = [
	{
		number: "01",
		Icon: UserPlus,
		title: "Crie a sua conta",
		description:
			"Cadastre seus conhecimentos, não se acanhe, todo mundo tem algo a ensinar!",
	},
	{
		number: "02",
		Icon: Ship,
		title: "Navegue e descubra",
		description:
			"Aventure-se em nossa plataforma e descubra pessoas com os mais diversos conhecimentos!",
	},
	{
		number: "03",
		Icon: Handshake,
		title: "Conecte‑se e cresça",
		description:
			"Agende sessões, troque mensagens e construa relações reais com pessoas que partilham os mesmos objetivos.",
	},
];

export function ComoFuncionaSection() {
	return (
		<SectionWrapper id="como-funciona" className="bg-card">
			<motion.div className="mb-12 text-center" initial={{ opacity: 1, y: 0 }}>
				<span className="mb-3 inline-block rounded-full bg-secondary/30 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-primary">
					Como funciona?
				</span>
				<h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">
					Três passos para começar
				</h2>
			</motion.div>

			<div className="grid gap-8 md:grid-cols-3">
				{steps.map((step) => (
					<motion.div
						key={step.number}
						className="relative flex flex-col items-center rounded-2xl border border-border bg-background p-8 text-center shadow-sm"
						initial={{ opacity: 1, y: 0 }}
					>
						<span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
							{step.number}
						</span>

						<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 text-primary">
							<step.Icon size={24} aria-hidden="true" />
						</div>

						<h3 className="mb-2 text-lg font-bold text-primary">
							{step.title}
						</h3>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{step.description}
						</p>
					</motion.div>
				))}
			</div>
		</SectionWrapper>
	);
}

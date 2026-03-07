import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SectionWrapper } from "./SectionWrapper";

export function CTASection() {
	return (
		<SectionWrapper id="registro" className="bg-primary">
			<motion.div
				className="flex flex-col items-center text-center"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				<h2 className="mb-4 text-3xl font-extrabold text-primary-foreground md:text-4xl">
					Pronto para começar?
				</h2>
				<p className="mb-10 max-w-xl text-lg leading-relaxed text-secondary">
					Junte-se a milhares de pessoas que já estão aprendendo e ensinando. A
					sua primeira troca é gratuita.
				</p>

				<div className="flex flex-col gap-4 sm:flex-row">
					<Link
						to="/auth/cadastro"
						className="rounded-xl bg-accent px-8 py-3.5 font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
					>
						Criar conta gratuita
					</Link>
					<Link
						to="/"
						className="rounded-xl border-2 border-secondary px-8 py-3.5 font-bold text-secondary transition-colors hover:bg-secondary hover:text-primary"
					>
						Saber mais
					</Link>
				</div>
			</motion.div>
		</SectionWrapper>
	);
}

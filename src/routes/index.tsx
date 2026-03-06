import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import RotatingText from "#/components/RotatingText";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<>
			<section className="flex flex-col h--max items-center justify-center overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
				<div className="flex justify-center gap-10">
					<div>
						<motion.h2
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-6 leading-tight max-w-4xl mx-auto text-center"
							initial={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							Aprenda algo novo,
							<div className="flex items-center justify-center space-x-2">
								<span>partilhe</span>
								<RotatingText
									texts={[
										"conhecimentos.",
										"experiências.",
										"comunidade.",
										"aprendizado.",
										"crescimento.",
										"comunicação.",
									]}
									mainClassName="px-2 sm:px-2 md:px-3 bg-destructive text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
									staggerFrom={"last"}
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									exit={{ y: "-120%" }}
									staggerDuration={0.025}
									splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
									transition={{ type: "spring", damping: 30, stiffness: 400 }}
									rotationInterval={3000}
								/>
							</div>
						</motion.h2>
						<motion.p
							animate={{ opacity: 1, y: 0 }}
							className="text-xl text-foreground max-w-2xl mx-auto text-center mb-12 leading-relaxed font-medium"
							initial={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							Uma plataforma de compartilhamento de conhecimentos e
							experiências, onde as pessoas podem se conectar, aprender e
							crescer juntas.
						</motion.p>
					</div>
				</div>
			</section>
			<div className="flex flex-col items-center gap-3 text-center text-sm uppercase tracking-[0.4em] text-primary">
				{/* <span>role para baixo</span> */}
				<i
					className="fa-solid fa-chevron-down text-5xl animate-bounce"
					aria-hidden="true"
				/>
			</div>
		</>
	);
}

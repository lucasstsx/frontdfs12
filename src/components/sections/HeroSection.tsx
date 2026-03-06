import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import RotatingText from "#/components/RotatingText";

export function HeroSection() {
	return (
		<section
			id="inicio"
			className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-4 py-20"
		>
			<motion.h1
				className="mx-auto mb-6 max-w-4xl text-center text-3xl font-extrabold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				Aprenda algo novo,
				<div className="mt-2 flex items-center justify-center space-x-2">
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
						mainClassName="px-2 sm:px-2 md:px-3 bg-destructive text-destructive-foreground overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
						staggerFrom={"last"}
						initial={{ y: "100%", opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: "-120%", opacity: 0 }}
						staggerDuration={0.025}
						splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
						transition={{ type: "spring", damping: 30, stiffness: 400 }}
						rotationInterval={3000}
					/>
				</div>
			</motion.h1>

			<motion.p
				className="mx-auto mb-14 max-w-2xl text-center text-lg font-medium leading-relaxed text-foreground md:text-xl"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				Uma plataforma de compartilhamento de conhecimentos e experiências, onde
				as pessoas podem se conectar, aprender e crescer juntas.
			</motion.p>

			<motion.div
				className="flex flex-col items-center gap-3 text-primary"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				<ChevronDown className="animate-bounce" size={36} aria-hidden="true" />
			</motion.div>
		</section>
	);
}

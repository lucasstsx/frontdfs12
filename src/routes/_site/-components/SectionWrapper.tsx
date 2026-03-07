import type { ReactNode } from "react";

interface SectionWrapperProps {
	id?: string;
	className?: string;
	children: ReactNode;
}

/**
 * Wrapper padrão para todas as sections da landing page.
 * Centraliza o conteúdo e limita a largura para leitura confortável.
 */
export function SectionWrapper({
	id,
	className = "",
	children,
}: SectionWrapperProps) {
	return (
		<section id={id} className={`w-full py-20 md:py-28 ${className}`}>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
		</section>
	);
}

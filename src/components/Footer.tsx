import type { ReactNode } from "react";

interface FooterProps {
	children?: ReactNode;
}

export function Footer({ children }: FooterProps) {
	return (
		<footer className="border-t-8 border-destructive bg-primary px-4 py-6 text-center text-sm text-background">
			{children}
		</footer>
	);
}

import { Link } from "@tanstack/react-router";
import { MenuIcon, X } from "lucide-react";
import { createContext, type ReactNode, useContext, useState } from "react";
import { cn } from "#/lib/utils";
import { Logo } from "./Logo";

// contexto para gerenciar o estado do menu mobile entre os subcomponentes
const HeaderContext = createContext<{
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (open: boolean) => void;
} | null>(null);

function useHeader() {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error("Header components must be used within a HeaderRoot");
	}
	return context;
}

interface HeaderRootProps {
	children: ReactNode;
	className?: string;
}

export function HeaderRoot({ children, className }: HeaderRootProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<HeaderContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
			<nav
				className={cn(
					"sticky top-0 z-50 border-b-4 border-secondary bg-primary text-white shadow-md",
					className,
				)}
			>
				<div className="mx-auto max-w-7xl lg:px-8">{children}</div>
			</nav>
		</HeaderContext.Provider>
	);
}

export function HeaderContent({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex h-20 px-4 sm:px-6 items-center justify-between",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function HeaderLogo() {
	return <Logo />;
}

export function HeaderNav({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("hidden items-center space-x-8 md:flex", className)}>
			{children}
		</div>
	);
}

export function HeaderActions({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("items-center flex space-x-4", className)}>
			{children}
		</div>
	);
}

export function HeaderMobileToggle() {
	const { setIsMobileMenuOpen } = useHeader();
	return (
		<div className="flex items-center md:hidden">
			<button
				type="button"
				onClick={() => setIsMobileMenuOpen(true)}
				className="text-primary-foreground hover:text-secondary"
				aria-label="Abrir menu"
			>
				<MenuIcon className="h-6 w-6" />
				<span className="sr-only">Abrir menu</span>
			</button>
		</div>
	);
}

export function HeaderMobileMenu({ children }: { children: ReactNode }) {
	const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeader();

	if (!isMobileMenuOpen) return null;

	return (
		<div className="flex flex-col space-y-3 border-t border-secondary/20 bg-primary px-4 pt-2 pb-6 text-center shadow-inner md:hidden">
			<div className="flex justify-end mb-2">
				<button
					type="button"
					onClick={() => setIsMobileMenuOpen(false)}
					className="p-2 text-primary-foreground"
				>
					<X className="h-6 w-6" />
					<span className="sr-only">Fechar menu</span>
				</button>
			</div>
			{children}
		</div>
	);
}

// Link simples pra consistência de estilo entre links normais e botões
export function HeaderLink({
	to,
	hash,
	children,
	variant = "link",
	onClick,
	className,
	...props
}: {
	to?: string;
	hash?: string;
	children: ReactNode;
	variant?: "link" | "button";
	onClick?: () => void;
	className?: string;
	[key: string]: unknown;
}) {
	const baseClassName =
		variant === "button"
			? "bg-accent hover:brightness-90 text-white px-6 py-2.5 rounded-lg font-bold transition-transform hover:scale-105 shadow-md inline-block"
			: "text-background hover:text-secondary transition-colors font-medium text-sm lg:text-base";

	const combinedClassName = cn(baseClassName, className);

	return (
		<Link
			to={to}
			hash={hash}
			className={combinedClassName}
			onClick={onClick}
			hashScrollIntoView={true}
			{...props}
		>
			{children}
		</Link>
	);
}

function HeaderInner() {
	const { setIsMobileMenuOpen } = useHeader();

	const handleLinkClick = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<HeaderContent>
				<HeaderLogo />

				<HeaderNav>
					<HeaderLink to="/" hash="inicio">
						Início
					</HeaderLink>
					<HeaderLink to="/" hash="como-funciona">
						Como Funciona
					</HeaderLink>
					<HeaderLink to="/" hash="ofertas">
						Explorar
					</HeaderLink>
					<HeaderLink to="/auth/login" variant="button">
						Entrar
					</HeaderLink>
				</HeaderNav>

				<HeaderMobileToggle />
			</HeaderContent>

			<HeaderMobileMenu>
				<HeaderLink to="/" hash="inicio" onClick={handleLinkClick}>
					Início
				</HeaderLink>
				<HeaderLink to="/" hash="como-funciona" onClick={handleLinkClick}>
					Como Funciona
				</HeaderLink>
				<HeaderLink to="/" hash="ofertas" onClick={handleLinkClick}>
					Explorar
				</HeaderLink>
				<HeaderLink to="/auth/login" variant="button" onClick={handleLinkClick}>
					Entrar
				</HeaderLink>
			</HeaderMobileMenu>
		</>
	);
}

// mantendo o Header original como "Padrão"
export function Header() {
	return (
		<HeaderRoot>
			<HeaderInner />
		</HeaderRoot>
	);
}

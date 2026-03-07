import { Link } from "@tanstack/react-router";
import { MenuIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { cn } from "#/lib/utils";
import { Logo } from "./Logo";

// contexto para gerenciar o estado do menu mobile entre os subcomponentes
const HeaderContext = createContext<{
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (open: boolean) => void;
} | null>(null);

export function useHeader() {
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

	// Bloqueia o scroll quando o menu mobile está aberto
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

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
		<div className={cn("hidden items-center space-x-8 lg:flex", className)}>
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
		<div className="flex items-center lg:hidden">
			<button
				type="button"
				onClick={() => setIsMobileMenuOpen(true)}
				className="text-primary-foreground hover:text-secondary transition-colors"
				aria-label="Abrir menu"
			>
				<MenuIcon className="h-7 w-7" />
				<span className="sr-only">Abrir menu</span>
			</button>
		</div>
	);
}

export function HeaderMobileMenu({ children }: { children: ReactNode }) {
	const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeader();

	return (
		<AnimatePresence>
			{isMobileMenuOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={() => setIsMobileMenuOpen(false)}
						className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
					/>

					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed top-0 right-0 bottom-0 z-[70] flex w-[80%] max-w-sm flex-col border-l-4 border-secondary bg-primary px-6 py-6 shadow-2xl lg:hidden overflow-y-auto"
					>
						<div className="flex justify-end mb-8">
							<button
								type="button"
								onClick={() => setIsMobileMenuOpen(false)}
								className="p-2 text-primary-foreground hover:text-secondary transition-colors bg-white/5 rounded-full"
							>
								<X className="h-6 w-6" />
								<span className="sr-only">Fechar menu</span>
							</button>
						</div>
						<div className="flex flex-col space-y-5 flex-1">{children}</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
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
					<HeaderLink
						to="/auth/login"
						variant="button"
						className="hidden lg:flex"
					>
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

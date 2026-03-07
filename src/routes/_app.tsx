import {
	createFileRoute,
	Outlet,
	redirect,
	useRouter,
} from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { Footer } from "#/components/Footer";
import {
	HeaderActions,
	HeaderContent,
	HeaderLink,
	HeaderLogo,
	HeaderMobileMenu,
	HeaderMobileToggle,
	HeaderNav,
	HeaderRoot,
	useHeader,
} from "#/components/Header";
import {
	authService,
	type UserTokenPayload,
} from "#/lib/services/auth.service";

export const Route = createFileRoute("/_app")({
	beforeLoad: ({ location }) => {
		// Toda area /_app exige sessao valida; sem token redireciona para login com retorno.
		if (!authService.isAuthenticated()) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}

		return {
			user: authService.getUserFromToken(),
		};
	},
	component: AppLayout,
});

function AppHeaderInner({
	user,
	onLogout,
}: {
	user: UserTokenPayload | null;
	onLogout: () => void;
}) {
	const { setIsMobileMenuOpen } = useHeader();

	const handleLinkClick = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<HeaderContent>
				<HeaderLogo />

				<HeaderNav>
					<HeaderLink to="/conhecimentos">Explorar</HeaderLink>
					<HeaderLink to="/conhecimentos/meus">Meus Conhecimentos</HeaderLink>
					{user?.isAdmin && (
						<HeaderLink
							to="/admin"
							className="text-accent font-bold border-b-2 border-accent/0 hover:border-accent/100 transition-all"
						>
							Painel Admin
						</HeaderLink>
					)}
				</HeaderNav>

				<HeaderActions>
					<HeaderLink
						to="/perfil"
						className="hidden lg:flex items-center gap-2 text-white font-extrabold hover:opacity-80 transition-opacity"
					>
						<User size={18} className="text-white" />
						Perfil
					</HeaderLink>
					<button
						type="button"
						onClick={onLogout}
						className="hidden lg:flex items-center gap-2 bg-accent hover:brightness-90 text-white px-4 py-2 rounded-lg font-bold transition-all hover:scale-105 shadow-sm"
					>
						<LogOut size={18} />
						<span>Sair</span>
					</button>
					<HeaderMobileToggle />
				</HeaderActions>
			</HeaderContent>

			<HeaderMobileMenu>
				<HeaderLink to="/conhecimentos" onClick={handleLinkClick}>
					Explorar
				</HeaderLink>
				<HeaderLink to="/conhecimentos/meus" onClick={handleLinkClick}>
					Meus Conhecimentos
				</HeaderLink>
				{user?.isAdmin && (
					<HeaderLink
						to="/admin"
						className="text-accent font-bold"
						onClick={handleLinkClick}
					>
						Painel Admin
					</HeaderLink>
				)}
				<HeaderLink to="/perfil" onClick={handleLinkClick}>
					Meu Perfil
				</HeaderLink>
				<button
					type="button"
					onClick={() => {
						handleLinkClick();
						onLogout();
					}}
					className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-bold mt-4"
				>
					<LogOut size={18} />
					Sair da conta
				</button>
			</HeaderMobileMenu>
		</>
	);
}

function AppLayout() {
	const router = useRouter();
	const { user } = Route.useRouteContext();

	const handleLogout = () => {
		authService.logout();
		// Invalida o contexto de rotas para limpar dados dependentes de autenticacao.
		router.invalidate();
		router.navigate({ to: "/" });
	};

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<HeaderRoot>
				<AppHeaderInner user={user} onLogout={handleLogout} />
			</HeaderRoot>

			<main className="flex-1">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

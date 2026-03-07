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
} from "#/components/Header";

export const Route = createFileRoute("/_app")({
	beforeLoad: ({ location }) => {
		const isAuthenticated = !!localStorage.getItem("token");

		if (!isAuthenticated) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}

		return {
			user: {
				id: "1",
				name: "Usuário Teste",
				role: "user",
			},
		};
	},
	component: AppLayout,
});

function AppLayout() {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.invalidate();
		window.location.href = "/";
	};

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<HeaderRoot>
				<HeaderContent>
					<HeaderLogo />

					<HeaderNav>
						<HeaderLink to="/conhecimentos">Explorar</HeaderLink>
						<HeaderLink to="/conhecimentos/meus">Meus Conhecimentos</HeaderLink>
					</HeaderNav>

					<HeaderActions>
						<HeaderLink
							to="/perfil"
							className="hidden md:flex items-center gap-2 text-white font-extrabold hover:opacity-80 transition-opacity"
						>
							<User size={18} className="text-white" />
							Perfil
						</HeaderLink>
						<button
							type="button"
							onClick={handleLogout}
							className="flex items-center gap-2 bg-accent hover:brightness-90 text-white px-4 py-2 rounded-lg font-bold transition-all hover:scale-105 shadow-sm"
						>
							<LogOut size={18} />
							<span className="hidden sm:inline">Sair</span>
						</button>
						<HeaderMobileToggle />
					</HeaderActions>
				</HeaderContent>

				<HeaderMobileMenu>
					<HeaderLink to="/conhecimentos">Explorar</HeaderLink>
					<HeaderLink to="/conhecimentos/meus">Meus Conhecimentos</HeaderLink>
					<HeaderLink to="/perfil">Meu Perfil</HeaderLink>
					<button
						type="button"
						onClick={handleLogout}
						className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-bold mt-4"
					>
						<LogOut size={18} />
						Sair da conta
					</button>
				</HeaderMobileMenu>
			</HeaderRoot>

			<main className="flex-1">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

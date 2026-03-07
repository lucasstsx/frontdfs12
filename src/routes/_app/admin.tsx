import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { authService } from "#/lib/services/auth.service";
import { 
	LayoutDashboard, 
	Users, 
	BookOpen, 
	ShieldCheck,
	ChevronRight
} from "lucide-react";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/_app/admin")({
	beforeLoad: () => {
		const user = authService.getUserFromToken();
		if (!user?.isAdmin) {
			throw redirect({
				to: "/conhecimentos",
			});
		}
	},
	component: AdminLayout,
});

function AdminLayout() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
				<aside className="flex flex-col gap-2">
					<div className="px-4 py-4 mb-4 bg-primary/5 rounded-2xl border-2 border-primary/10 flex items-center gap-3">
						<div className="p-2 bg-primary rounded-lg text-white">
							<ShieldCheck size={20} />
						</div>
						<div>
							<h2 className="font-bold text-primary text-sm uppercase tracking-tight">Painel Admin</h2>
							<p className="text-[10px] text-muted-foreground font-bold italic">Acesso Restrito</p>
						</div>
					</div>

					<nav className="flex flex-col gap-1">
						<AdminNavLink to="/admin" activeOptions={{ exact: true }}>
							<LayoutDashboard size={18} />
							Dashboard
						</AdminNavLink>
						<AdminNavLink to="/admin/usuarios">
							<Users size={18} />
							Usuários
						</AdminNavLink>
						<AdminNavLink to="/admin/conhecimentos">
							<BookOpen size={18} />
							Conhecimentos
						</AdminNavLink>
					</nav>
				</aside>

				<main className="bg-card min-h-[600px]">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

function AdminNavLink({ 
	to, 
	children, 
	activeOptions 
}: { 
	to: string, 
	children: React.ReactNode,
	activeOptions?: { exact?: boolean }
}) {
	return (
		<Link
			to={to}
			activeOptions={activeOptions}
			className={cn(
				"flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all border-2 border-transparent hover:bg-muted/50 text-muted-foreground",
			)}
			activeProps={{
				className: "bg-primary! text-white! border-primary! shadow-md",
			}}
		>
			<span className="flex items-center gap-3">
				{children}
			</span>
			<ChevronRight size={14} className="opacity-50" />
		</Link>
	);
}

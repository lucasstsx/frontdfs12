import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/login")({
	component: LoginPage,
});

function LoginPage() {
	return (
		<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border-4 border-secondary">
			<h1 className="text-3xl font-extrabold text-primary mb-6 text-center">
				Entrar
			</h1>
			<p className="text-center text-muted-foreground">
				Tela de login em construção...
			</p>
		</div>
	)
}

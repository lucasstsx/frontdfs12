import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/components/login-form";

export const Route = createFileRoute("/auth/_auth/login")({
	component: LoginPage,
});

function LoginPage() {
	return (
		<LoginForm></LoginForm>
	)
}

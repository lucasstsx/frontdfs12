import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LoginForm } from "./-components/login-form";

const loginSearchSchema = z.object({
	redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/auth/_auth/login")({
	validateSearch: (search) => loginSearchSchema.parse(search),
	component: LoginPage,
});

function LoginPage() {
	return <LoginForm />;
}

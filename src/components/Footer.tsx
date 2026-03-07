import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";

const platformLinks = [
	{ label: "Sobre nós", href: "/about", isHash: false },
	{ label: "Conhecimentos Disponíveis", href: "/conhecimentos", isHash: false },
	{ label: "Recomendações", href: "/recomendacoes", isHash: false },
	{
		label: "Compartilhe seu Conhecimento",
		href: "/criar-conta",
		isHash: false,
	},
];

const socialLinks = [
	{ Icon: Instagram, label: "Instagram", href: "#" },
	{ Icon: Facebook, label: "Facebook", href: "#" },
	{ Icon: Twitter, label: "X / Twitter", href: "#" },
	{ Icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function Footer() {
	return (
		<footer className="bg-primary px-8 py-10 text-primary-foreground border-t-4 border-accent">
			{/* Links estaticos centralizados em arrays para facilitar manutencao de navegacao. */}
			<div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-[1fr_auto_auto] lg:gap-16">
				<div className="flex flex-col gap-4">
					<div className="items-center gap-3 flex">
						<Logo />
					</div>
					<p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
						Facilitando a conexão entre quem quer ensinar e quem quer aprender,
						de forma simples, organizada e totalmente acessível.
					</p>
				</div>

				<div className="flex flex-col gap-3">
					<h4 className="mb-1 text-sm font-bold uppercase tracking-widest text-accent">
						Plataforma
					</h4>
					{platformLinks.map((link) =>
						link.isHash ? (
							<Link
								key={link.label}
								to="/"
								hash={link.href}
								className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
							>
								{link.label}
							</Link>
						) : (
							<Link
								key={link.label}
								to={link.href}
								className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
							>
								{link.label}
							</Link>
						),
					)}
				</div>

				<div className="flex flex-col gap-3">
					<h4 className="mb-1 text-sm font-bold uppercase tracking-widest text-accent">
						Nossas Redes
					</h4>
					<div className="flex gap-3">
						{socialLinks.map(({ Icon, label, href }) => (
							<a
								key={label}
								href={href}
								aria-label={label}
								className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
							>
								<Icon size={22} />
							</a>
						))}
					</div>
				</div>
			</div>

			<p className="mx-auto mt-10 max-w-5xl border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
				© {new Date().getFullYear()} PessoaConhecimentos — todos os direitos
				reservados.
			</p>
		</footer>
	);
}

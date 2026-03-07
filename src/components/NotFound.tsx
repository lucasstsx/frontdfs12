import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		// Tela 404 ocupa a viewport inteira para manter foco e orientar o retorno.
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
			{/* Camadas com tokens do tema para dar destaque sem quebrar a paleta global. */}
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.18),transparent_35%),radial-gradient(circle_at_78%_24%,hsl(var(--accent)/0.16),transparent_36%),radial-gradient(circle_at_74%_82%,hsl(var(--secondary)/0.24),transparent_44%)]" />

			<div className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-3xl border-2 border-accent/25 bg-card/95 px-6 py-10 text-center shadow-2xl sm:px-12">
				<svg
					className="mb-8 w-40 text-accent sm:w-52"
					viewBox="0 0 223 194"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Ilustracao da pagina nao encontrada</title>
					<path
						d="M104.119 192.346C101.606 191.415 99.3279 190.019 97.2838 188.158C77.0279 170.292 60.5817 155.261 47.945 143.067C35.3083 130.873 25.4146 120.176 18.2637 110.974C11.1128 101.773 6.28117 93.3496 3.7687 85.7042C1.25623 78.0587 0 69.9629 0 61.4167C0 44.2944 5.94666 29.7778 17.84 17.8667C29.7333 5.95555 44.2283 0 61.325 0C73.59 0 84.3683 2.37106 93.66 7.11317C102.952 11.8553 106.297 18.6967 103.695 27.6375L93.3812 63.9292C92.4521 67.6514 93.0579 70.9567 95.1987 73.8452C97.3395 76.7336 100.265 78.1741 103.974 78.1667H122.65L115.403 149.075C115.217 150.564 115.822 151.401 117.22 151.588C118.617 151.774 119.498 151.215 119.862 149.912L140.49 81.5167C141.605 77.7944 141.047 74.4444 138.817 71.4667C136.587 68.4889 133.614 67 129.897 67H111.5L128.504 16.4708C130.548 9.95694 134.822 5.58333 141.326 3.35C147.83 1.11667 154.613 0 161.675 0C178.772 0 193.267 5.95555 205.16 17.8667C217.053 29.7778 223 44.2944 223 61.4167C223 69.6056 221.513 77.7014 218.54 85.7042C215.567 93.7069 210.408 102.547 203.064 112.225C195.72 121.903 185.87 132.839 173.516 145.033C161.162 157.227 145.507 171.602 126.552 188.158C124.508 190.019 122.185 191.415 119.584 192.346C116.982 193.276 114.38 193.742 111.779 193.742C109.177 193.742 106.624 193.276 104.119 192.346Z"
						fill="currentColor"
					/>
				</svg>

				<h1 className="mb-3 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
					Erro 404 - Pagina nao encontrada
				</h1>

				<p className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
					Nao sabemos que pagina voce procura,
					<span className="ml-1 underline decoration-accent decoration-2 underline-offset-4">
						mas alguem aqui deve saber!
					</span>
				</p>

				<Link
					to="/"
					className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3 font-bold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					Buscar alguem
				</Link>
			</div>
		</section>
	);
}

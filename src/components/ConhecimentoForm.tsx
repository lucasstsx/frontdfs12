import { useForm } from "@tanstack/react-form";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";

const conhecimentoSchema = z.object({
	titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
	descricao: z
		.string()
		.min(20, "A descrição deve ter pelo menos 20 caracteres"),
	categoria: z.enum([
		"MUSICA",
		"TECNOLOGIA",
		"EDUCACAO",
		"ARTES",
		"IDIOMAS",
		"OUTROS",
	]),
	nivel: z.enum(["BASICO", "INTERMEDIARIO", "AVANCADO"]),
});

type Categoria = z.infer<typeof conhecimentoSchema>["categoria"];
type Nivel = z.infer<typeof conhecimentoSchema>["nivel"];

export type ConhecimentoValues = z.infer<typeof conhecimentoSchema>;

interface ConhecimentoFormProps {
	initialValues?: Partial<ConhecimentoValues>;
	onSubmit: (values: ConhecimentoValues) => Promise<void>;
	onCancel: () => void;
	buttonText?: string;
}

export function ConhecimentoForm({
	initialValues,
	onSubmit,
	onCancel,
	buttonText = "Salvar Conhecimento",
}: ConhecimentoFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		defaultValues: {
			titulo: initialValues?.titulo ?? "",
			descricao: initialValues?.descricao ?? "",
			categoria: (initialValues?.categoria ?? "TECNOLOGIA") as Categoria,
			nivel: (initialValues?.nivel ?? "BASICO") as Nivel,
		},
		validators: {
			onChange: conhecimentoSchema,
		},
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			try {
				await onSubmit(value as ConhecimentoValues);
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<FieldGroup className="gap-6">
				<form.Field name="titulo">
					{(field) => (
						<Field>
							<FieldLabel
								htmlFor={field.name}
								className="text-primary font-bold"
							>
								Título
							</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Ex: Violão para Iniciantes"
								className="bg-white!"
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				</form.Field>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<form.Field name="categoria">
						{(field) => (
							<Field>
								<FieldLabel
									htmlFor={field.name}
									className="text-primary font-bold"
								>
									Categoria
								</FieldLabel>
								<Select
									value={field.state.value}
									onValueChange={(val) => field.handleChange(val as Categoria)}
								>
									<SelectTrigger id={field.name} className="bg-white!">
										<SelectValue placeholder="Selecione..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="MUSICA">Música</SelectItem>
										<SelectItem value="TECNOLOGIA">Tecnologia</SelectItem>
										<SelectItem value="EDUCACAO">Educação</SelectItem>
										<SelectItem value="ARTES">Artes</SelectItem>
										<SelectItem value="IDIOMAS">Idiomas</SelectItem>
										<SelectItem value="OUTROS">Outros</SelectItem>
									</SelectContent>
								</Select>
								<FieldError errors={field.state.meta.errors} />
							</Field>
						)}
					</form.Field>

					<form.Field name="nivel">
						{(field) => (
							<Field>
								<FieldLabel
									htmlFor={field.name}
									className="text-primary font-bold"
								>
									Nível
								</FieldLabel>
								<Select
									value={field.state.value}
									onValueChange={(val) => field.handleChange(val as Nivel)}
								>
									<SelectTrigger id={field.name} className="bg-white!">
										<SelectValue placeholder="Selecione..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="BASICO">Básico</SelectItem>
										<SelectItem value="INTERMEDIARIO">Intermediário</SelectItem>
										<SelectItem value="AVANCADO">Avançado</SelectItem>
									</SelectContent>
								</Select>
								<FieldError errors={field.state.meta.errors} />
							</Field>
						)}
					</form.Field>
				</div>

				<form.Field name="descricao">
					{(field) => (
						<Field>
							<FieldLabel
								htmlFor={field.name}
								className="text-primary font-bold"
							>
								Descrição
							</FieldLabel>
							<textarea
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Explique o que o aluno irá aprender..."
								className="flex min-h-[120px] w-full rounded-md border border-input bg-white! px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				</form.Field>

				<div className="flex justify-end gap-3 pt-4 border-t">
					<Button
						type="button"
						variant="ghost"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						className="font-bold min-w-[150px]"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Salvando...
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								{buttonText}
							</>
						)}
					</Button>
				</div>
			</FieldGroup>
		</form>
	);
}

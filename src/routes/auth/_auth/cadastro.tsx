import { createFileRoute } from '@tanstack/react-router';
import { CadastroForm } from "#/components/cadastro-form";

export const Route = createFileRoute("/auth/_auth/cadastro")({
  component: CadastroPage,
});

function CadastroPage() {
  return(
    <CadastroForm></CadastroForm>
  )
}

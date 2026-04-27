import { StepStub } from "../components/StepStub";

export function ValidacoesPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Validações"
          description="Painel central de validações de documentos."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

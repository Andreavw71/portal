import { StepStub } from "../components/StepStub";

export function ValidacaoSisenPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Validação SISEN"
          description="Validação de documentos no Sistema SISEN."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

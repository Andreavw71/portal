import { StepStub } from "../components/StepStub";

export function GerarPdfIsencaoPcdPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Documentação em PDF"
          description="Geração consolidada da documentação da solicitação em formato PDF."
          prev="/isencao-pcd/acompanhamento"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

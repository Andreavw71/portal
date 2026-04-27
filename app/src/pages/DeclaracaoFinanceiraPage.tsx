import { StepStub } from "../components/StepStub";

export function DeclaracaoFinanceiraPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Declaração de disponibilidade financeira"
          description="Geração da declaração de disponibilidade financeira."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

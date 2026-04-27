import { StepStub } from "../components/StepStub";

export function ConsultaSisenPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Consulta SISEN"
          description="Consulta pública de processos no SISEN."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

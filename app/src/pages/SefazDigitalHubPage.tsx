import { StepStub } from "../components/StepStub";

export function SefazDigitalHubPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="SEFAZ Digital"
          description="Hub de serviços digitais da SEFAZ-MT."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

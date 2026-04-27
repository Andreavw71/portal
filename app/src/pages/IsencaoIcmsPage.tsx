import { StepStub } from "../components/StepStub";

export function IsencaoIcmsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Isenção de ICMS"
          description="Hub de isenções de ICMS disponíveis."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

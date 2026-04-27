import { useParams } from "react-router";
import { StepStub } from "../components/StepStub";

export function TimelineProcessoPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title={`Processo ${id ?? ""}`}
          description="Linha do tempo do processo: eventos, documentos e prazos."
          prev="/isencao-pcd/acompanhamento"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

import { StepStub } from "../components/StepStub";

export default function EditorialReviewPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Revisão editorial"
          description="Página de revisão editorial dos textos do fluxo."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

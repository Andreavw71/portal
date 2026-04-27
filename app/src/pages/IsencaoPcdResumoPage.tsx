import { StepStub } from "../components/StepStub";

export function IsencaoPcdResumoPage() {
  return (
    <StepStub
      title="Revisão final"
      description="Confira todas as informações antes de enviar a solicitação."
      prev="/isencao-pcd/ipva"
      next="/isencao-pcd/sucesso"
      nextLabel="Enviar solicitação"
    />
  );
}

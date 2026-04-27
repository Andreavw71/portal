import { StepStub } from "../components/StepStub";

export function IsencaoPcdTermoPage() {
  return (
    <StepStub
      title="Termo de consentimento"
      description="Leia e aceite o termo para prosseguir com a solicitação."
      prev="/isencao-pcd"
      next="/isencao-pcd/identificacao"
    />
  );
}

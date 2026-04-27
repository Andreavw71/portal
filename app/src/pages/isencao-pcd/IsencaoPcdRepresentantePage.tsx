import { StepStub } from "../../components/StepStub";

export function IsencaoPcdRepresentantePage() {
  return (
    <StepStub
      title="Representante legal"
      description="Informe os dados do representante legal (pai, mãe, tutor ou curador)."
      prev="/isencao-pcd/beneficiario"
      next="/isencao-pcd/validacoes"
    />
  );
}

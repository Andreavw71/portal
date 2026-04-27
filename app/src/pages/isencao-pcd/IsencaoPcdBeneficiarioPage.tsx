import { StepStub } from "../../components/StepStub";

export function IsencaoPcdBeneficiarioPage() {
  return (
    <StepStub
      title="Dados do beneficiário"
      description="Informe os dados da pessoa com deficiência beneficiária da isenção."
      prev="/isencao-pcd/identificacao"
      next="/isencao-pcd/representante"
    />
  );
}

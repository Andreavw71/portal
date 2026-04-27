import { StepStub } from "../components/StepStub";

export function IsencaoPcdIdentificacaoPage() {
  return (
    <StepStub
      title="Identificação"
      description="Confirme seus dados pessoais cadastrados na SEFAZ."
      prev="/isencao-pcd/termo"
      next="/isencao-pcd/beneficiario"
    />
  );
}

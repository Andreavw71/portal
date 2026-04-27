import { StepStub } from "../../components/StepStub";

export function IsencaoPcdCondutoresPage() {
  return (
    <StepStub
      title="Condutores autorizados"
      description="Cadastre até 3 condutores autorizados a dirigir o veículo."
      prev="/isencao-pcd/disponibilidade-financeira"
      next="/isencao-pcd/concessionaria"
    />
  );
}

import { StepStub } from "../../components/StepStub";

export function IsencaoPcdIpvaPage() {
  return (
    <StepStub
      title="Isenção de IPVA (opcional)"
      description="Você também pode solicitar a isenção de IPVA para o mesmo veículo."
      prev="/isencao-pcd/veiculo"
      next="/isencao-pcd/resumo"
      nextLabel="Continuar para revisão"
    />
  );
}

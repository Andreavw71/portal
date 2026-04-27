import { StepStub } from "../components/StepStub";

export function IsencaoPcdVeiculoPage() {
  return (
    <StepStub
      title="Informações do veículo"
      description="Informe os dados do veículo a ser adquirido com isenção."
      prev="/isencao-pcd/fabricante"
      next="/isencao-pcd/ipva"
    />
  );
}

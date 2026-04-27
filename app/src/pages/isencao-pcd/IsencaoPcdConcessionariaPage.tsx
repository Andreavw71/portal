import { StepStub } from "../../components/StepStub";

export function IsencaoPcdConcessionariaPage() {
  return (
    <StepStub
      title="Dados da concessionária"
      description="Informe a concessionária onde o veículo será adquirido."
      prev="/isencao-pcd/condutores"
      next="/isencao-pcd/fabricante"
    />
  );
}

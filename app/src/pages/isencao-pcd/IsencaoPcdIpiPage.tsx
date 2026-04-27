import { StepStub } from "../../components/StepStub";

export function IsencaoPcdIpiPage() {
  return (
    <StepStub
      title="Isenção de IPI"
      description="Anexe o deferimento de isenção de IPI emitido pela Receita Federal."
      prev="/isencao-pcd/laudo-medico"
      next="/isencao-pcd/doc-representacao"
    />
  );
}

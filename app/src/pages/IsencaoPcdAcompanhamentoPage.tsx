import { StepStub } from "../components/StepStub";

export function IsencaoPcdAcompanhamentoPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <StepStub
          title="Acompanhamento da solicitação"
          description="Acompanhe o status do seu pedido e as pendências em aberto. Lembre-se: a regra dos 270 dias começa a contar a partir do envio."
          prev="/"
          prevLabel="Voltar"
        />
      </div>
    </div>
  );
}

import { StepStub } from "../components/StepStub";
import { useIsencaoPcd } from "../contexts/IsencaoPcdContext";
import { Link } from "react-router";

const tipos = [
  {
    id: "pcd-condutor" as const,
    title: "Sou PcD e vou dirigir",
    description:
      "Você tem deficiência e vai comprar e dirigir o próprio veículo.",
  },
  {
    id: "pcd-terceiro" as const,
    title: "Sou PcD e outra pessoa vai dirigir",
    description:
      "Você tem deficiência e o veículo será dirigido por terceiro.",
  },
  {
    id: "representante" as const,
    title: "Sou representante legal",
    description:
      "Pai, mãe, tutor ou curador solicitando em nome da pessoa com deficiência.",
  },
];

export function IsencaoPcdAberturaPage() {
  const { tipoSolicitacao, setTipoSolicitacao } = useIsencaoPcd();

  return (
    <StepStub
      title="Tipo de solicitação"
      description="Selecione a opção que melhor descreve sua situação para personalizarmos as próximas etapas do pedido."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tipos.map((tipo) => {
          const selected = tipoSolicitacao === tipo.id;
          return (
            <button
              key={tipo.id}
              type="button"
              onClick={() => setTipoSolicitacao(tipo.id)}
              className={`text-left p-5 rounded-xl border-[1.25px] transition-all
                ${
                  selected
                    ? "border-[#2A66D9] bg-[#EFF6FF] ring-2 ring-[#2A66D9]/20"
                    : "border-[#E5E7EB] bg-white hover:border-[#9CA3AF]"
                }`}
            >
              <h3 className="font-semibold text-[#111827] mb-2">
                {tipo.title}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {tipo.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-6 border-t border-[#F3F4F6]">
        <Link
          to="/isencao-pcd/termo"
          aria-disabled={!tipoSolicitacao}
          className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-semibold transition-colors ${
            tipoSolicitacao
              ? "bg-[#2A66D9] text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-400 pointer-events-none"
          }`}
        >
          Continuar
        </Link>
      </div>
    </StepStub>
  );
}

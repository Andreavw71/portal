import { Check, Circle } from "lucide-react";

interface ProgressoSolicitacaoSidebarProps {
  etapaAtual: string;
  etapasCompletas: string[];
}

const ETAPAS_LABELS: { id: string; label: string }[] = [
  { id: "abertura", label: "Tipo de solicitação" },
  { id: "termo", label: "Termo de consentimento" },
  { id: "identificacao", label: "Identificação" },
  { id: "representante", label: "Representante legal" },
  { id: "beneficiario", label: "Beneficiário" },
  { id: "validacoes", label: "Validações" },
  { id: "documentos", label: "Documentos" },
  { id: "laudo-medico", label: "Laudo médico" },
  { id: "isencao-ipi", label: "Isenção de IPI" },
  { id: "doc-representacao", label: "Doc. de representação" },
  { id: "disponibilidade-financeira", label: "Disp. financeira" },
  { id: "condutores", label: "Condutores" },
  { id: "concessionaria", label: "Concessionária" },
  { id: "fabricante", label: "Fabricante" },
  { id: "veiculo", label: "Veículo" },
  { id: "ipva", label: "IPVA" },
  { id: "resumo", label: "Revisão final" },
];

export function ProgressoSolicitacaoSidebar({
  etapaAtual,
  etapasCompletas,
}: ProgressoSolicitacaoSidebarProps) {
  return (
    <aside className="bg-white border border-[#E5E7EB] rounded-[12px] p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#6A7282] uppercase tracking-wide mb-4">
        Progresso da solicitação
      </h3>
      <ol className="space-y-1">
        {ETAPAS_LABELS.map((etapa) => {
          const completa = etapasCompletas.includes(etapa.id);
          const atual = etapa.id === etapaAtual;
          return (
            <li
              key={etapa.id}
              className={`flex items-center gap-3 text-sm rounded-lg px-2 py-1.5 transition-colors ${
                atual
                  ? "bg-[#EFF6FF] text-[#2A66D9] font-semibold"
                  : completa
                  ? "text-emerald-700"
                  : "text-[#6A7282]"
              }`}
            >
              <span
                className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  atual
                    ? "bg-[#2A66D9] text-white"
                    : completa
                    ? "bg-emerald-500 text-white"
                    : "bg-[#E5E7EB] text-[#9CA3AF]"
                }`}
              >
                {completa ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Circle className="w-2 h-2 fill-current" />
                )}
              </span>
              <span className="flex-1">{etapa.label}</span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

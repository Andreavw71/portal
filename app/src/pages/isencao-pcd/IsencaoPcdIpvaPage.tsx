import { useState } from "react";
import { useNavigate } from "react-router";
import { Car } from "lucide-react";
import { ProgressoSolicitacaoSidebar } from "../../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../../hooks/useGerenciadorEtapas";

export function IsencaoPcdIpvaPage() {
  const navigate = useNavigate();
  const [isencaoIpva, setIsencaoIpva] = useState<string | null>(null);

  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";
  const { etapas } = useGerenciadorEtapas(tipoPcD);

  return (
    <div className="animate-fade-in pb-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
      {/* Sidebar de progresso - lateral esquerda */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ProgressoSolicitacaoSidebar
            etapaAtual="ipva"
            etapasCompletas={etapas
              .filter((e) => e.completa)
              .map((e) => e.id)}
          />
        </div>
      </div>

      {/* Conteúdo principal - direita */}
      <div>
        {/* Cabeçalho da etapa */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#101828] mb-2">
            Incluir análise de isenção de IPVA neste pedido
          </h1>
          <p className="text-[#4A5565] text-sm leading-relaxed">
            Nesta etapa você pode aproveitar para solicitar também a análise
            da isenção de IPVA. Esta é uma opção — você decide se quer
            incluir ou não.
          </p>
        </div>

        {/* Bloco principal */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
          {/* Header do card */}
          <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2A66D9]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[#101828] font-bold">
                Você quer incluir a análise de isenção de IPVA?
              </h2>
              <p className="text-[#6A7282] text-xs mt-0.5">
                Escolha uma das opções abaixo para continuar
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Opções de escolha */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Opção SIM */}
              <label
                className={`flex-1 border-2 rounded-[10px] p-5 cursor-pointer transition-all ${
                  isencaoIpva === "sim"
                    ? "border-[#2A66D9] bg-[#EFF6FF]"
                    : "border-[#E5E7EB] hover:border-[#2A66D9]/40 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isencaoIpva === "sim"
                        ? "border-[#2A66D9]"
                        : "border-gray-300"
                    }`}
                  >
                    {isencaoIpva === "sim" && (
                      <div className="w-2.5 h-2.5 bg-[#2A66D9] rounded-full" />
                    )}
                  </div>
                  <div>
                    <span
                      className={`block text-sm ${
                        isencaoIpva === "sim"
                          ? "text-[#2A66D9]"
                          : "text-[#101828]"
                      }`}
                      style={{ fontWeight: 700 }}
                    >
                      Sim, quero incluir a análise de isenção de IPVA
                    </span>
                    <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                      As informações já enviadas serão aproveitadas para o
                      pedido de IPVA. A aprovação é feita em análise separada.
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="isencaoIpva"
                  value="sim"
                  className="hidden"
                  onChange={() => setIsencaoIpva("sim")}
                  checked={isencaoIpva === "sim"}
                />
              </label>

              {/* Opção NÃO */}
              <label
                className={`flex-1 border-2 rounded-[10px] p-5 cursor-pointer transition-all ${
                  isencaoIpva === "nao"
                    ? "border-[#2A66D9] bg-[#EFF6FF]"
                    : "border-[#E5E7EB] hover:border-[#2A66D9]/40 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isencaoIpva === "nao"
                        ? "border-[#2A66D9]"
                        : "border-gray-300"
                    }`}
                  >
                    {isencaoIpva === "nao" && (
                      <div className="w-2.5 h-2.5 bg-[#2A66D9] rounded-full" />
                    )}
                  </div>
                  <div>
                    <span
                      className={`block text-sm ${
                        isencaoIpva === "nao"
                          ? "text-[#2A66D9]"
                          : "text-[#101828]"
                      }`}
                      style={{ fontWeight: 700 }}
                    >
                      Não, solicitar apenas a isenção de ICMS por agora
                    </span>
                    <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                      Você pode pedir a isenção de IPVA em outro momento, pelo
                      portal, quando precisar.
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="isencaoIpva"
                  value="nao"
                  className="hidden"
                  onChange={() => setIsencaoIpva("nao")}
                  checked={isencaoIpva === "nao"}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/isencao-pcd/veiculo")}
            className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate("/isencao-pcd/resumo")}
            disabled={!isencaoIpva}
            className={`h-12 px-6 rounded-[10px] text-white font-semibold transition-colors shadow-sm ${
              isencaoIpva
                ? "bg-[#2A66D9] hover:bg-[#1e4fb8]"
                : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

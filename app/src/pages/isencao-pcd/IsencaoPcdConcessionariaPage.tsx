import { useState } from "react";
import { useNavigate } from "react-router";
import { Store } from "lucide-react";
import {
  BuscaCNPJ,
  CamposEmpresa,
  DevControlsCND,
  type CndOverride,
  type DadosEmpresa,
} from "../../components/BuscaCNPJ";
import { useIsencaoPcd } from "../../contexts/IsencaoPcdContext";
import { ProgressoSolicitacaoSidebar } from "../../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../../hooks/useGerenciadorEtapas";

export function IsencaoPcdConcessionariaPage() {
  const navigate = useNavigate();
  const { updateFormData, formData } = useIsencaoPcd();
  const [dadosConcessionaria, setDadosConcessionaria] =
    useState<DadosEmpresa | null>(formData.concessionaria || null);
  const [devCndOverride, setDevCndOverride] = useState<CndOverride>("auto");

  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";
  const { etapas } = useGerenciadorEtapas(tipoPcD);

  const handleSelectConcessionaria = (dados: DadosEmpresa) => {
    setDadosConcessionaria(dados);
    updateFormData("concessionaria", dados);
  };

  const handleAvancar = () => {
    navigate("/isencao-pcd/fabricante");
  };

  const handleVoltar = () => {
    navigate("/isencao-pcd/isencao-ipi");
  };

  return (
    <div className="animate-fade-in pb-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
      {/* Sidebar de progresso - lateral esquerda */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ProgressoSolicitacaoSidebar
            etapaAtual="concessionaria"
            etapasCompletas={etapas
              .filter((e) => e.completa)
              .map((e) => e.id)}
          />
        </div>
      </div>

      {/* Conteúdo principal - direita */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#101828] mb-2">
            Dados da concessionária
          </h1>
          <p className="text-[#4A5565] text-sm">
            Informe o CNPJ da concessionária onde você comprará o veículo.
          </p>
        </div>

        <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
          <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2A66D9]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[#101828] font-bold">Concessionária</h2>
              <p className="text-base text-[#6A7282]">
                Dados encontrados no Sistema Fazendário
              </p>
            </div>
          </div>

          <div className="p-6">
            <BuscaCNPJ
              onSelect={handleSelectConcessionaria}
              devCndOverride={devCndOverride}
            />

            {dadosConcessionaria && (
              <div className="animate-fade-in mt-6">
                <CamposEmpresa
                  nomeFantasia={dadosConcessionaria.nomeFantasia}
                  cnpj={dadosConcessionaria.cnpj}
                  cnd={dadosConcessionaria.cnd}
                />
              </div>
            )}
          </div>
        </div>

        {/* Developer Controls no final da página */}
        <DevControlsCND value={devCndOverride} onChange={setDevCndOverride} />

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleVoltar}
            className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleAvancar}
            disabled={!dadosConcessionaria}
            className={`h-12 px-6 rounded-[10px] text-white font-semibold transition-colors shadow-sm ${
              dadosConcessionaria
                ? "bg-[#2A66D9] hover:bg-[#1e4fb8]"
                : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Car,
  Search,
  CheckCircle,
  Info,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { EditorialAlertBadge } from "../components/EditorialAlertBadge";
import { ProgressoSolicitacaoSidebar } from "../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../hooks/useGerenciadorEtapas";

export function IsencaoPcdVeiculoPage() {
  const navigate = useNavigate();
  const [bin, setBin] = useState("");
  const [buscou, setBuscou] = useState(false);
  const [mostrarAjudaBin, setMostrarAjudaBin] = useState(false);
  const [erroBin, setErroBin] = useState<string | null>(null);

  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";
  const { etapas } = useGerenciadorEtapas(tipoPcD);

  const handleBuscar = () => {
    if (bin.trim().length < 3) {
      setErroBin("Informe o código BIN completo antes de consultar.");
      return;
    }
    setErroBin(null);
    setBuscou(true);
  };

  return (
    <div className="animate-fade-in pb-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
      {/* Sidebar de progresso - lateral esquerda */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ProgressoSolicitacaoSidebar
            etapaAtual="veiculo"
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
            Informações do veículo
          </h1>
          <p className="text-[#4A5565] text-base leading-relaxed">
            Informe o código BIN para identificar o veículo que será comprado
            com isenção. Os demais dados serão preenchidos automaticamente
            após a consulta.
          </p>
        </div>

        {/* Bloco principal */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-4">
          {/* Header do card */}
          <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2A66D9]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[#101828] font-bold">
                Identificação do veículo pelo código BIN
              </h2>
              <p className="text-[#6A7282] text-xs mt-0.5">
                O código BIN identifica o modelo e é fornecido pela
                concessionária
              </p>
            </div>
          </div>

          <div className="p-6">
            {/* Ajuda sobre o BIN */}
            <div className="mb-6">
              <button
                onClick={() => setMostrarAjudaBin((b) => !b)}
                className="flex items-center gap-2 text-[#2A66D9] text-sm hover:underline transition-all"
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span style={{ fontWeight: 600 }}>
                  {mostrarAjudaBin
                    ? "Fechar orientação"
                    : "O que é o código BIN e onde encontro?"}
                </span>
              </button>

              {mostrarAjudaBin && (
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-base text-blue-900 leading-relaxed animate-fade-in">
                  <p className="mb-2">
                    <span style={{ fontWeight: 700 }}>BIN</span> é o código de
                    identificação do modelo do veículo usado pela SEFAZ-MT
                    para verificar as características técnicas do carro
                    (direção, transmissão, entre outros).
                  </p>
                  <p>
                    Você encontra esse código diretamente com a concessionária
                    ou na proposta de compra do veículo. Se ainda não tiver
                    esse número, peça antes de continuar o preenchimento.
                  </p>
                </div>
              )}
            </div>

            {/* Campo BIN */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Código BIN <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={bin}
                  onChange={(e) => {
                    setBin(e.target.value);
                    setErroBin(null);
                  }}
                  className={`flex-1 h-12 px-4 border rounded-[10px] focus:ring-2 focus:ring-[#2A66D9] focus:border-[#2A66D9] outline-none transition-all ${
                    erroBin ? "border-[#E7000B] bg-red-50" : "border-[#D1D5DC]"
                  }`}
                  placeholder="Ex.: 123456"
                  maxLength={12}
                />
                <button
                  onClick={handleBuscar}
                  className="h-12 px-6 bg-[#2A66D9] text-white font-semibold rounded-[10px] hover:bg-[#1e4fb8] transition-colors flex items-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Consultar BIN</span>
                </button>
              </div>
              {erroBin && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{erroBin}</span>
                </div>
              )}
              <p className="text-gray-500 text-xs">
                Após digitar o código, clique em "Consultar BIN" para carregar
                os dados do veículo.
              </p>
            </div>

            {/* Dados retornados após consulta */}
            {buscou && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-5 animate-fade-in">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">
                      Veículo identificado
                    </p>
                    <p className="text-[#0C326F] font-bold text-xl">
                      HYUNDAI / CRETA 1.0 AT
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider">
                      Tipo de direção
                    </label>
                    <select className="w-full h-12 px-3 border border-[#D1D5DC] rounded-[10px] focus:ring-2 focus:ring-[#2A66D9] bg-white text-sm">
                      <option value="eletrica">Elétrica</option>
                      <option value="hidraulica">Hidráulica</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider">
                      Tipo de transmissão
                    </label>
                    <select className="w-full h-12 px-3 border border-[#D1D5DC] rounded-[10px] focus:ring-2 focus:ring-[#2A66D9] bg-white text-sm">
                      <option value="automatica">Automática</option>
                      <option value="automatizada">Automatizada</option>
                    </select>
                  </div>

                  {/* Campo de valor com alerta editorial */}
                  <div className="sm:col-span-2 border-t border-gray-200 pt-5 space-y-2">
                    <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider">
                      Preço de venda ao consumidor (R$){" "}
                      <span className="text-red-500 normal-case font-normal">
                        obrigatório
                      </span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">
                        R$
                      </span>
                      <input
                        type="text"
                        className="w-full sm:w-1/2 h-12 pl-12 pr-4 border border-[#D1D5DC] rounded-[10px] focus:ring-2 focus:ring-[#2A66D9] focus:border-[#2A66D9] outline-none transition-all font-medium text-sm"
                        placeholder="0,00"
                        defaultValue="119.990,00"
                      />
                    </div>

                    {/* Orientação sobre o valor — com alerta editorial no trecho sensível */}
                    <div className="mt-2">
                      <EditorialAlertBadge
                        tipo="verificar-fonte"
                        rotulo="Orientação sobre valor de venda"
                        motivo="A instrução de informar o valor 'com impostos e tributos, sem considerar o desconto da isenção' precisa de confirmação da equipe técnica quanto à forma exata de cálculo exigida pelo sistema (valor de tabela FIPE, NF ou proposta comercial?)."
                        sugestao="Informe o valor total do veículo conforme consta na proposta de compra ou nota fiscal, sem aplicar nenhum desconto de isenção. Em caso de dúvida, consulte a concessionária."
                      >
                        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-900">
                          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <p>
                            <span className="font-bold">
                              Atenção ao valor:
                            </span>{" "}
                            Informe o preço total do veículo conforme a
                            proposta de compra, com todos os impostos
                            incluídos e sem descontar o valor da isenção.
                          </p>
                        </div>
                      </EditorialAlertBadge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/isencao-pcd/fabricante")}
            className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate("/isencao-pcd/ipva")}
            disabled={!buscou}
            className={`h-12 px-6 rounded-[10px] text-white font-semibold transition-colors shadow-sm ${
              buscou
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

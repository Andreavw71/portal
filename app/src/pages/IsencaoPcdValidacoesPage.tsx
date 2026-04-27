import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Info,
  ShieldCheck,
} from "lucide-react";
import { ProgressoSolicitacaoSidebar } from "../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../hooks/useGerenciadorEtapas";
import { useIsencaoPcd } from "../contexts/IsencaoPcdContext";

type StatusCertidao =
  | "negativa"
  | "positiva"
  | "positiva-efeito-negativa"
  | "indisponivel";
type StatusCNH =
  | "com-pcd"
  | "sem-pcd"
  | "nao-encontrada"
  | "vencida"
  | "suspensa"
  | "nao-aplicavel";

export function IsencaoPcdValidacoesPage() {
  const navigate = useNavigate();
  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";

  const { etapas, marcarEtapaCompleta } = useGerenciadorEtapas(tipoPcD);
  const { updateFormData } = useIsencaoPcd();

  const [statusCertidao, setStatusCertidao] =
    useState<StatusCertidao>("negativa");
  const [statusCNH, setStatusCNH] = useState<StatusCNH>("com-pcd");

  const validarCNH = tipoPcD === "proprio";

  const handleContinuar = () => {
    if (statusCertidao === "positiva") {
      alert(
        "Você precisa regularizar os débitos tributários antes de continuar."
      );
      return;
    }

    if (
      validarCNH &&
      (statusCNH === "sem-pcd" ||
        statusCNH === "vencida" ||
        statusCNH === "suspensa")
    ) {
      alert("Você precisa regularizar a CNH antes de continuar.");
      return;
    }

    const dadosValidacoes = {
      statusCertidao,
      statusCNH,
      validarCNH,
    };
    marcarEtapaCompleta("validacoes", dadosValidacoes);
    updateFormData("validacoes", dadosValidacoes);

    navigate("/isencao-pcd/laudo-medico");
  };

  const renderAlertaCertidao = () => {
    if (statusCertidao === "negativa") {
      return (
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#14532d] mb-2">
              Certidão Negativa de Débitos (CND) validada com sucesso
            </h3>
            <p className="text-base text-[#166534] leading-relaxed">
              Você não possui pendências tributárias com o Estado de Mato
              Grosso (ICMS, IPVA). Não há débitos inscritos em dívida ativa.
              Você pode prosseguir com a solicitação.
            </p>
          </div>
        </div>
      );
    }

    if (statusCertidao === "positiva") {
      return (
        <div className="bg-[#FEF2F2] border-2 border-[#DC2626] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#7f1d1d] mb-2">
              ⛔ Certidão Positiva detectada
            </h3>
            <p className="text-base text-[#991b1b] leading-relaxed mb-4">
              Há pendências tributárias em seu CPF. Para continuar a
              solicitação de isenção, você{" "}
              <strong>precisa regularizar os débitos</strong> ou comprovar
              pagamento/parcelamento ativo.
            </p>
            <div className="bg-white border border-[#FCA5A5] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#7f1d1d] mb-2">
                O que fazer:
              </p>
              <ul className="text-sm text-[#991b1b] space-y-1 list-disc list-inside">
                <li>Pagar os débitos em aberto</li>
                <li>Parcelar a dívida junto à SEFAZ-MT</li>
                <li>Apresentar comprovante de quitação ou parcelamento</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (statusCertidao === "positiva-efeito-negativa") {
      return (
        <div className="bg-[#FEFCE8] border border-[#FDE68A] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#CA8A04] flex items-center justify-center">
              <Info className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#78350F] mb-2">
              Certidão Positiva com Efeito de Negativa
            </h3>
            <p className="text-base text-[#854d0e] leading-relaxed">
              Há débitos registrados, porém garantidos por decisão judicial ou
              incluídos em parcelamento regular e em dia. De acordo com a
              legislação tributária, esta certidão{" "}
              <strong>produz os mesmos efeitos de uma certidão negativa</strong>
              , permitindo que você prossiga com a solicitação.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#F9FAFB] border border-[#D1D5DB] rounded-[10px] p-6 flex items-start gap-4">
        <div className="mt-1">
          <div className="w-10 h-10 rounded-full bg-[#6A7282] flex items-center justify-center">
            <Info className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#101828] mb-2">
            Consulta à CND temporariamente indisponível
          </h3>
          <p className="text-base text-[#4A5565] leading-relaxed">
            Não foi possível validar sua situação tributária no momento devido
            a instabilidade nos sistemas da SEFAZ-MT. Você pode continuar com
            a solicitação, mas o pedido{" "}
            <strong>ficará pendente de validação manual</strong> pela equipe
            de análise.
          </p>
        </div>
      </div>
    );
  };

  const renderAlertaCNH = () => {
    if (!validarCNH) {
      return (
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#2A66D9] flex items-center justify-center">
              <Info className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#1e40af] mb-2">
              Validação de CNH não aplicável
            </h3>
            <p className="text-base text-[#1e4db8] leading-relaxed">
              Como você selecionou que{" "}
              <strong>não será o condutor do veículo</strong>, a validação de
              CNH não é necessária nesta etapa. A CNH dos condutores
              autorizados será validada posteriormente.
            </p>
          </div>
        </div>
      );
    }

    if (statusCNH === "com-pcd") {
      return (
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#14532d] mb-2">
              CNH com registro PcD encontrada
            </h3>
            <p className="text-base text-[#166534] leading-relaxed">
              Sua Carteira Nacional de Habilitação possui o{" "}
              <strong>registro de pessoa com deficiência</strong> e está
              regular perante o DETRAN-MT. A CNH está válida e habilitada para
              conduzir veículos adaptados.
            </p>
          </div>
        </div>
      );
    }

    if (statusCNH === "sem-pcd") {
      return (
        <div className="bg-[#FEF2F2] border-2 border-[#DC2626] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#7f1d1d] mb-2">
              ⛔ CNH sem registro de PcD
            </h3>
            <p className="text-base text-[#991b1b] leading-relaxed mb-4">
              A CNH vinculada ao seu CPF{" "}
              <strong>não possui a observação de pessoa com deficiência</strong>
              . Para solicitar a isenção de ICMS como condutor, é obrigatório
              que a CNH tenha o registro PcD.
            </p>
            <div className="bg-white border border-[#FCA5A5] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#7f1d1d] mb-2">
                Como atualizar:
              </p>
              <ul className="text-sm text-[#991b1b] space-y-1 list-disc list-inside">
                <li>Dirija-se a uma unidade do DETRAN-MT com o laudo médico</li>
                <li>Solicite a inclusão da observação PcD na CNH</li>
                <li>Após atualização, retorne para continuar a solicitação</li>
              </ul>
              <button className="mt-3 text-sm font-semibold text-[#DC2626] hover:underline flex items-center gap-1">
                Saiba mais sobre como atualizar a CNH →
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (statusCNH === "nao-encontrada") {
      return (
        <div className="bg-[#FEFCE8] border border-[#FDE68A] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#CA8A04] flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#78350F] mb-2">
              CNH não encontrada no DETRAN-MT
            </h3>
            <p className="text-base text-[#854d0e] leading-relaxed">
              Não localizamos uma CNH ativa vinculada ao CPF informado na base
              de dados do DETRAN-MT. Verifique se a CNH está regular, emitida
              no estado de Mato Grosso e se não há pendências cadastrais.
            </p>
          </div>
        </div>
      );
    }

    if (statusCNH === "vencida") {
      return (
        <div className="bg-[#FEF2F2] border-2 border-[#DC2626] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#7f1d1d] mb-2">
              ⛔ CNH vencida
            </h3>
            <p className="text-base text-[#991b1b] leading-relaxed mb-4">
              Sua Carteira Nacional de Habilitação está <strong>vencida</strong>{" "}
              e não pode ser utilizada como documento de habilitação para
              conduzir veículos. A renovação é obrigatória para prosseguir.
            </p>
            <div className="bg-white border border-[#FCA5A5] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#7f1d1d] mb-2">
                Como regularizar:
              </p>
              <ul className="text-sm text-[#991b1b] space-y-1 list-disc list-inside">
                <li>Renove sua CNH em uma unidade do DETRAN-MT</li>
                <li>Certifique-se de solicitar a inclusão da observação PcD</li>
                <li>Após renovação, retorne para continuar a solicitação</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (statusCNH === "suspensa") {
      return (
        <div className="bg-[#FEF2F2] border-2 border-[#DC2626] rounded-[10px] p-6 flex items-start gap-4">
          <div className="mt-1">
            <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#7f1d1d] mb-2">
              ⛔ CNH suspensa ou cassada
            </h3>
            <p className="text-base text-[#991b1b] leading-relaxed mb-4">
              Sua CNH está{" "}
              <strong>
                suspensa, cassada ou com restrição administrativa
              </strong>
              . Não é possível solicitar a isenção como condutor enquanto a
              CNH não estiver regular e ativa.
            </p>
            <div className="bg-white border border-[#FCA5A5] rounded-lg p-4">
              <p className="text-sm font-semibold text-[#7f1d1d] mb-2">
                Como regularizar:
              </p>
              <ul className="text-sm text-[#991b1b] space-y-1 list-disc list-inside">
                <li>Consulte sua situação no DETRAN-MT</li>
                <li>Cumpra as exigências para reaver o direito de dirigir</li>
                <li>Após regularização, retorne para continuar a solicitação</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate("/servico/isencao-icms-pcd")}
              className="flex items-center gap-1 text-[#4A5565] hover:text-[#2A66D9] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para Ficha
            </button>
            <span className="text-[#D1D5DC]">/</span>
            <span className="font-semibold text-[#2A66D9]">Validações</span>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal com Sidebar */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar de progresso - lateral esquerda */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ProgressoSolicitacaoSidebar
                etapaAtual="validacoes"
                etapasCompletas={etapas
                  .filter((e) => e.completa)
                  .map((e) => e.id)}
              />
            </div>
          </div>

          {/* Conteúdo principal - direita */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-8 shadow-sm mb-6">
              {/* Header */}
              <div className="mb-8 pb-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#2A66D9]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-[#101828]">
                      Validações do beneficiário
                    </h1>
                    <p className="text-base text-[#4A5565] mt-1">
                      Validação de regularidade tributária e habilitação
                    </p>
                  </div>
                </div>
              </div>

              {/* Validação CND */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                    <span className="text-[#2A66D9] font-bold">1</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#101828]">
                    Certidão Negativa de Débitos (CND)
                  </h2>
                </div>
                <p className="text-base text-[#4A5565] mb-4 ml-10">
                  Verificando se há débitos tributários estaduais (ICMS, IPVA)
                  ou inscrição em dívida ativa.
                </p>
                {renderAlertaCertidao()}
              </div>

              {/* Validação CNH */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                    <span className="text-[#2A66D9] font-bold">2</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#101828]">
                    Carteira Nacional de Habilitação (CNH)
                  </h2>
                </div>
                <p className="text-base text-[#4A5565] mb-4 ml-10">
                  Verificando registro de pessoa com deficiência e validade da
                  CNH perante o DETRAN-MT.
                </p>
                {renderAlertaCNH()}
              </div>

              {/* Controles de teste (dev) */}
              <details className="mb-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-4">
                <summary className="cursor-pointer font-semibold text-gray-700 text-base">
                  🔧 Controles de teste (apenas dev)
                </summary>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Status da Certidão:
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setStatusCertidao("negativa")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCertidao === "negativa"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        }`}
                      >
                        ✓ Negativa
                      </button>
                      <button
                        onClick={() => setStatusCertidao("positiva")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCertidao === "positiva"
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        ✗ Positiva (Bloqueio)
                      </button>
                      <button
                        onClick={() =>
                          setStatusCertidao("positiva-efeito-negativa")
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCertidao === "positiva-efeito-negativa"
                            ? "bg-yellow-500 text-white shadow-md"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        ⚠ Positiva c/ Efeito Negativa
                      </button>
                      <button
                        onClick={() => setStatusCertidao("indisponivel")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCertidao === "indisponivel"
                            ? "bg-gray-500 text-white shadow-md"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                      >
                        ⓘ Indisponível
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Status da CNH:
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setStatusCNH("com-pcd")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCNH === "com-pcd"
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        }`}
                      >
                        ✓ Com PcD
                      </button>
                      <button
                        onClick={() => setStatusCNH("sem-pcd")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCNH === "sem-pcd"
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        ✗ Sem PcD (Bloqueio)
                      </button>
                      <button
                        onClick={() => setStatusCNH("nao-encontrada")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCNH === "nao-encontrada"
                            ? "bg-yellow-500 text-white shadow-md"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        ⚠ Não encontrada
                      </button>
                      <button
                        onClick={() => setStatusCNH("vencida")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCNH === "vencida"
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        ✗ Vencida (Bloqueio)
                      </button>
                      <button
                        onClick={() => setStatusCNH("suspensa")}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          statusCNH === "suspensa"
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        ✗ Suspensa (Bloqueio)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Tipo de solicitação (simulação):
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          sessionStorage.setItem("tipoPcD", "proprio")
                        }
                        className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold hover:bg-blue-200"
                      >
                        Próprio (valida CNH)
                      </button>
                      <button
                        onClick={() =>
                          sessionStorage.setItem("tipoPcD", "terceiro")
                        }
                        className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold hover:bg-blue-200"
                      >
                        Terceiro (não valida CNH)
                      </button>
                    </div>
                  </div>
                </div>
              </details>

              {/* Botões de navegação */}
              <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
                <button
                  onClick={() => navigate("/isencao-pcd/identificacao")}
                  className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={handleContinuar}
                  className="h-12 px-6 rounded-[10px] bg-[#2A66D9] text-white font-semibold hover:bg-[#1e4fb8] transition-colors shadow-sm"
                >
                  Continuar
                </button>
              </div>
            </div>

            {/* Card informativo */}
            <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#2A66D9] shrink-0 mt-0.5" />
                <div>
                  <p className="text-base font-semibold text-[#101828] mb-1">
                    Sobre as validações automáticas
                  </p>
                  <p className="text-base text-[#4A5565] leading-relaxed">
                    O sistema consulta automaticamente as bases de dados da
                    SEFAZ-MT e DETRAN-MT para validar sua regularidade
                    tributária e habilitação. Caso haja pendências críticas
                    (CND positiva ou CNH irregular), você precisará
                    regularizar antes de prosseguir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

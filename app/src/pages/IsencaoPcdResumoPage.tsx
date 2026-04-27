import { useState, ComponentType } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle,
  AlertTriangle,
  FileText,
  User,
  Store,
  Factory,
  Car,
  Shield,
  Pencil,
  Loader2,
  Send,
  Info,
  AlertCircle,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface SectionHeaderProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  editPath: string;
}

export function IsencaoPcdResumoPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [feedbackState, setFeedbackState] = useState<
    "idle" | "success" | "error" | "business_rule"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showMissingDocs, setShowMissingDocs] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleSubmit = () => {
    const missing: string[] = [];

    const hasIpiDoc = false;
    const hasProtocolo = false;
    const hasValidade = false;
    const hasCodigo = false;

    if (!hasIpiDoc) {
      missing.push(
        "Autorização de isenção de IPI para Pessoa com Deficiência (PDF)"
      );
    }
    if (!hasProtocolo) {
      missing.push("Número do Protocolo SISEN");
    }
    if (!hasValidade) {
      missing.push("Data de validade da autorização");
    }
    if (!hasCodigo) {
      missing.push("Código de Autenticidade");
    }

    if (missing.length > 0) {
      setMissingFields(missing);
      setShowMissingDocs(true);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setFeedbackState("success");
      setFeedbackMessage(
        "Processo salvo com sucesso. Protocolo gerado: 2026/00019283"
      );
      setSubmitting(false);
    }, 2000);
  };

  const SectionHeader = ({ icon: Icon, title, editPath }: SectionHeaderProps) => (
    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-[#2A66D9]" />
        <h3 className="text-[#101828] font-bold text-xl">{title}</h3>
      </div>
      <button
        onClick={() => navigate(editPath)}
        className="text-[#2A66D9] hover:text-[#1e4fb8] text-sm font-semibold flex items-center gap-1"
      >
        <Pencil className="w-4 h-4" /> Editar
      </button>
    </div>
  );

  if (feedbackState === "success") {
    return (
      <div className="animate-fade-in bg-white rounded-[10px] border border-[#E5E7EB] p-10 text-center shadow-sm max-w-2xl mx-auto mt-10">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-semibold text-[#101828] mb-3">
          Solicitação enviada com sucesso!
        </h2>
        <p className="text-[#4A5565] mb-6">{feedbackMessage}</p>
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-4 mb-8 text-sm text-[#4A5565] text-left">
          <p className="font-bold text-[#101828] mb-2">Próximos passos:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#4A5565]">
            <li>Você pode acompanhar o andamento pelo sistema e-Process.</li>
            <li>A análise da solicitação tem prazo médio de 15 dias úteis.</li>
            <li>Você receberá notificações por e-mail sobre o status.</li>
          </ul>
        </div>
        <button
          onClick={() => navigate("/servico/isencao-icms-pcd")}
          className="h-12 px-8 rounded-[10px] bg-[#2A66D9] text-white font-semibold hover:bg-[#1e4fb8] transition-colors"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#101828] mb-2">
          Revisão final
        </h1>
        <p className="text-[#4A5565] text-sm">
          Confira todos os dados informados antes de enviar sua solicitação
          para a Secretaria de Fazenda.
        </p>
      </div>

      {feedbackState === "error" && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3 mb-6 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="text-sm text-red-800">
            <span className="font-bold block mb-1">Erro de Validação</span>
            {feedbackMessage}
          </div>
        </div>
      )}

      {feedbackState === "business_rule" && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3 mb-6 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <span className="font-bold block mb-1">
              Atenção (Regra de Negócio)
            </span>
            {feedbackMessage}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
        <div className="p-6 md:p-8 space-y-10">
          {/* Tipo de Solicitação e Beneficiário */}
          <section>
            <SectionHeader
              icon={User}
              title="Identificação do Beneficiário"
              editPath="/isencao-pcd/identificacao"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase">
                  Tipo de Solicitação
                </span>
                <p className="font-medium text-gray-800">
                  Pessoa com Deficiência (Representante Legal)
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase">
                  Nome do Beneficiário
                </span>
                <p className="font-medium text-gray-800">JOÃO DA SILVA SAURO</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase">
                  CPF
                </span>
                <p className="font-medium text-gray-800">123.456.789-00</p>
              </div>
            </div>
          </section>

          {/* Representante Legal */}
          <section>
            <SectionHeader
              icon={Shield}
              title="Representante Legal"
              editPath="/isencao-pcd/representante"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase">
                  Nome do Representante
                </span>
                <p className="font-medium text-gray-800">MARIA DA SILVA SAURO</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase">
                  Vínculo
                </span>
                <p className="font-medium text-gray-800">Tutor(a)</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase">
                  CPF
                </span>
                <p className="font-medium text-gray-800">987.654.321-00</p>
              </div>
            </div>
          </section>

          {/* Documentos */}
          <section>
            <SectionHeader
              icon={FileText}
              title="Documentos Anexados"
              editPath="/isencao-pcd/laudo-medico"
            />
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Laudo Médico (Junta Detran-MT/SUS)
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded">
                  laudo_medico_oficial.pdf
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Autorização de Isenção IPI
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded">
                  isencao_ipi_rfb.pdf
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Comprovante de Representação Legal
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded">
                  termo_tutela_oficial.pdf
                </span>
              </div>
            </div>
          </section>

          {/* Dados da Compra / Veículo */}
          <section>
            <SectionHeader
              icon={Car}
              title="Dados do Veículo e Compra"
              editPath="/isencao-pcd/veiculo"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-700">
                    Concessionária
                  </span>
                </div>
                <p className="text-sm text-gray-800">
                  CONCESSIONARIA MATO GROSSO VEICULOS LTDA
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  CNPJ: 00.000.000/0001-00
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-700">
                    Fabricante
                  </span>
                </div>
                <p className="text-sm text-gray-800">
                  MONTADORA NACIONAL DO BRASIL S/A
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  CNPJ: 11.111.111/0001-11
                </p>
              </div>

              <div className="sm:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-xs text-gray-500 font-semibold uppercase block mb-2">
                  Veículo Selecionado
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-800 text-xl">
                      HYUNDAI/CRETA 1.0 AT
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                        Direção Elétrica
                      </span>
                      <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                        Transmissão Automática
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-500 font-semibold uppercase block">
                      Valor Declarado
                    </span>
                    <p className="text-[#101828] font-bold text-xl">
                      R$ 119.990,00
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-center justify-between bg-[#EFF6FF] p-4 rounded-[10px] border border-[#2A66D9]/20">
                <span className="text-sm font-bold text-[#101828]">
                  Isenção de IPVA
                </span>
                <span className="bg-[#2A66D9] text-white px-3 py-1 rounded-full text-xs font-bold">
                  Solicitado
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white p-6 rounded-[10px] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 text-sm text-[#4A5565]">
          <Info className="w-5 h-5 text-[#6A7282]" />
          <p>
            Declaro, sob as penas da lei, que as informações prestadas são
            verdadeiras.
          </p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <button
            onClick={() => navigate("/isencao-pcd/ipva")}
            disabled={submitting}
            className="flex-1 sm:flex-none h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`flex-1 sm:flex-none h-12 px-8 rounded-[10px] bg-[#2A66D9] text-white font-semibold hover:bg-[#1e4fb8] transition-colors shadow-sm flex items-center justify-center gap-2 ${
              submitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {submitting ? "Enviando..." : "Enviar Solicitação"}
          </button>
        </div>
      </div>

      {/* Modal de Documentos Faltantes */}
      <Dialog.Root open={showMissingDocs} onOpenChange={setShowMissingDocs}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[16px] shadow-xl max-w-2xl w-[90vw] max-h-[90vh] overflow-auto z-50 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                <AlertCircle
                  className="w-7 h-7 text-[#D97706]"
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1">
                <Dialog.Title className="text-xl font-bold text-[#101828] mb-2">
                  Documentos ou informações faltantes
                </Dialog.Title>
                <Dialog.Description className="text-base text-[#6B7280] leading-relaxed">
                  Não foi possível gerar o protocolo. Para continuar a
                  solicitação, você precisa fornecer:
                </Dialog.Description>
              </div>
            </div>

            <div className="bg-[#FFFBEB] border-l-4 border-[#F59E0B] rounded-r-[12px] p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-[#D97706]" />
                </div>
                <h3 className="font-bold text-[#78350F] text-base leading-tight">
                  Esses documentos e informações são necessários para
                  continuar a solicitação
                </h3>
              </div>
              <ul className="space-y-3 pl-0">
                {missingFields.map((field, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FDE68A] text-[#92400E] flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-base text-[#78350F] font-medium pt-1">
                      {field}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[12px] p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#2A66D9] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-[#1E40AF] text-base leading-tight">
                  O que você precisa fazer:
                </h4>
              </div>
              <ul className="text-base text-[#1E40AF] space-y-3 pl-0">
                <li className="flex items-start gap-3">
                  <span className="text-[#2A66D9] font-bold text-lg leading-none mt-0.5">
                    •
                  </span>
                  <span>
                    Anexe o documento de autorização de IPI em formato PDF;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2A66D9] font-bold text-lg leading-none mt-0.5">
                    •
                  </span>
                  <span>
                    Preencha todos os campos obrigatórios com as informações
                    do documento;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2A66D9] font-bold text-lg leading-none mt-0.5">
                    •
                  </span>
                  <span>
                    Clique em "Continuar" novamente após preencher os dados.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog.Close asChild>
                <button className="flex-1 h-14 px-6 bg-[#2A66D9] text-white font-bold rounded-[10px] hover:bg-[#1e4fb8] transition-colors text-base shadow-sm">
                  Entendi, vou preencher
                </button>
              </Dialog.Close>
              <button
                onClick={() => {
                  setShowMissingDocs(false);
                  navigate("/isencao-pcd/isencao-ipi");
                }}
                className="flex-1 h-14 px-6 bg-white border-2 border-[#D1D5DC] text-[#364153] font-semibold rounded-[10px] hover:bg-gray-50 transition-colors text-base"
              >
                Voltar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

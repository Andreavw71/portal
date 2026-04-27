import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  UploadCloud,
  CheckCircle,
  FileText,
  Trash2,
  AlertCircle,
  Eye,
  Download,
  Info,
  ChevronLeft,
} from "lucide-react";
import { ProgressoSolicitacaoSidebar } from "../../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../../hooks/useGerenciadorEtapas";

const TIPOS_DEFICIENCIA = [
  { id: "amputacao", label: "Amputação ou ausência de membro" },
  { id: "deformidade", label: "Deformidade congênita ou adquirida em membros" },
  { id: "hemiparesia", label: "Hemiparesia" },
  { id: "hemiplegia", label: "Hemiplegia" },
  { id: "mental_autismo", label: "Mental / Autismo" },
  { id: "monoparesia", label: "Monoparesia" },
  { id: "monoplegia", label: "Monoplegia" },
  { id: "paraparesia", label: "Paraparesia" },
  { id: "paraplegia", label: "Paraplegia" },
  { id: "tetraparesia", label: "Tetraparesia" },
  { id: "tetraplegia", label: "Tetraplegia" },
  { id: "triparesia", label: "Triparesia" },
  { id: "triplegia", label: "Triplegia" },
  { id: "visual", label: "Visual" },
  { id: "auditiva", label: "Auditiva" },
  { id: "multipla", label: "Múltipla" },
];

const RESTRICOES_CNH = [
  {
    id: "acelerador_esquerda",
    label: "Obrigatório o uso de acelerador à esquerda",
  },
  {
    id: "acelerador_freio_manual",
    label: "Obrigatório o uso de acelerador e freio manual",
  },
  {
    id: "adaptacao_painel_volante",
    label:
      "Obrigatório o uso de adaptação dos comandos de painel ao volante",
  },
  {
    id: "adaptacao_membros_inferiores",
    label:
      "Obrigatório o uso de adaptação dos comandos de painel para os membros inferiores e/ou outras partes do corpo",
  },
  {
    id: "empunhadura_volante",
    label: "Obrigatório o uso de empunhadura/manopla/pomo no volante",
  },
  { id: "outras", label: "Outras (especificar)" },
];

export function IsencaoPcdLaudoMedicoPage() {
  const navigate = useNavigate();
  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";
  const { etapas } = useGerenciadorEtapas(tipoPcD);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tiposDeficienciaSelecionados, setTiposDeficienciaSelecionados] =
    useState<string[]>([]);
  const [restricoesSelecionadas, setRestricoesSelecionadas] = useState<
    string[]
  >([]);
  const [outrasRestricoes, setOutrasRestricoes] = useState<string>("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        setError("O arquivo precisa ser em formato PDF.");
        setFile(null);
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError("O arquivo pode ter no máximo 5MB.");
        setFile(null);
        return;
      }
      setFile(selected);
      setError(null);
    }
  };

  const handleTipoDeficienciaChange = (id: string) => {
    setTiposDeficienciaSelecionados((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleRestricaoChange = (id: string) => {
    setRestricoesSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleViewFile = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    }
  };

  const handleDownloadFile = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleNext = () => {
    setError(null);

    if (!file && tiposDeficienciaSelecionados.length === 0) {
      setError(
        "Pendências registradas: Laudo médico não anexado e tipo de deficiência não selecionado. Você pode continuar, mas precisará completar estas informações antes de gerar o protocolo."
      );
    } else if (!file) {
      setError(
        "Pendência registrada: Laudo médico não anexado. Você pode continuar, mas precisará anexar o documento antes de gerar o protocolo."
      );
    } else if (tiposDeficienciaSelecionados.length === 0) {
      setError(
        "Pendência registrada: Tipo de deficiência não selecionado. Você pode continuar, mas precisará selecionar pelo menos um tipo antes de gerar o protocolo."
      );
    }

    navigate("/isencao-pcd/isencao-ipi");
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
            <span className="font-semibold text-[#2A66D9]">Laudo médico</span>
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
                etapaAtual="laudo"
                etapasCompletas={etapas
                  .filter((e) => e.completa)
                  .map((e) => e.id)}
              />
            </div>
          </div>

          {/* Conteúdo principal - direita */}
          <div className="space-y-6">
            {/* Banner Informativo - Orientação ao Usuário */}
            <div className="bg-[#EFF6FF] border border-[#2A66D9]/20 rounded-[10px] p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#2A66D9] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-[#101828] font-semibold text-sm mb-1">
                  💡 Você pode avançar mesmo sem preencher tudo agora
                </h3>
                <p className="text-[#364153] text-sm leading-relaxed">
                  Seus dados são salvos automaticamente. Você pode continuar
                  preenchendo depois e só precisará ter tudo completo no
                  momento de gerar o protocolo final.
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-[#101828] mb-2">
                Laudo médico
              </h1>
              <p className="text-[#4A5565] text-sm">
                Anexe o laudo médico que comprova a deficiência (apenas
                formato PDF).
              </p>
            </div>

            {/* Upload do Laudo Médico */}
            <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
              <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2A66D9]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-[#101828] font-bold">Laudo médico</h2>
                </div>
              </div>

              <div className="p-6">
                <ul className="list-disc pl-5 text-base text-[#4A5565] font-medium mb-4 space-y-2">
                  <li>Anexe o documento em formato PDF;</li>
                  <li>Verifique se o arquivo está legível;</li>
                  <li>
                    Confira se o documento está completo e assinado, quando
                    exigido.
                  </li>
                </ul>

                {error && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3 mb-6">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-900 font-medium">
                      {error}
                    </div>
                  </div>
                )}

                {!file ? (
                  <label className="border-2 border-dashed border-[#D1D5DC] rounded-[10px] p-5 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#2A66D9] transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-[#2A66D9]/10 rounded-full flex items-center justify-center mb-3 text-[#2A66D9]">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <h3 className="text-[#101828] font-bold text-base mb-1">
                      Selecionar arquivo
                    </h3>
                    <p className="text-[#6A7282] text-sm text-center">
                      Ou arraste e solte seu arquivo PDF aqui. Tamanho máximo:
                      5MB.
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-[10px] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-emerald-800 font-bold text-sm">
                            Arquivo anexado com sucesso
                          </p>
                          <p className="text-emerald-600 text-xs mt-1 truncate max-w-[250px]">
                            {file.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-[8px] transition-colors"
                        title="Remover arquivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleViewFile}
                        className="flex-1 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-[8px] hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar
                      </button>
                      <button
                        onClick={handleDownloadFile}
                        className="flex-1 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-[8px] hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <Download className="w-4 h-4" />
                        Baixar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tipo de Deficiência */}
            <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
              <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB]">
                <h2 className="text-[#101828] font-bold">
                  Selecione os tipos de deficiência do laudo
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIPOS_DEFICIENCIA.map((tipo) => (
                    <label
                      key={tipo.id}
                      className="flex items-start gap-3 p-3 rounded-[8px] border border-[#E5E7EB] hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={tiposDeficienciaSelecionados.includes(
                          tipo.id
                        )}
                        onChange={() => handleTipoDeficienciaChange(tipo.id)}
                        className="mt-1 w-4 h-4 text-[#2A66D9] border-[#D1D5DC] rounded focus:ring-[#2A66D9] focus:ring-2"
                      />
                      <span className="text-base text-[#4A5565] font-medium">
                        {tipo.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Restrições da CNH */}
            <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
              <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB]">
                <h2 className="text-[#101828] font-bold">
                  Selecione os tipos de restrições
                </h2>
                <p className="text-base text-[#6A7282] mt-1">
                  Restrições constantes na CNH (opcional)
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {RESTRICOES_CNH.map((restricao) => (
                    <label
                      key={restricao.id}
                      className="flex items-start gap-3 p-3 rounded-[8px] border border-[#E5E7EB] hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={restricoesSelecionadas.includes(restricao.id)}
                        onChange={() => handleRestricaoChange(restricao.id)}
                        className="mt-1 w-4 h-4 text-[#2A66D9] border-[#D1D5DC] rounded focus:ring-[#2A66D9] focus:ring-2"
                      />
                      <span className="text-base text-[#4A5565] font-medium">
                        {restricao.label}
                      </span>
                    </label>
                  ))}
                </div>

                {restricoesSelecionadas.includes("outras") && (
                  <div className="mt-4">
                    <label className="block text-base font-semibold text-[#364153] mb-2">
                      Especifique outras restrições:
                    </label>
                    <textarea
                      value={outrasRestricoes}
                      onChange={(e) => setOutrasRestricoes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
                      placeholder="Descreva outras restrições..."
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => navigate("/isencao-pcd/validacoes")}
                className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                Voltar
              </button>
              <button
                onClick={handleNext}
                className="h-12 px-6 rounded-[10px] bg-[#2A66D9] text-white font-semibold hover:bg-[#1e4fb8] transition-colors text-sm shadow-sm"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

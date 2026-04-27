import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle,
  AlertCircle,
  UploadCloud,
  Trash2,
  Eye,
  Download,
  FileText,
} from "lucide-react";
import { ProgressoSolicitacaoSidebar } from "../../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../../hooks/useGerenciadorEtapas";

export function IsencaoPcdDisponibilidadeFinanceiraPage() {
  const navigate = useNavigate();
  const [opcao, setOpcao] = useState<"declaracao" | "upload">("declaracao");
  const [concordo, setConcordo] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";
  const { etapas } = useGerenciadorEtapas(tipoPcD);

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
    if (opcao === "declaracao" && !concordo) {
      setError("Você precisa concordar com a declaração para continuar.");
      return;
    }
    if (opcao === "upload" && !file) {
      setError(
        "Anexe o comprovante de disponibilidade financeira em formato PDF."
      );
      return;
    }

    if (tipoPcD === "terceiro") {
      navigate("/isencao-pcd/condutores");
    } else {
      navigate("/isencao-pcd/concessionaria");
    }
  };

  return (
    <div className="animate-fade-in pb-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
      {/* Sidebar de progresso - lateral esquerda */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ProgressoSolicitacaoSidebar
            etapaAtual="disponibilidade"
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
            Disponibilidade Financeira
          </h1>
          <p className="text-[#4A5565] text-sm">
            Escolha uma das opções para comprovar disponibilidade financeira
            para aquisição do veículo.
          </p>
        </div>

        {/* Botões de escolha lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setOpcao("declaracao")}
            className={`p-6 rounded-[10px] border-2 transition-all text-left ${
              opcao === "declaracao"
                ? "border-[#2A66D9] bg-[#EFF6FF]"
                : "border-[#E5E7EB] bg-white hover:border-[#2A66D9]/50"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  opcao === "declaracao" ? "bg-[#2A66D9]" : "bg-[#F3F4F6]"
                }`}
              >
                <FileText
                  className={`w-5 h-5 ${
                    opcao === "declaracao" ? "text-white" : "text-[#6B7280]"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold mb-1 ${
                    opcao === "declaracao"
                      ? "text-[#2A66D9]"
                      : "text-[#101828]"
                  }`}
                >
                  Declarar disponibilidade financeira
                </h3>
                <p className="text-sm text-[#4A5565]">
                  Declarar que possuo disponibilidade financeira para adquirir
                  o veículo
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setOpcao("upload")}
            className={`p-6 rounded-[10px] border-2 transition-all text-left ${
              opcao === "upload"
                ? "border-[#2A66D9] bg-[#EFF6FF]"
                : "border-[#E5E7EB] bg-white hover:border-[#2A66D9]/50"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  opcao === "upload" ? "bg-[#2A66D9]" : "bg-[#F3F4F6]"
                }`}
              >
                <UploadCloud
                  className={`w-5 h-5 ${
                    opcao === "upload" ? "text-white" : "text-[#6B7280]"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold mb-1 ${
                    opcao === "upload" ? "text-[#2A66D9]" : "text-[#101828]"
                  }`}
                >
                  Anexar comprovante de disponibilidade
                </h3>
                <p className="text-sm text-[#4A5565]">
                  Enviar comprovante em PDF (extrato bancário, carta de
                  crédito, etc.)
                </p>
              </div>
            </div>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800 font-medium">{error}</div>
          </div>
        )}

        {/* Declaração */}
        {opcao === "declaracao" && (
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
            <div className="bg-[#2A66D9] px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold">
                  Declaração de Disponibilidade Financeira
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-6 mb-4">
                <p className="text-base text-[#4A5565] leading-relaxed">
                  Declaro, para os devidos fins de direito, que possuo
                  disponibilidade financeira suficiente para a aquisição do
                  veículo objeto desta solicitação de isenção de ICMS, estando
                  ciente de que a concessão do benefício fiscal está
                  condicionada à comprovação desta capacidade, caso solicitado
                  pela autoridade competente.
                </p>
                <p className="text-base text-[#4A5565] leading-relaxed mt-4">
                  Declaro, ainda, estar ciente de que a prestação de informação
                  falsa configura crime previsto no Art. 299 do Código Penal
                  Brasileiro, sujeitando-me às penalidades da lei.
                </p>
              </div>

              <label className="flex items-start gap-3 p-4 border-2 border-[#E5E7EB] rounded-[10px] hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={concordo}
                  onChange={(e) => setConcordo(e.target.checked)}
                  className="mt-0.5 w-5 h-5 text-[#2A66D9] border-[#D1D5DC] rounded focus:ring-[#2A66D9] focus:ring-2"
                />
                <span className="text-base text-[#364153] font-semibold">
                  Li e concordo com a declaração acima. Estou ciente de que a
                  declaração falsa implica em responsabilização criminal.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Upload de comprovante */}
        {opcao === "upload" && (
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
            <div className="bg-[#2A66D9] px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <UploadCloud className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold">
                  Comprovante de Disponibilidade Financeira
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-4 mb-4">
                <h3 className="text-[#101828] font-bold mb-3">
                  Instruções para o comprovante:
                </h3>
                <ul className="list-disc pl-5 text-sm text-[#4A5565] space-y-2">
                  <li>Anexe o documento em formato PDF</li>
                  <li>
                    Exemplos: extrato bancário, carta de crédito pré-aprovado,
                    comprovante de renda, declaração de IR
                  </li>
                  <li>
                    Verifique se o arquivo está legível e atualizado (até 90
                    dias)
                  </li>
                  <li>Tamanho máximo: 5MB</li>
                </ul>
              </div>

              {!file ? (
                <label className="border-2 border-dashed border-[#D1D5DC] rounded-[10px] p-8 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#2A66D9] transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-[#2A66D9]/10 rounded-full flex items-center justify-center mb-4 text-[#2A66D9]">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <h3 className="text-[#101828] font-bold text-base mb-2">
                    Clique para selecionar o arquivo
                  </h3>
                  <p className="text-[#6A7282] text-sm text-center">
                    Ou arraste e solte o arquivo PDF aqui
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
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => {
              const tipo = sessionStorage.getItem("tipoPcD") || "";
              if (tipo === "representante") {
                navigate("/isencao-pcd/doc-representacao");
              } else {
                navigate("/isencao-pcd/isencao-ipi");
              }
            }}
            className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleNext}
            className="h-12 px-6 rounded-[10px] bg-[#2A66D9] text-white font-semibold hover:bg-[#1e4fb8] transition-colors shadow-sm"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

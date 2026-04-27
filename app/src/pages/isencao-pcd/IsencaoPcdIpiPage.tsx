import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  UploadCloud,
  CheckCircle,
  Stamp,
  Trash2,
  AlertCircle,
  Eye,
  Download,
  Info,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import autorizacaoExemplo from "../../../imports/autorizacao-ipi-completa.png";
import { ProgressoSolicitacaoSidebar } from "../../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../../hooks/useGerenciadorEtapas";

export function IsencaoPcdIpiPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [protocoloSISEN, setProtocoloSISEN] = useState<string>("");
  const [validade, setValidade] = useState<string>("");
  const [codigoAutenticidade, setCodigoAutenticidade] = useState<string>("");

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
    const tipoPcDAtual = sessionStorage.getItem("tipoPcD") || "";

    if (tipoPcDAtual === "representante") {
      navigate("/isencao-pcd/doc-representacao");
    } else {
      navigate("/isencao-pcd/disponibilidade-financeira");
    }
  };

  return (
    <div className="animate-fade-in pb-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
      {/* Sidebar de progresso - lateral esquerda */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ProgressoSolicitacaoSidebar
            etapaAtual="ipi"
            etapasCompletas={etapas
              .filter((e) => e.completa)
              .map((e) => e.id)}
          />
        </div>
      </div>

      {/* Conteúdo principal - direita */}
      <div>
        {/* Upload do Comprovante */}
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
          <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2A66D9]">
              <Stamp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[#101828] font-bold">
                Autorização de isenção de IPI para Pessoa com Deficiência
              </h2>
            </div>
          </div>

          <div className="p-6">
            <ul className="list-disc pl-5 text-sm text-gray-700 font-medium mb-4 space-y-2">
              <li>Anexe o documento em formato PDF;</li>
              <li>O arquivo deve estar legível e válido.</li>
            </ul>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800 font-medium">{error}</div>
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
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
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
                    className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    title="Remover arquivo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleViewFile}
                    className="flex-1 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Eye className="w-4 h-4" />
                    Visualizar
                  </button>
                  <button
                    onClick={handleDownloadFile}
                    className="flex-1 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    Baixar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dados da Autorização */}
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
          <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-[#101828] font-bold">
              Dados da Autorização de Isenção de IPI para Pessoa com
              Deficiência
            </h2>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="mt-2 flex items-center gap-2 text-sm text-[#2A66D9] hover:text-[#1e4fb8] font-semibold">
                  <Info className="w-4 h-4" />
                  Onde encontrar essas informações no documento?
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-fade-in" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] shadow-xl max-w-4xl w-[90vw] max-h-[90vh] overflow-auto z-50 p-6">
                  <Dialog.Title className="text-2xl font-bold text-[#101828] mb-4">
                    Autorização de Isenção de IPI
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-600 mb-4">
                    Veja onde localizar as informações solicitadas no
                    documento de autorização:
                  </Dialog.Description>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <img
                      src={autorizacaoExemplo}
                      alt="Exemplo de documento de Autorização de Isenção de IPI para Pessoa com Deficiência, mostrando: no topo - Protocolo SISEN Nº 13880.2(...) e Data da Transmissão; no corpo - seção de Autorização com os detalhes; no rodapé - Essa autorização é válida até (data) e Código de Autenticidade"
                      className="w-full rounded-lg border border-gray-300"
                    />
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 bg-[#EFF6FF] p-3 rounded-[8px]">
                      <div className="w-6 h-6 rounded-full bg-[#2A66D9] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        1
                      </div>
                      <div>
                        <strong className="text-[#101828]">
                          Protocolo SISEN Nº:
                        </strong>
                        <p className="text-[#4A5565] mt-1">
                          Localizado no topo do documento, logo após o título.
                          Formato:{" "}
                          <code className="bg-white px-2 py-0.5 rounded border border-[#BFDBFE] text-[#2A66D9] font-mono text-xs">
                            XXXXX.XXXXXX/2026-XX
                          </code>
                        </p>
                        <p className="text-[#4A5565] mt-1 text-xs">
                          Exemplo: <strong>13880.720881/2026-71</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#EFF6FF] p-3 rounded-[8px]">
                      <div className="w-6 h-6 rounded-full bg-[#2A66D9] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        2
                      </div>
                      <div>
                        <strong className="text-[#101828]">
                          Data de Validade:
                        </strong>
                        <p className="text-[#4A5565] mt-1">
                          Encontra-se próximo ao final do documento com a
                          frase "Essa autorização é válida até..."
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#EFF6FF] p-3 rounded-[8px]">
                      <div className="w-6 h-6 rounded-full bg-[#2A66D9] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        3
                      </div>
                      <div>
                        <strong className="text-[#101828]">
                          Código de Autenticidade:
                        </strong>
                        <p className="text-[#4A5565] mt-1">
                          Código alfanumérico localizado no rodapé do
                          documento. Formato:{" "}
                          <code className="bg-white px-2 py-0.5 rounded border border-[#BFDBFE] text-[#2A66D9] font-mono text-xs">
                            XXXX.XXXX.XXXX.XXXX
                          </code>
                        </p>
                        <p className="text-[#4A5565] mt-1 text-xs">
                          Exemplo: <strong>C20.4D98.3BB1.31C9</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Dialog.Close asChild>
                    <button className="mt-6 w-full h-12 px-6 bg-[#2A66D9] text-white font-semibold rounded-[10px] hover:bg-[#1e4fb8] transition-colors">
                      Entendi
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div className="p-6 space-y-4">
            {/* Protocolo SISEN */}
            <div>
              <label
                htmlFor="protocolo"
                className="block text-sm font-semibold text-[#364153] mb-2"
              >
                Protocolo SISEN Nº:{" "}
                <span className="text-[#E7000B]">*</span>
              </label>
              <input
                type="text"
                id="protocolo"
                value={protocoloSISEN}
                onChange={(e) => setProtocoloSISEN(e.target.value)}
                placeholder="Ex: 13880.720881/2026-71"
                className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
              />
            </div>

            {/* Validade */}
            <div>
              <label
                htmlFor="validade"
                className="block text-sm font-semibold text-[#364153] mb-2"
              >
                Validade: <span className="text-[#E7000B]">*</span>
              </label>
              <input
                type="date"
                id="validade"
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
                placeholder="DD/MM/AAAA"
                className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
              />
            </div>

            {/* Código de Autenticidade */}
            <div>
              <label
                htmlFor="codigo"
                className="block text-sm font-semibold text-[#364153] mb-2"
              >
                Código de Autenticidade:{" "}
                <span className="text-[#E7000B]">*</span>
              </label>
              <input
                type="text"
                id="codigo"
                value={codigoAutenticidade}
                onChange={(e) => setCodigoAutenticidade(e.target.value)}
                placeholder="Ex: C20.4D98.3BB1.31C9"
                className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/isencao-pcd/laudo-medico")}
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

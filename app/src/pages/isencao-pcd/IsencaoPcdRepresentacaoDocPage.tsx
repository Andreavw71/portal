import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  UploadCloud,
  CheckCircle,
  Scale,
  Trash2,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react";
import { ProgressoSolicitacaoSidebar } from "../../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../../hooks/useGerenciadorEtapas";

export function IsencaoPcdRepresentacaoDocPage() {
  const navigate = useNavigate();
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
    if (!file) {
      setError(
        "Anexe o documento de representação legal em formato PDF para continuar."
      );
      return;
    }
    navigate("/isencao-pcd/disponibilidade-financeira");
  };

  return (
    <div className="animate-fade-in pb-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
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
      <div>
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
          <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2A66D9]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[#101828] font-bold">
                Comprovante de Representação Legal
              </h2>
            </div>
          </div>

          <div className="p-6">
            <ul className="list-disc pl-5 text-base text-[#4A5565] font-medium mb-4 space-y-2">
              <li>Anexe o documento em formato PDF;</li>
              <li>Verifique se o arquivo está legível;</li>
              <li>Use documento oficial ou procuração válida, quando aplicável.</li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <span className="font-bold block mb-1">Exemplos:</span>
                procuração; termo de curatela; termo de tutela; outro documento
                oficial aplicável.
              </div>
            </div>

            {error && (
              <div className="bg-[#FEF2F2] border border-[#FFC9C9] p-4 rounded-[8px] flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-[#C10007] mt-0.5" />
                <div className="text-sm text-[#C10007] font-medium">{error}</div>
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
                  Ou arraste e solte seu arquivo PDF aqui. Tamanho máximo: 5MB.
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

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/isencao-pcd/isencao-ipi")}
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

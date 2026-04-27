import { useState } from "react";
import { useNavigate } from "react-router";
import { FileUp, FileText, UploadCloud, Info } from "lucide-react";

export function IsencaoPcdDocumentosPage() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const toggleFile = (fileType: string) => {
    if (uploadedFiles.includes(fileType)) {
      setUploadedFiles(uploadedFiles.filter((f) => f !== fileType));
    } else {
      setUploadedFiles([...uploadedFiles, fileType]);
    }
  };

  const handleNext = () => {
    navigate("/isencao-pcd/veiculo");
  };

  const renderUploadBox = (
    title: string,
    description: string,
    fileType: string,
    required = true
  ) => {
    const isUploaded = uploadedFiles.includes(fileType);
    return (
      <div
        className={`p-5 rounded-xl border ${
          isUploaded
            ? "border-emerald-300 bg-emerald-50"
            : "border-dashed border-gray-300 bg-gray-50"
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
              {title} {required && <span className="text-red-500">*</span>}
            </h4>
            <p className="text-xs text-gray-500 mt-1 max-w-[80%]">
              {description}
            </p>
          </div>
          {isUploaded ? (
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              ✓ Anexado
            </div>
          ) : (
            <button
              onClick={() => toggleFile(fileType)}
              className="bg-white border border-[#E5E7EB] text-[#2A66D9] hover:bg-[#2A66D9] hover:text-white px-4 py-2 rounded-[8px] text-xs font-bold transition-colors flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Anexar
            </button>
          )}
        </div>

        {isUploaded && (
          <div className="bg-white border border-emerald-100 rounded-lg p-3 flex items-center justify-between mt-3 shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-gray-700">
                  documento_digitalizado.pdf
                </p>
                <p className="text-[10px] text-gray-500">2.4 MB</p>
              </div>
            </div>
            <button
              onClick={() => toggleFile(fileType)}
              className="text-red-500 hover:text-red-700 text-xs font-medium underline"
            >
              Remover
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#E5E7EB]">
        <div className="w-12 h-12 bg-[#EFF6FF] rounded-[10px] flex items-center justify-center shrink-0">
          <FileUp className="w-6 h-6 text-[#2A66D9]" />
        </div>
        <div>
          <h2 className="text-[#101828] text-xl font-bold">
            Documentos comprobatórios
          </h2>
          <p className="text-[#4A5565] text-base">
            Anexe os documentos necessários para a análise da isenção
          </p>
        </div>
      </div>

      <div className="mb-8 p-4 bg-[#EFF6FF] border border-[#2A66D9]/20 rounded-[10px] flex gap-3 items-start">
        <Info className="w-5 h-5 text-[#2A66D9] shrink-0 mt-0.5" />
        <p className="text-base text-[#364153]">
          Os documentos devem estar nos formatos PDF, JPG ou PNG, com tamanho
          máximo de 5MB por arquivo. Certifique-se de que todas as informações
          estejam legíveis.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {renderUploadBox(
          "Laudo de Avaliação",
          "Laudo médico emitido pelo SUS ou clínica conveniada ao Detran, com o CID da patologia.",
          "laudo"
        )}

        {renderUploadBox(
          "Comprovante de Endereço",
          "Conta de água, luz ou telefone recente (últimos 90 dias) em nome do requerente.",
          "comprovante_endereco"
        )}

        {renderUploadBox(
          "Declaração de Disponibilidade Financeira",
          "Comprovação de renda ou capacidade financeira para aquisição do veículo.",
          "renda"
        )}

        {renderUploadBox(
          "Autorização (se aplicável)",
          "Documento de curatela, tutela ou procuração, caso a solicitação seja feita por terceiros.",
          "autorizacao",
          false
        )}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
        <button
          onClick={() => navigate("/isencao-pcd/identificacao")}
          className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={handleNext}
          className="h-12 px-6 rounded-[10px] font-semibold transition-all shadow-sm bg-[#2A66D9] text-white hover:bg-[#1e4fb8]"
        >
          Continuar para Veículo
        </button>
      </div>
    </div>
  );
}

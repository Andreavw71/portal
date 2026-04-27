import { useState } from "react";
import { useNavigate } from "react-router";
import { FileText, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

export function IsencaoPcdTermoPage() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    if (accepted) {
      navigate("/isencao-pcd/identificacao");
    } else {
      setShowError(true);
    }
  };

  const toggleAccept = () => {
    setAccepted(!accepted);
    if (showError) setShowError(false);
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E5E7EB]">
        <div className="w-12 h-12 bg-[#EFF6FF] rounded-[10px] flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-[#2A66D9]" />
        </div>
        <div>
          <h2 className="text-[#101828] text-xl font-bold">
            Autorização para uso de seus dados
          </h2>
          <p className="text-[#4A5565] text-base">
            Leia com atenção as informações sobre como a SEFAZ-MT usará seus
            dados.
          </p>
        </div>
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-6 mb-8 shadow-inner">
        <div className="space-y-5 text-base text-[#4A5565] leading-relaxed">
          <div>
            <p className="text-[#364153] leading-relaxed">
              Para analisar seu pedido de autorização, a SEFAZ-MT precisa usar
              as informações que você enviar neste formulário.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#101828] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2A66D9]" />
              Com seus dados, vamos:
            </h3>
            <ul className="space-y-2 ml-7">
              <li className="flex items-start gap-2">
                <span className="text-[#2A66D9] mt-1">•</span>
                <span>Analisar o pedido de isenção de ICMS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A66D9] mt-1">•</span>
                <span>Verificar documentos e informações enviadas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A66D9] mt-1">•</span>
                <span>
                  Consultar bases públicas oficiais, como DETRAN e Receita
                  Federal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A66D9] mt-1">•</span>
                <span>Acompanhar e atualizar o andamento do processo</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#EFF6FF] border-l-4 border-[#2A66D9] p-4 rounded-r-lg">
            <h3 className="font-bold text-[#101828] mb-2">
              Compartilhamento de dados
            </h3>
            <p className="text-[#364153]">
              Seus dados só serão compartilhados com outros órgãos públicos
              quando for necessário para concluir a análise ou quando houver
              exigência legal.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h3 className="font-bold text-amber-900 mb-2">Seus direitos</h3>
            <p className="text-amber-800">
              Você pode solicitar acesso, correção ou exclusão de seus dados a
              qualquer momento, em conformidade com a Lei Geral de Proteção de
              Dados (LGPD).
            </p>
          </div>
        </div>
      </div>

      {showError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 bg-[#FEF2F2] border border-[#FFC9C9] text-[#C10007] px-4 py-3 rounded-[8px] flex items-start gap-2 text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            Você precisa ler e autorizar o uso de seus dados para continuar
            com a solicitação.
          </p>
        </div>
      )}

      <div className="mb-10">
        <label
          className={`flex items-start gap-3 p-5 rounded-[10px] cursor-pointer transition-all border-2 ${
            accepted
              ? "bg-emerald-50 border-emerald-500 shadow-sm"
              : "bg-[#F9FAFB] border-[#E5E7EB] hover:bg-gray-100 hover:border-gray-400"
          }`}
        >
          <div className="mt-1">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-[#D1D5DC] text-emerald-600 focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              checked={accepted}
              onChange={toggleAccept}
            />
          </div>
          <div className="flex-1">
            <span
              className={`block font-bold text-base ${
                accepted ? "text-emerald-800" : "text-[#101828]"
              }`}
            >
              Li e autorizo o uso dos meus dados conforme descrito acima
            </span>
            <span className="text-base text-[#6A7282] mt-1.5 block leading-relaxed">
              Confirmo que li as informações sobre o uso dos meus dados e
              autorizo o tratamento pela SEFAZ-MT para análise do pedido de
              isenção de ICMS.
            </span>
          </div>
        </label>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
        <button
          onClick={() => navigate("/isencao-pcd")}
          className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={handleNext}
          className={`h-12 flex items-center gap-2 px-6 rounded-[10px] font-semibold transition-all shadow-sm ${
            accepted
              ? "bg-[#2A66D9] text-white hover:bg-[#1e4fb8]"
              : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
          }`}
          disabled={!accepted}
        >
          {accepted && <ShieldCheck className="w-5 h-5" />}
          Continuar
        </button>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";
import { CheckCircle } from "lucide-react";
import { HeaderSefaz } from "../components/landing/HeaderSefaz";

export function IsencaoPcdSucessoPage() {
  const navigate = useNavigate();
  const protocolo = "ISENCAO-2024-998827361";

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <HeaderSefaz />

      <main className="flex-1 flex items-center justify-center p-4 py-20 mt-16">
        <div className="bg-white max-w-2xl w-full rounded-[10px] shadow-lg border border-[#E5E7EB] overflow-hidden relative">
          <div className="h-2 w-full bg-emerald-500 absolute top-0 left-0"></div>

          <div className="p-10 md:p-14 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </div>

            <h1 className="text-2xl font-semibold text-[#101828] mb-4">
              Solicitação enviada
            </h1>

            <p className="text-[#4A5565] text-base mb-10 max-w-md mx-auto leading-relaxed">
              Seu pedido foi registrado com sucesso. Guarde o número do
              protocolo para acompanhamento.
            </p>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-6 mb-10 mx-auto max-w-sm relative group cursor-pointer hover:border-emerald-200 transition-colors">
              <span className="block text-xs uppercase font-bold text-[#6A7282] tracking-wider mb-2">
                Número do protocolo
              </span>
              <span className="block text-2xl font-mono font-bold text-[#2A66D9] tracking-tight group-hover:text-emerald-600 transition-colors">
                {protocolo}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <button
                onClick={() => navigate("/servico/isencao-icms-pcd")}
                className="h-12 flex items-center justify-center gap-2 px-6 rounded-[10px] bg-[#2A66D9] text-white font-semibold hover:bg-[#1e4fb8] transition-all shadow-sm hover:shadow-md w-full"
              >
                Voltar ao início
              </button>
            </div>
          </div>

          <div className="bg-[#EFF6FF] border-t border-[#E5E7EB] p-6 text-center">
            <p className="text-base text-[#101828] font-medium">
              Você poderá consultar a situação do pedido na área de
              acompanhamento do sistema.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

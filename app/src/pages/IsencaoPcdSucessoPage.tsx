import { Link } from "react-router";
import { CheckCircle2 } from "lucide-react";

export function IsencaoPcdSucessoPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 md:p-12 text-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#DCFCE7] mb-6">
          <CheckCircle2 className="w-9 h-9 text-[#16A34A]" />
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
          Solicitação enviada com sucesso
        </h1>
        <p className="text-base text-[#4B5563] leading-relaxed mb-8">
          Sua solicitação de Isenção de ICMS foi recebida. Você poderá
          acompanhar o andamento pelo painel de processos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/isencao-pcd/acompanhamento"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#2A66D9] text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Acompanhar processo
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#E5E7EB] text-[#374151] font-semibold hover:bg-gray-50 transition-colors"
          >
            Voltar à ficha do serviço
          </Link>
        </div>
      </div>
    </div>
  );
}

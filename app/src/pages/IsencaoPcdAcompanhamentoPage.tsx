import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  ChevronLeft,
} from "lucide-react";

const SOLICITACOES_MOCK = [
  {
    id: "2024-001234",
    tipo: "Isenção de ICMS para PcD",
    data: "15/03/2024",
    status: "em_analise",
    statusTexto: "Em análise",
    etapa: "Análise de documentos",
    progresso: 60,
  },
  {
    id: "2024-001156",
    tipo: "Isenção de IPVA para PcD",
    data: "02/03/2024",
    status: "aprovado",
    statusTexto: "Aprovado",
    etapa: "Concluído",
    progresso: 100,
  },
  {
    id: "2024-000987",
    tipo: "Isenção de ICMS para PcD",
    data: "18/02/2024",
    status: "pendente",
    statusTexto: "Pendente de documentos",
    etapa: "Aguardando complementação",
    progresso: 40,
  },
];

export function IsencaoPcdAcompanhamentoPage() {
  const navigate = useNavigate();
  const [protocolo, setProtocolo] = useState("");
  const [cpf, setCpf] = useState("");
  const [solicitacoes] = useState(SOLICITACOES_MOCK);
  const [filtradas, setFiltradas] = useState(SOLICITACOES_MOCK);

  const handleBuscar = () => {
    let resultado = solicitacoes;

    if (protocolo.trim()) {
      resultado = resultado.filter((s) => s.id.includes(protocolo));
    }

    if (cpf.trim()) {
      // Em produção, a busca seria feita no backend
      resultado = resultado;
    }

    setFiltradas(resultado);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "em_analise":
        return <Clock className="w-5 h-5" />;
      case "aprovado":
        return <CheckCircle className="w-5 h-5" />;
      case "pendente":
        return <AlertCircle className="w-5 h-5" />;
      case "indeferido":
        return <XCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_analise":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "aprovado":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pendente":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "indeferido":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="animate-fade-in pb-12 max-w-[1100px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/servico/isencao-icms-pcd")}
          className="flex items-center gap-2 text-[#2A66D9] hover:text-[#1e4fb8] mb-4 font-semibold text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para ficha do serviço
        </button>
        <h1 className="text-2xl font-semibold text-[#101828] mb-2">
          Acompanhar pedido
        </h1>
        <p className="text-[#4A5565] text-sm">
          Consulte o andamento das suas solicitações de isenção de ICMS e IPVA
          para PcD.
        </p>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
        <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#2A66D9]">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-[#101828] font-bold">Buscar solicitação</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="protocolo"
                className="block text-base font-semibold text-[#364153] mb-2"
              >
                Número do protocolo
              </label>
              <input
                type="text"
                id="protocolo"
                value={protocolo}
                onChange={(e) => setProtocolo(e.target.value)}
                placeholder="Ex: 2024-001234"
                className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block text-base font-semibold text-[#364153] mb-2"
              >
                CPF do beneficiário (opcional)
              </label>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
              />
            </div>
          </div>

          <button
            onClick={handleBuscar}
            className="h-12 w-full md:w-auto px-6 bg-[#2A66D9] text-white rounded-[10px] font-semibold hover:bg-[#1e4fb8] transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>
      </div>

      {/* Solicitações */}
      <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm">
        <div className="bg-[#2A66D9]/5 px-6 py-4 border-b border-[#E5E7EB]">
          <h2 className="text-[#101828] font-bold">Suas solicitações</h2>
          <p className="text-base text-[#6A7282] mt-1">
            {filtradas.length}{" "}
            {filtradas.length === 1
              ? "solicitação encontrada"
              : "solicitações encontradas"}
          </p>
        </div>

        <div className="p-6">
          {filtradas.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-[#4A5565] text-sm">
                Nenhuma solicitação encontrada.
              </p>
              <p className="text-[#6A7282] text-xs mt-2">
                Verifique os dados informados ou inicie uma nova solicitação.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtradas.map((solicitacao) => (
                <div
                  key={solicitacao.id}
                  className="border border-[#E5E7EB] rounded-[10px] p-5 hover:border-[#2A66D9] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-[#101828] font-bold text-base">
                          {solicitacao.tipo}
                        </h3>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${getStatusColor(
                            solicitacao.status
                          )}`}
                        >
                          {getStatusIcon(solicitacao.status)}
                          {solicitacao.statusTexto}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-semibold">Protocolo:</span>{" "}
                          {solicitacao.id}
                        </p>
                        <p>
                          <span className="font-semibold">Data:</span>{" "}
                          {solicitacao.data}
                        </p>
                        <p>
                          <span className="font-semibold">Etapa atual:</span>{" "}
                          {solicitacao.etapa}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        alert(
                          `Visualizando detalhes do protocolo ${solicitacao.id}`
                        )
                      }
                      className="h-10 px-4 bg-[#2A66D9] text-white rounded-[10px] hover:bg-[#1e4fb8] transition-colors text-sm font-semibold flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Detalhes
                    </button>
                  </div>

                  {/* Barra de progresso */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#4A5565]">
                        Progresso
                      </span>
                      <span className="text-xs font-bold text-[#2A66D9]">
                        {solicitacao.progresso}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2A66D9] h-2 rounded-full transition-all"
                        style={{ width: `${solicitacao.progresso}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

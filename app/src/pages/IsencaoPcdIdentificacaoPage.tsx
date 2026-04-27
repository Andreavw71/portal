import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Info, RotateCcw } from "lucide-react";
import { InformacoesContatoCard } from "../components/InformacoesContatoCard";
import { ProgressoSolicitacaoSidebar } from "../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../hooks/useGerenciadorEtapas";
import { useIsencaoPcd } from "../contexts/IsencaoPcdContext";

export function IsencaoPcdIdentificacaoPage() {
  const navigate = useNavigate();
  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";

  const { etapas, marcarEtapaCompleta, obterEtapa, reiniciarSolicitacao } =
    useGerenciadorEtapas(tipoPcD);

  const { updateFormData } = useIsencaoPcd();

  const [formData, setFormData] = useState({
    nome:
      tipoPcD === "representante"
        ? "Maria Santos Oliveira"
        : "João Silva da Conceição",
    cpf: tipoPcD === "representante" ? "987.654.321-00" : "123.456.789-00",
    endereco:
      tipoPcD === "representante"
        ? "Avenida Principal, 456, Bairro Jardim"
        : "Rua das Flores, 123, Bairro Centro",
    municipio: "Cuiabá",
    uf: "MT",
    telefone: "",
    email: "",
  });

  useEffect(() => {
    const etapaSalva = obterEtapa("identificacao");
    if (etapaSalva?.dados) {
      setFormData(etapaSalva.dados);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [hasError, setHasError] = useState(false);

  const handleSubmit = () => {
    setHasError(false);

    if (!formData.telefone || !formData.email) {
      setHasError(true);
      alert("Por favor, preencha telefone e e-mail antes de continuar.");
      return;
    }

    if (tipoPcD === "representante") {
      marcarEtapaCompleta("representante", formData);
      updateFormData("representante", formData);
      navigate("/isencao-pcd/beneficiario");
    } else {
      marcarEtapaCompleta("identificacao", formData);
      updateFormData("identificacao", formData);
      navigate("/isencao-pcd/validacoes");
    }
  };

  const handleReiniciar = () => {
    if (
      confirm(
        "Tem certeza que deseja reiniciar a solicitação? Todos os dados serão perdidos."
      )
    ) {
      reiniciarSolicitacao();
      navigate("/servico/isencao-icms-pcd");
    }
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
            <span className="font-semibold text-[#2A66D9]">
              Solicitação de Isenção de ICMS
            </span>
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
                etapaAtual="identificacao"
                etapasCompletas={etapas
                  .filter((e) => e.completa)
                  .map((e) => e.id)}
              />
            </div>
          </div>

          {/* Conteúdo principal - direita */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-sm">
              <div className="p-8">
                {/* Header com botão reiniciar */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#E5E7EB]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                        <Info className="w-4 h-4 text-[#2A66D9]" />
                      </div>
                      <h2 className="text-xl font-bold text-[#101828]">
                        {tipoPcD === "representante"
                          ? "Dados do representante legal"
                          : "Dados do beneficiário"}
                      </h2>
                    </div>
                    <p className="text-base text-[#4A5565]">
                      {tipoPcD === "representante"
                        ? "Confira as informações do representante legal e complete o telefone e e-mail."
                        : "Confira as informações do beneficiário e complete o telefone e e-mail."}
                    </p>
                  </div>
                  {etapas.some((e) => e.completa) && (
                    <button
                      onClick={handleReiniciar}
                      className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Reiniciar solicitação"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reiniciar
                    </button>
                  )}
                </div>

                {/* Dados cadastrais */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#101828] mb-4">
                    Dados cadastrais
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-base font-semibold text-[#364153] mb-2">
                        Nome completo
                      </label>
                      <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] px-4 py-3 text-[#4A5565] font-medium">
                        {formData.nome}
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-[#364153] mb-2">
                        CPF
                      </label>
                      <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] px-4 py-3 text-[#4A5565] font-medium">
                        {formData.cpf}
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-semibold text-[#364153] mb-2">
                        Endereço residencial
                      </label>
                      <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] px-4 py-3 text-[#4A5565] font-medium">
                        {formData.endereco}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-base font-semibold text-[#364153] mb-2">
                          Município
                        </label>
                        <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] px-4 py-3 text-[#4A5565] font-medium">
                          {formData.municipio}
                        </div>
                      </div>
                      <div>
                        <label className="block text-base font-semibold text-[#364153] mb-2">
                          UF
                        </label>
                        <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] px-4 py-3 text-[#4A5565] font-medium">
                          {formData.uf}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informações de contato */}
                <div className="mb-8">
                  <InformacoesContatoCard
                    telefone={formData.telefone}
                    email={formData.email}
                    onTelefoneChange={(value) =>
                      setFormData({ ...formData, telefone: value })
                    }
                    onEmailChange={(value) =>
                      setFormData({ ...formData, email: value })
                    }
                    errorTelefone={hasError && !formData.telefone}
                    errorEmail={hasError && !formData.email}
                  />
                </div>

                {/* Botões */}
                <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => navigate("/servico/isencao-icms-pcd")}
                    className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="h-12 px-6 rounded-[10px] bg-[#2A66D9] text-white font-semibold hover:bg-[#1e4fb8] transition-colors shadow-sm"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

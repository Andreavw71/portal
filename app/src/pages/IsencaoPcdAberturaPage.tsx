import { useState } from "react";
import { useNavigate } from "react-router";
import { Info, User, Users, ShieldAlert } from "lucide-react";

export function IsencaoPcdAberturaPage() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<string | null>(null);

  const handleNext = () => {
    if (tipo) {
      sessionStorage.setItem("tipoPcD", tipo);
      navigate("/isencao-pcd/termo");
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-[#101828] text-xl font-bold mb-2">
          Tipo de solicitação
        </h2>
        <p className="text-[#4A5565] text-base">
          Escolha a opção que melhor descreve a sua situação. Essa escolha
          ajuda o sistema a mostrar os documentos e etapas corretos para o seu
          pedido.
        </p>
      </div>

      <div className="bg-[#EFF6FF] border border-[#2A66D9]/20 rounded-[10px] p-4 flex items-start gap-3 mb-8">
        <Info className="w-5 h-5 text-[#2A66D9] shrink-0 mt-0.5" />
        <p className="text-[#101828] text-base leading-relaxed">
          <span className="font-bold">Importante:</span> selecione a opção que
          corresponda à situação do beneficiário e do condutor do veículo. Uma
          escolha incorreta pode gerar pendências ou atrasar a análise.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        <label
          className={`block border-2 rounded-[10px] p-5 cursor-pointer transition-all ${
            tipo === "proprio"
              ? "border-[#2A66D9] bg-[#2A66D9]/5"
              : "border-[#E5E7EB] hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                tipo === "proprio" ? "border-[#2A66D9]" : "border-gray-300"
              }`}
            >
              {tipo === "proprio" && (
                <div className="w-3 h-3 bg-[#2A66D9] rounded-full" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  tipo === "proprio"
                    ? "bg-[#2A66D9] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <User className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`block font-bold text-base ${
                    tipo === "proprio" ? "text-[#2A66D9]" : "text-[#101828]"
                  }`}
                >
                  A própria pessoa com deficiência vai adquirir e conduzir o
                  veículo
                </span>
                <span className="text-base text-[#6A7282] mt-1 block leading-relaxed">
                  Use esta opção quando o beneficiário tiver CNH e for o
                  principal condutor do veículo.
                </span>
              </div>
            </div>
          </div>
          <input
            type="radio"
            name="tipo"
            value="proprio"
            className="hidden"
            onChange={() => setTipo("proprio")}
          />
        </label>

        <label
          className={`block border-2 rounded-[10px] p-5 cursor-pointer transition-all ${
            tipo === "terceiro"
              ? "border-[#2A66D9] bg-[#2A66D9]/5"
              : "border-[#E5E7EB] hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                tipo === "terceiro" ? "border-[#2A66D9]" : "border-gray-300"
              }`}
            >
              {tipo === "terceiro" && (
                <div className="w-3 h-3 bg-[#2A66D9] rounded-full" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  tipo === "terceiro"
                    ? "bg-[#2A66D9] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`block font-bold text-base ${
                    tipo === "terceiro" ? "text-[#2A66D9]" : "text-[#101828]"
                  }`}
                >
                  A pessoa com deficiência vai adquirir o veículo, mas outra
                  pessoa será a condutora
                </span>
                <span className="text-base text-[#6A7282] mt-1 block leading-relaxed">
                  Use esta opção quando o veículo for destinado ao beneficiário,
                  mas conduzido por terceiro autorizado.
                </span>
              </div>
            </div>
          </div>
          <input
            type="radio"
            name="tipo"
            value="terceiro"
            className="hidden"
            onChange={() => setTipo("terceiro")}
          />
        </label>

        <label
          className={`block border-2 rounded-[10px] p-5 cursor-pointer transition-all ${
            tipo === "representante"
              ? "border-[#2A66D9] bg-[#2A66D9]/5"
              : "border-[#E5E7EB] hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                tipo === "representante"
                  ? "border-[#2A66D9]"
                  : "border-gray-300"
              }`}
            >
              {tipo === "representante" && (
                <div className="w-3 h-3 bg-[#2A66D9] rounded-full" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  tipo === "representante"
                    ? "bg-[#2A66D9] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`block font-bold text-base ${
                    tipo === "representante"
                      ? "text-[#2A66D9]"
                      : "text-[#101828]"
                  }`}
                >
                  O pedido será feito por representante legal
                </span>
                <span className="text-base text-[#6A7282] mt-1 block leading-relaxed">
                  Use esta opção quando pai, mãe, tutor, curador ou outro
                  representante legal atuar em nome da pessoa com deficiência.
                </span>
              </div>
            </div>
          </div>
          <input
            type="radio"
            name="tipo"
            value="representante"
            className="hidden"
            onChange={() => setTipo("representante")}
          />
        </label>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
        <button
          onClick={() => navigate("/servico/isencao-icms-pcd")}
          className="h-12 px-6 rounded-[10px] border-2 border-[#E5E7EB] bg-white text-[#364153] font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleNext}
          disabled={!tipo}
          className={`h-12 px-6 rounded-[10px] font-semibold transition-all shadow-sm ${
            tipo
              ? "bg-[#2A66D9] text-white hover:bg-[#1e4fb8]"
              : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

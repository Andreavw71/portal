import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Users,
  Search,
  AlertCircle,
  UploadCloud,
  CheckCircle,
  Trash2,
  Eye,
  Download,
} from "lucide-react";
import { ProgressoSolicitacaoSidebar } from "../../components/ProgressoSolicitacaoSidebar";
import { useGerenciadorEtapas } from "../../hooks/useGerenciadorEtapas";

interface Condutor {
  cpf: string;
  dataNascimento: string;
  nome?: string;
  endereco?: string;
  municipio?: string;
  uf?: string;
  cnhFile?: File | null;
  encontrado?: boolean;
  cnhEncontrada?: boolean;
}

export function IsencaoPcdCondutoresPage() {
  const navigate = useNavigate();
  const [quantidadeCondutores, setQuantidadeCondutores] = useState<1 | 2 | 3>(
    1
  );
  const [condutores, setCondutores] = useState<Condutor[]>([
    { cpf: "", dataNascimento: "", cnhFile: null },
    { cpf: "", dataNascimento: "", cnhFile: null },
    { cpf: "", dataNascimento: "", cnhFile: null },
  ]);
  const [error, setError] = useState<string | null>(null);

  const tipoPcD = sessionStorage.getItem("tipoPcD") || "proprio";
  const { etapas } = useGerenciadorEtapas(tipoPcD);

  const handleConsultar = (index: number) => {
    const condutor = condutores[index];
    if (!condutor.cpf || !condutor.dataNascimento) {
      setError("Informe CPF e data de nascimento antes de consultar.");
      return;
    }

    const cpfNumerico = condutor.cpf.replace(/\D/g, "");
    const ultimoDigito = parseInt(cpfNumerico.slice(-1));
    const cnhEncontradaMT = ultimoDigito % 2 === 0;

    const novosCondutores = [...condutores];

    if (cnhEncontradaMT) {
      novosCondutores[index] = {
        ...condutor,
        nome: "Maria Silva da Conceição",
        endereco: "Rua das Flores, 125, Bairro Centro",
        municipio: "Cuiabá",
        uf: "MT",
        encontrado: true,
        cnhEncontrada: true,
      };
    } else {
      novosCondutores[index] = {
        ...condutor,
        encontrado: true,
        cnhEncontrada: false,
      };
    }

    setCondutores(novosCondutores);
    setError(null);
  };

  const handleUploadCNH = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        setError("O arquivo da CNH precisa ser em formato PDF.");
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError("O arquivo pode ter no máximo 5MB.");
        return;
      }

      const novosCondutores = [...condutores];
      novosCondutores[index].cnhFile = selected;
      setCondutores(novosCondutores);
      setError(null);
    }
  };

  const handleViewFile = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  const handleDownloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRemoveFile = (index: number) => {
    const novosCondutores = [...condutores];
    novosCondutores[index].cnhFile = null;
    setCondutores(novosCondutores);
  };

  const handleNext = () => {
    for (let i = 0; i < quantidadeCondutores; i++) {
      const condutor = condutores[i];

      if (!condutor.encontrado) {
        setError(`Consulte os dados do ${i + 1}º condutor antes de continuar.`);
        return;
      }

      if (!condutor.nome) {
        setError(`Preencha o nome completo do ${i + 1}º condutor.`);
        return;
      }

      if (!condutor.endereco) {
        setError(`Preencha o endereço do ${i + 1}º condutor.`);
        return;
      }

      if (!condutor.municipio) {
        setError(`Preencha o município do ${i + 1}º condutor.`);
        return;
      }

      if (!condutor.uf) {
        setError(`Selecione a UF do ${i + 1}º condutor.`);
        return;
      }

      if (!condutor.cnhEncontrada && !condutor.cnhFile) {
        setError(
          `Anexe a CNH do ${i + 1}º condutor em formato PDF (CNH emitida em outro estado).`
        );
        return;
      }
    }
    navigate("/isencao-pcd/concessionaria");
  };

  const condutorLabels = ["Primeiro", "Segundo", "Terceiro"];

  return (
    <div className="animate-fade-in pb-12 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
      {/* Sidebar de progresso - lateral esquerda */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <ProgressoSolicitacaoSidebar
            etapaAtual="condutores"
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
            Condutores autorizados
          </h1>
          <p className="text-[#4A5565] text-sm">
            Informe os dados dos condutores autorizados a conduzir o veículo. O
            sistema consultará automaticamente a CNH no DETRAN-MT.
          </p>
        </div>

        {/* Informações importantes */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#101828] mb-1">
            Informações importantes
          </h2>
          <p className="text-sm text-[#6B7280] mb-4">
            Atenção aos detalhes do serviço
          </p>

          <div className="space-y-3">
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[10px] px-4 py-3 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#78350F]">
                Se a CNH foi <strong>emitida em Mato Grosso</strong>, os dados
                serão preenchidos automaticamente e não será necessário anexar
                o documento PDF
              </p>
            </div>

            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[10px] px-4 py-3 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#78350F]">
                Se a CNH foi{" "}
                <strong>emitida em outra Unidade da Federação</strong>, você
                deverá preencher os dados manualmente e anexar obrigatoriamente
                o PDF da CNH
              </p>
            </div>
          </div>
        </div>

        {/* Seleção de quantidade */}
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
          <div className="bg-[#2A66D9] px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold">
                Quantos condutores autorizados você deseja incluir?
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              {[1, 2, 3].map((num) => (
                <label
                  key={num}
                  className={`flex-1 border-2 rounded-[10px] p-4 cursor-pointer transition-all ${
                    quantidadeCondutores === num
                      ? "border-[#2A66D9] bg-[#EFF6FF]"
                      : "border-[#E5E7EB] hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        quantidadeCondutores === num
                          ? "border-[#2A66D9]"
                          : "border-gray-300"
                      }`}
                    >
                      {quantidadeCondutores === num && (
                        <div className="w-3 h-3 bg-[#2A66D9] rounded-full" />
                      )}
                    </div>
                    <span className="font-semibold text-[#364153]">
                      {num === 1
                        ? "Um condutor"
                        : num === 2
                        ? "Dois condutores"
                        : "Três condutores"}
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="quantidade"
                    value={num}
                    checked={quantidadeCondutores === num}
                    onChange={() =>
                      setQuantidadeCondutores(num as 1 | 2 | 3)
                    }
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800 font-medium">{error}</div>
          </div>
        )}

        {/* Condutores */}
        {Array.from({ length: quantidadeCondutores }).map((_, index) => {
          const condutor = condutores[index];
          return (
            <div
              key={index}
              className="bg-white rounded-[10px] border border-[#E5E7EB] overflow-hidden shadow-sm mb-6"
            >
              <div className="bg-[#2A66D9] px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold">
                    {condutorLabels[index]} Condutor Autorizado
                  </h2>
                  <p className="text-white/80 text-sm">
                    {index === 0
                      ? "Informe os dados do primeiro condutor autorizado"
                      : index === 1
                      ? "Informe os dados do segundo condutor autorizado"
                      : "Informe os dados do terceiro condutor autorizado"}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Consulta */}
                <div>
                  <h3 className="text-[#101828] font-bold mb-3">
                    Digite o CPF e a Data de Nascimento do{" "}
                    {condutorLabels[index].toLowerCase()} condutor:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor={`cpf-${index}`}
                        className="block text-base font-semibold text-[#364153] mb-2"
                      >
                        CPF: <span className="text-[#E7000B]">*</span>
                      </label>
                      <input
                        type="text"
                        id={`cpf-${index}`}
                        value={condutor.cpf}
                        onChange={(e) => {
                          const novosCondutores = [...condutores];
                          novosCondutores[index].cpf = e.target.value;
                          setCondutores(novosCondutores);
                        }}
                        placeholder="000.000.000-00"
                        className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`data-nascimento-${index}`}
                        className="block text-base font-semibold text-[#364153] mb-2"
                      >
                        Data de Nascimento:{" "}
                        <span className="text-[#E7000B]">*</span>
                      </label>
                      <input
                        type="date"
                        id={`data-nascimento-${index}`}
                        value={condutor.dataNascimento}
                        onChange={(e) => {
                          const novosCondutores = [...condutores];
                          novosCondutores[index].dataNascimento =
                            e.target.value;
                          setCondutores(novosCondutores);
                        }}
                        className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => handleConsultar(index)}
                        className="w-full h-12 px-4 bg-[#2A66D9] text-white rounded-[10px] hover:bg-[#1e4fb8] transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Consultar
                      </button>
                    </div>
                  </div>
                </div>

                {/* CNH encontrada no DETRAN-MT */}
                {condutor.encontrado && condutor.cnhEncontrada && (
                  <>
                    <div>
                      <h3 className="text-[#101828] font-bold mb-3">
                        Dados cadastrais
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            Nome completo
                          </label>
                          <input
                            type="text"
                            value={condutor.nome}
                            readOnly
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[10px] bg-[#F9FAFB] text-[#4A5565] text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            CPF
                          </label>
                          <input
                            type="text"
                            value={condutor.cpf}
                            readOnly
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[10px] bg-[#F9FAFB] text-[#4A5565] text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            Endereço residencial
                          </label>
                          <input
                            type="text"
                            value={condutor.endereco}
                            readOnly
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[10px] bg-[#F9FAFB] text-[#4A5565] text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            Município
                          </label>
                          <input
                            type="text"
                            value={condutor.municipio}
                            readOnly
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[10px] bg-[#F9FAFB] text-[#4A5565] text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            UF
                          </label>
                          <input
                            type="text"
                            value={condutor.uf}
                            readOnly
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[10px] bg-[#F9FAFB] text-[#4A5565] text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-[10px] p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-emerald-800 font-semibold text-sm mb-1">
                            CNH encontrada no DETRAN-MT
                          </p>
                          <p className="text-emerald-700 text-sm">
                            Os dados da CNH foram localizados automaticamente
                            no sistema. Não é necessário anexar o documento
                            PDF.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* CNH NÃO encontrada - emitida em outro estado */}
                {condutor.encontrado && !condutor.cnhEncontrada && (
                  <>
                    <div className="bg-amber-50 border border-amber-200 rounded-[10px] p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-amber-800 font-semibold text-sm mb-1">
                            CNH não encontrada no DETRAN-MT
                          </p>
                          <p className="text-amber-700 text-sm">
                            A CNH deste condutor foi emitida em outra Unidade
                            da Federação. Por favor, preencha os dados
                            manualmente abaixo e anexe o PDF da CNH.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[#101828] font-bold mb-3">
                        Dados cadastrais
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            Nome completo{" "}
                            <span className="text-[#E7000B]">*</span>
                          </label>
                          <input
                            type="text"
                            value={condutor.nome || ""}
                            onChange={(e) => {
                              const novosCondutores = [...condutores];
                              novosCondutores[index].nome = e.target.value;
                              setCondutores(novosCondutores);
                            }}
                            placeholder="Digite o nome completo"
                            className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            CPF
                          </label>
                          <input
                            type="text"
                            value={condutor.cpf}
                            readOnly
                            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[10px] bg-[#F9FAFB] text-[#4A5565] text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            Endereço residencial{" "}
                            <span className="text-[#E7000B]">*</span>
                          </label>
                          <input
                            type="text"
                            value={condutor.endereco || ""}
                            onChange={(e) => {
                              const novosCondutores = [...condutores];
                              novosCondutores[index].endereco =
                                e.target.value;
                              setCondutores(novosCondutores);
                            }}
                            placeholder="Rua, número, complemento, bairro"
                            className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            Município{" "}
                            <span className="text-[#E7000B]">*</span>
                          </label>
                          <input
                            type="text"
                            value={condutor.municipio || ""}
                            onChange={(e) => {
                              const novosCondutores = [...condutores];
                              novosCondutores[index].municipio =
                                e.target.value;
                              setCondutores(novosCondutores);
                            }}
                            placeholder="Digite o município"
                            className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-semibold text-[#364153] mb-2">
                            UF <span className="text-[#E7000B]">*</span>
                          </label>
                          <select
                            value={condutor.uf || ""}
                            onChange={(e) => {
                              const novosCondutores = [...condutores];
                              novosCondutores[index].uf = e.target.value;
                              setCondutores(novosCondutores);
                            }}
                            className="w-full px-4 py-3 border border-[#D1D5DC] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2A66D9] focus:border-transparent text-sm"
                          >
                            <option value="">Selecione</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[#101828] font-bold mb-3">
                        Anexar CNH <span className="text-[#E7000B]">*</span>
                      </h3>
                      <p className="text-base text-[#4A5565] mb-3">
                        Como a CNH foi emitida em outro estado, é obrigatório
                        anexar o documento em PDF.
                      </p>

                      {!condutor.cnhFile ? (
                        <label className="border-2 border-dashed border-[#D1D5DC] rounded-[10px] p-6 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#2A66D9] transition-all cursor-pointer">
                          <div className="w-10 h-10 bg-[#2A66D9]/10 rounded-full flex items-center justify-center mb-3 text-[#2A66D9]">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <h4 className="text-[#101828] font-bold text-sm mb-1">
                            Anexar CNH
                          </h4>
                          <p className="text-[#6A7282] text-xs text-center">
                            Selecione o arquivo PDF da CNH
                            <br />
                            Tamanho máximo: 5MB
                          </p>
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleUploadCNH(index, e)}
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
                                  CNH anexada com sucesso
                                </p>
                                <p className="text-emerald-600 text-xs mt-1 truncate max-w-[200px]">
                                  {condutor.cnhFile.name}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-[8px] transition-colors"
                              title="Remover arquivo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleViewFile(condutor.cnhFile!)
                              }
                              className="flex-1 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-[8px] hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                            >
                              <Eye className="w-4 h-4" />
                              Visualizar
                            </button>
                            <button
                              onClick={() =>
                                handleDownloadFile(condutor.cnhFile!)
                              }
                              className="flex-1 px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-[8px] hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                            >
                              <Download className="w-4 h-4" />
                              Baixar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Developer Info */}
        <details
          style={{
            background: "#F0F9FF",
            border: "2px dashed #BAE6FD",
            borderRadius: 8,
            padding: 12,
            marginTop: 24,
            fontFamily: "Monaco, Consolas, monospace",
          }}
        >
          <summary
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#0369A1",
              cursor: "pointer",
              userSelect: "none",
              listStyle: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 18,
                height: 18,
                borderRadius: 4,
                background: "#0284C7",
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 700,
                textAlign: "center",
                lineHeight: "18px",
              }}
            >
              ℹ
            </span>
            DEV MODE — Como testar os cenários
          </summary>
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #BAE6FD",
            }}
          >
            <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 12px" }}>
              <strong>Simular CNH encontrada no DETRAN-MT:</strong>
              <br />
              Use CPF terminado em número PAR (ex: 123.456.789-00,
              111.222.333-44)
              <br />
              → Sistema preenche dados automaticamente, não exige anexo do PDF
            </p>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
              <strong>Simular CNH de outro estado:</strong>
              <br />
              Use CPF terminado em número ÍMPAR (ex: 123.456.789-01,
              111.222.333-45)
              <br />
              → Sistema exige preenchimento manual e upload obrigatório do PDF
            </p>
          </div>
        </details>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/isencao-pcd/disponibilidade-financeira")}
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

import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  Users,
  FileText,
  Globe,
  Check,
  Shield,
  ListChecks,
  BookOpen,
  Info,
  CircleDollarSign,
} from "lucide-react";

type TabId = "quem-pode" | "documentos" | "pre-requisitos" | "passo-a-passo" | "info";

const tabs: { id: TabId; label: string; Icon: typeof Users }[] = [
  { id: "quem-pode", label: "Quem pode", Icon: Users },
  { id: "documentos", label: "Documentos", Icon: FileText },
  { id: "pre-requisitos", label: "Pré-requisitos", Icon: ListChecks },
  { id: "passo-a-passo", label: "Passo a passo", Icon: BookOpen },
  { id: "info", label: "Informações importantes", Icon: Info },
];

const eligibility = [
  {
    title: "Pessoa com deficiência condutora",
    description:
      "Você tem deficiência física, visual, auditiva, intelectual, múltipla ou TEA e vai comprar e dirigir o próprio veículo.",
  },
  {
    title: "Pessoa com deficiência não condutora",
    description:
      "Você tem deficiência e vai comprar o veículo, mas ele será dirigido por outra pessoa (familiar ou terceiro).",
  },
  {
    title: "Representante legal",
    description:
      "Você é pai, mãe, tutor ou curador e está fazendo o pedido em nome da pessoa com deficiência.",
  },
];

const documentos = [
  "CPF e data de nascimento da pessoa beneficiária",
  "Endereço completo e telefone atualizados",
  "Laudo médico em PDF com CID-10",
  "Autorização de isenção de IPI da Receita Federal em PDF",
  "CNPJ e razão social da concessionária",
  "Marca do veículo (fabricante)",
  "Dados do veículo: modelo, código BIN, chassi e valor de venda",
  "Documento de representação legal em PDF (quando aplicável)",
];

const preRequisitos = [
  "Você precisa primeiro obter a isenção de IPI na Receita Federal antes de solicitar a isenção de ICMS estadual",
  "A isenção vale apenas para veículos saídos direto da fábrica, sem uso anterior",
  "Após aprovação, você tem 270 dias para comprar o veículo. Não compre antes da aprovação",
  "O veículo não pode ser vendido nos primeiros 4 anos, exceto em casos excepcionais previstos em lei",
  "Se o veículo precisar de adaptações especiais, estas devem ser feitas em oficinas autorizadas pelo DETRAN-MT",
  "Você pode solicitar a isenção de IPVA no mesmo processo, marcando a opção durante o preenchimento",
];

const passos = [
  'Clique em "Iniciar nova solicitação" no serviço de Isenção de ICMS para PcD.',
  "Informe os dados pessoais da pessoa com deficiência (CPF, nome, nascimento, endereço).",
  "Se for representante legal, preencha seus dados e anexe o documento de representação.",
  "Leia e aceite o termo de uso e consentimento para tratamento de dados pessoais.",
  "Envie o laudo médico em PDF e a autorização de isenção de IPI da Receita Federal.",
  "Preencha os dados da concessionária onde o veículo será comprado.",
  "Informe os dados do fabricante e os dados completos do veículo escolhido.",
  "Marque a opção de análise de isenção de IPVA junto, se desejar.",
  "Revise todas as informações e documentos na tela de confirmação.",
  "Clique em enviar e anote o número de protocolo gerado.",
];

export default function InfograficoPcD() {
  const [active, setActive] = useState<TabId>("quem-pode");

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]">
      {/* Voltar aos serviços */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1212px] mx-auto px-8 h-16 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-[#4B5563] hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos serviços
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#F9FAFB]/50 to-white border-b border-[#F3F4F6]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />
        <div className="max-w-[1212px] mx-auto px-8 py-16">
          <div className="flex items-center flex-wrap gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Perfil Cidadão
            </span>
            <span className="text-[#D1D5DB] text-base">•</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-[#4B5563]">
              <Clock className="w-3.5 h-3.5" />
              15 minutos
            </span>
            <span className="text-[#D1D5DB] text-base">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-sm font-semibold border border-[#BFDBFE]">
              <CircleDollarSign className="w-3.5 h-3.5" />
              Gratuito
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-[#111827] max-w-[920px] mb-4">
            Isenção de ICMS para Pessoa com Deficiência (PcD)
          </h1>
          <p className="text-lg text-[#4B5563] leading-relaxed max-w-[780px] mb-9">
            Serviço de solicitação de isenção do ICMS para pessoa com
            deficiência física, visual, auditiva, intelectual, múltipla ou com
            Transtorno do Espectro Autista (TEA) na compra de veículo novo
            0km.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/isencao-pcd"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-[10px] bg-[#2563EB] text-white text-base font-semibold shadow-sm hover:bg-[#1D4ED8] transition-colors"
            >
              Iniciar Serviço
              <ChevronRight className="w-4 h-4" />
            </Link>
            <span className="inline-flex items-center gap-2 text-sm text-[#4B5563]">
              <Users className="w-4 h-4 text-[#9CA3AF]" />
              3 perfis atendidos
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-[#4B5563]">
              <FileText className="w-4 h-4 text-[#9CA3AF]" />
              8 documentos
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-[#6B7280]">
              <Globe className="w-3.5 h-3.5" />
              100% online
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav
        aria-label="Seções do serviço"
        className="bg-white border-b border-[#E5E7EB] overflow-x-auto sticky top-0 z-10"
      >
        <div className="max-w-[1212px] mx-auto px-8 flex items-stretch gap-8 h-14">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap border-b-[2px] transition-colors ${
                  isActive
                    ? "text-[#2563EB] border-[#2563EB]"
                    : "text-[#4B5563] border-transparent hover:text-[#111827]"
                }`}
              >
                <tab.Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <section className="bg-[#F9FAFB]">
        <div className="max-w-[1212px] mx-auto px-8 py-12">
          {active === "quem-pode" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-2">
                  Quem pode solicitar?
                </h2>
                <p className="text-base text-[#4B5563]">
                  Critérios de elegibilidade para este serviço
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {eligibility.map((item) => (
                  <article
                    key={item.title}
                    className="flex items-start gap-4 p-5 bg-white border-[1.25px] border-[#E5E7EB] rounded-xl shadow-sm"
                  >
                    <span className="inline-flex items-center justify-center shrink-0 w-9 h-9 rounded-2xl bg-[#F0FDF4] border-[1.25px] border-[#BBF7D0]">
                      <Check
                        className="w-4 h-4 text-[#16A34A]"
                        strokeWidth={3}
                      />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[#111827] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-base text-[#4B5563] leading-relaxed text-justify">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {active === "documentos" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-2">
                  Documentos necessários
                </h2>
                <p className="text-base text-[#4B5563]">
                  Lista de documentos exigidos — Lei Estadual 7.098/1998 e
                  Decreto 2.129/2009
                </p>
              </header>

              <div className="bg-white border-[1.25px] border-[#E5E7EB] rounded-xl shadow-sm divide-y divide-[#F3F4F6]">
                {documentos.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <p className="text-base text-[#374151]">{doc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "pre-requisitos" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-2">
                  Pré-requisitos
                </h2>
                <p className="text-base text-[#4B5563]">
                  Condições que precisam ser atendidas antes de iniciar ou
                  para ter direito ao serviço
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preRequisitos.map((req, idx) => (
                  <article
                    key={idx}
                    className="flex items-start gap-3 p-5 bg-white border-[1.25px] border-[#E5E7EB] rounded-xl shadow-sm"
                  >
                    <span className="inline-flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-[#F0FDF4] border-[1.25px] border-[#BBF7D0]">
                      <Check
                        className="w-3.5 h-3.5 text-[#16A34A]"
                        strokeWidth={3}
                      />
                    </span>
                    <p className="text-sm md:text-base text-[#374151] leading-relaxed">
                      {req}
                    </p>
                  </article>
                ))}
              </div>

              <aside className="mt-6 flex items-start gap-3 p-5 bg-[#EFF6FF] border-[1.25px] border-[#BFDBFE] rounded-[10px]">
                <Info className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" />
                <p className="text-sm text-[#1E3A8A] leading-relaxed">
                  <strong>Atenção:</strong> A aprovação do benefício não é
                  automática. Todo pedido passa por análise técnica e jurídica
                  dos documentos enviados. Certifique-se de que todos os
                  documentos estão corretos, legíveis e dentro do prazo de
                  validade.
                </p>
              </aside>
            </div>
          )}

          {active === "passo-a-passo" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-2">
                  Passo a passo
                </h2>
                <p className="text-base text-[#4B5563]">
                  Como realizar este serviço — Portaria SEFAZ nº 157/2023
                </p>
              </header>

              <div className="bg-white border-[1.25px] border-[#E5E7EB] rounded-xl shadow-sm p-6">
                <ol className="relative space-y-4">
                  {passos.map((passo, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 relative"
                    >
                      <div className="relative flex flex-col items-center shrink-0">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#2563EB] text-white text-sm font-semibold z-10">
                          {idx + 1}
                        </span>
                        {idx < passos.length - 1 && (
                          <span className="absolute top-9 w-px h-full bg-[#BFDBFE]" />
                        )}
                      </div>
                      <p className="text-base text-[#374151] leading-relaxed pt-1.5 pb-4">
                        {passo}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {active === "info" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-2">
                  Informações importantes
                </h2>
                <p className="text-base text-[#4B5563]">
                  Pontos de atenção e orientações finais antes de iniciar a
                  solicitação
                </p>
              </header>

              <div className="space-y-4">
                <aside className="flex items-start gap-4 p-6 bg-[#EFF6FF] border-[1.25px] border-[#BFDBFE] rounded-[10px]">
                  <span className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-[10px] bg-[#DBEAFE]">
                    <Shield className="w-5 h-5 text-[#1D4ED8]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] mb-1">
                      Proteção de dados (LGPD)
                    </h3>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Seus dados são protegidos pela LGPD (Lei nº
                      13.709/2018) e serão usados exclusivamente para este
                      serviço.
                    </p>
                  </div>
                </aside>

                <aside className="flex items-start gap-4 p-6 bg-white border-[1.25px] border-[#E5E7EB] rounded-[10px] shadow-sm">
                  <span className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-[10px] bg-[#FEF3C7]">
                    <Clock className="w-5 h-5 text-[#D97706]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] mb-1">
                      Prazo de análise
                    </h3>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      O pedido é analisado em até 15 dias úteis. Após
                      aprovação, você tem 270 dias para concretizar a compra
                      do veículo.
                    </p>
                  </div>
                </aside>

                <aside className="flex items-start gap-4 p-6 bg-white border-[1.25px] border-[#E5E7EB] rounded-[10px] shadow-sm">
                  <span className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-[10px] bg-[#F0FDF4]">
                    <Info className="w-5 h-5 text-[#16A34A]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] mb-1">
                      Acompanhamento online
                    </h3>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      Acompanhe o andamento do seu pedido a qualquer momento
                      pelo portal, na seção "Acompanhar pedido". Você também
                      receberá notificações por e-mail.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

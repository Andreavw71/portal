import { Link } from "react-router";
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  ChevronRight,
  User,
  FileText,
  Globe,
  Check,
  Shield,
} from "lucide-react";

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

const tabs = [
  { id: "quem-pode", label: "Quem pode" },
  { id: "documentos", label: "Documentos" },
  { id: "pre-requisitos", label: "Pré-requisitos" },
  { id: "passo-a-passo", label: "Passo a passo" },
  { id: "info", label: "Informações importantes" },
];

export default function InfograficoPcD() {
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
              5 minutos
            </span>
            <span className="text-[#D1D5DB] text-base">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Gratuito
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-[#111827] max-w-[920px] mb-4">
            Isenção de ICMS para Pessoa com Deficiência (PcD)
          </h1>
          <p className="text-lg text-[#4B5563] leading-relaxed max-w-[780px] mb-9">
            Serviço de solicitação de isenção do ICMS para pessoa com deficiência
            física, visual, auditiva, intelectual, múltipla ou com Transtorno do
            Espectro Autista (TEA) na compra de veículo novo 0km.
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
              <User className="w-4 h-4 text-[#9CA3AF]" />
              1 perfil atendido
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
        className="bg-white border-b border-[#E5E7EB] overflow-x-auto"
      >
        <div className="max-w-[1212px] mx-auto px-8 flex items-stretch gap-8 h-14">
          {tabs.map((tab, idx) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              aria-current={idx === 0 ? "page" : undefined}
              className={`inline-flex items-center text-sm font-semibold whitespace-nowrap border-b-[1.25px] transition-colors
                ${
                  idx === 0
                    ? "text-[#2563EB] border-[#2563EB]"
                    : "text-[#4B5563] border-transparent hover:text-[#111827]"
                }`}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Content */}
      <section className="bg-white">
        <div className="max-w-[1212px] mx-auto px-8 py-16">
          <div id="quem-pode">
            <header>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">
                Quem pode solicitar?
              </h2>
              <p className="text-base text-[#4B5563]">
                Critérios de elegibilidade para este serviço
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {eligibility.map((item) => (
                <article
                  key={item.title}
                  className="flex items-start gap-4 p-5 bg-white border-[1.25px] border-[#E5E7EB] rounded-xl shadow-sm"
                >
                  <span className="inline-flex items-center justify-center shrink-0 w-9 h-9 rounded-2xl bg-[#F0FDF4] border-[1.25px] border-[#BBF7D0]">
                    <Check className="w-4 h-4 text-[#16A34A]" strokeWidth={3} />
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

          <hr className="my-16 border-t border-[#E5E7EB]" />

          <aside
            aria-labelledby="lgpd-heading"
            className="flex items-start gap-4 p-6 bg-[#EFF6FF] border-[1.25px] border-[#BFDBFE] rounded-[10px]"
          >
            <span className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-[10px] bg-[#DBEAFE]">
              <Shield className="w-5 h-5 text-[#1D4ED8]" />
            </span>
            <div>
              <h3
                id="lgpd-heading"
                className="text-lg font-semibold text-[#111827] mb-1"
              >
                Proteção de dados (LGPD)
              </h3>
              <p className="text-sm text-[#374151] leading-relaxed">
                Seus dados são protegidos pela LGPD (Lei nº 13.709/2018) e serão
                usados exclusivamente para este serviço.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

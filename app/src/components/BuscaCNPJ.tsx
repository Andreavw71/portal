import { useState } from "react";
import { Search, Building2, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";

export interface DadosEmpresa {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  cnd?: string;
}

export type CndOverride = "auto" | "valida" | "nao-valida" | "pendente";

const MOCK_EMPRESA: Omit<DadosEmpresa, "cnd"> = {
  cnpj: "12.345.678/0001-90",
  nomeFantasia: "Auto Center Cuiabá",
  razaoSocial: "AUTO CENTER CUIABA LTDA",
};

function maskCNPJ(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

interface BuscaCNPJProps {
  onSelect: (dados: DadosEmpresa) => void;
  devCndOverride?: CndOverride;
  label?: string;
}

export function BuscaCNPJ({
  onSelect,
  devCndOverride = "auto",
  label = "Informe o CNPJ:",
}: BuscaCNPJProps) {
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleBuscar = () => {
    const digits = cnpj.replace(/\D/g, "");
    if (digits.length !== 14) {
      setError("Informe um CNPJ válido (14 dígitos).");
      return;
    }
    setError(null);
    const cnd = devCndOverride === "auto" ? "valida" : devCndOverride;
    onSelect({
      cnpj,
      nomeFantasia: MOCK_EMPRESA.nomeFantasia,
      razaoSocial: MOCK_EMPRESA.razaoSocial,
      cnd,
    });
  };

  return (
    <div>
      <label className="block text-sm font-bold text-[#364153] mb-2">
        {label}
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value={cnpj}
          onChange={(e) => {
            setCnpj(maskCNPJ(e.target.value));
            setError(null);
          }}
          placeholder="00.000.000/0000-00"
          className={`flex-1 h-12 px-4 border rounded-[10px] focus:ring-2 focus:ring-[#2A66D9] focus:border-[#2A66D9] outline-none transition-all ${
            error ? "border-[#E7000B] bg-red-50" : "border-[#D1D5DC]"
          }`}
        />
        <button
          onClick={handleBuscar}
          className="h-12 px-6 bg-[#2A66D9] text-white font-semibold rounded-[10px] hover:bg-[#1e4fb8] transition-colors flex items-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Consultar</span>
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-[#E7000B] font-medium">{error}</p>
      )}
    </div>
  );
}

interface CamposEmpresaProps {
  nomeFantasia: string;
  cnpj: string;
  cnd?: string;
}

const CND_BADGE: Record<
  string,
  { text: string; color: string; Icon: typeof ShieldCheck }
> = {
  valida: {
    text: "CND válida",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Icon: ShieldCheck,
  },
  "nao-valida": {
    text: "CND não válida",
    color: "bg-red-100 text-red-700 border-red-200",
    Icon: ShieldAlert,
  },
  pendente: {
    text: "Verificação pendente",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    Icon: ShieldQuestion,
  },
};

export function CamposEmpresa({
  nomeFantasia,
  cnpj,
  cnd,
}: CamposEmpresaProps) {
  const badge = cnd ? CND_BADGE[cnd] : undefined;

  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-[#2A66D9]" />
        <h3 className="font-bold text-[#101828]">Empresa identificada</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-[#6A7282] uppercase tracking-wider mb-1">
            Nome Fantasia
          </label>
          <p className="text-[#101828] font-semibold">{nomeFantasia}</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#6A7282] uppercase tracking-wider mb-1">
            CNPJ
          </label>
          <p className="text-[#101828] font-semibold">{cnpj}</p>
        </div>
      </div>
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${badge.color}`}
        >
          <badge.Icon className="w-3.5 h-3.5" />
          {badge.text}
        </div>
      )}
    </div>
  );
}

interface DevControlsCNDProps {
  value: CndOverride;
  onChange: (v: CndOverride) => void;
}

export function DevControlsCND({ value, onChange }: DevControlsCNDProps) {
  const opts: { v: CndOverride; label: string }[] = [
    { v: "auto", label: "Auto" },
    { v: "valida", label: "Válida" },
    { v: "nao-valida", label: "Não válida" },
    { v: "pendente", label: "Pendente" },
  ];
  return (
    <details className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] p-4 mt-4">
      <summary className="cursor-pointer font-semibold text-gray-700 text-sm">
        🔧 Override CND (apenas dev)
      </summary>
      <div className="mt-3 flex gap-2 flex-wrap">
        {opts.map(({ v, label }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              value === v
                ? "bg-[#2A66D9] text-white"
                : "bg-white border border-[#E5E7EB] text-gray-700 hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </details>
  );
}

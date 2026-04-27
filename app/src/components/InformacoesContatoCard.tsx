import { Phone, Mail } from "lucide-react";

interface InformacoesContatoCardProps {
  telefone: string;
  email: string;
  onTelefoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  errorTelefone?: boolean;
  errorEmail?: boolean;
}

export function InformacoesContatoCard({
  telefone,
  email,
  onTelefoneChange,
  onEmailChange,
  errorTelefone,
  errorEmail,
}: InformacoesContatoCardProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-[#101828] mb-4">
        Informações de contato
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-semibold text-[#364153] mb-2">
            Telefone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="tel"
              value={telefone}
              onChange={(e) => onTelefoneChange(e.target.value)}
              placeholder="(00) 00000-0000"
              className={`w-full pl-10 pr-4 py-3 rounded-[8px] border bg-white text-[#101828] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2A66D9]/30 ${
                errorTelefone
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#E5E7EB] focus:border-[#2A66D9]"
              }`}
            />
          </div>
          {errorTelefone && (
            <p className="mt-1 text-sm text-red-600">Informe o telefone.</p>
          )}
        </div>
        <div>
          <label className="block text-base font-semibold text-[#364153] mb-2">
            E-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="seu@email.com"
              className={`w-full pl-10 pr-4 py-3 rounded-[8px] border bg-white text-[#101828] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2A66D9]/30 ${
                errorEmail
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#E5E7EB] focus:border-[#2A66D9]"
              }`}
            />
          </div>
          {errorEmail && (
            <p className="mt-1 text-sm text-red-600">
              Informe um e-mail válido.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router";

export function HeaderSefaz() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-[#E5E7EB] shadow-sm z-50">
      <div className="max-w-[1400px] mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2A66D9] rounded-lg flex items-center justify-center text-white font-bold">
            MT
          </div>
          <div className="leading-tight">
            <div className="text-[10px] text-[#6B7280] uppercase tracking-wide font-semibold">
              SEFAZ
            </div>
            <div className="text-base font-bold text-[#111827]">
              Mato Grosso
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="text-[#4B5563] hover:text-[#2A66D9] font-medium"
          >
            Serviços
          </Link>
          <Link
            to="/sefaz-digital-hub"
            className="text-[#4B5563] hover:text-[#2A66D9] font-medium"
          >
            SEFAZ Digital
          </Link>
          <Link
            to="/validacoes"
            className="text-[#4B5563] hover:text-[#2A66D9] font-medium"
          >
            Validações
          </Link>
        </nav>
      </div>
    </header>
  );
}

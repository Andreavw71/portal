import { ReactNode } from "react";

interface EditorialAlertBadgeProps {
  tipo: string;
  rotulo: string;
  motivo: string;
  sugestao?: string;
  children: ReactNode;
}

export function EditorialAlertBadge({
  rotulo,
  motivo,
  children,
}: EditorialAlertBadgeProps) {
  return (
    <div className="relative">
      <span
        className="absolute -top-2 -right-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-semibold shadow-sm"
        title={`${rotulo}: ${motivo}`}
      >
        ✎ Revisar
      </span>
      {children}
    </div>
  );
}

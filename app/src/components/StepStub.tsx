import { Link } from "react-router";
import { ReactNode } from "react";

interface StepStubProps {
  title: string;
  description?: string;
  children?: ReactNode;
  prev?: string;
  next?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export function StepStub({
  title,
  description,
  children,
  prev,
  next,
  prevLabel = "Voltar",
  nextLabel = "Continuar",
}: StepStubProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-[#4B5563] text-base leading-relaxed mb-8">
          {description}
        </p>
      )}

      {children ?? (
        <div className="rounded-lg border border-dashed border-[#D1D5DB] bg-[#F9FAFB] p-8 text-center text-sm text-[#9CA3AF] mb-8">
          Conteúdo desta etapa em desenvolvimento.
        </div>
      )}

      {(prev || next) && (
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-6 border-t border-[#F3F4F6]">
          {prev && (
            <Link
              to={prev}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#E5E7EB] text-[#374151] font-semibold hover:bg-gray-50 transition-colors"
            >
              {prevLabel}
            </Link>
          )}
          {next && (
            <Link
              to={next}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#2A66D9] text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              {nextLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

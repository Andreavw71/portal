import { Outlet, Link, useLocation } from "react-router";
import { HeaderSefaz } from "../components/landing/HeaderSefaz";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useIsencaoPcdSafe } from "../contexts/IsencaoPcdContext";

interface SubStep {
  label: string;
  path: string;
  isCompleted: boolean;
  hasPendency: boolean;
}

interface Step {
  label: string;
  paths: string[];
  subSteps: SubStep[];
}

export function IsencaoPcdLayout() {
  const location = useLocation();
  const { pendencies } = useIsencaoPcdSafe();

  const steps: Step[] = [
    {
      label: "Início",
      paths: ["/isencao-pcd", "/isencao-pcd/termo"],
      subSteps: [
        { label: "Tipo de solicitação", path: "/isencao-pcd", isCompleted: false, hasPendency: false },
        { label: "Termo de consentimento", path: "/isencao-pcd/termo", isCompleted: false, hasPendency: false },
      ],
    },
    {
      label: "Identificação",
      paths: ["/isencao-pcd/identificacao", "/isencao-pcd/representante"],
      subSteps: [
        { label: "Dados do beneficiário", path: "/isencao-pcd/identificacao", isCompleted: false, hasPendency: false },
        { label: "Representante legal", path: "/isencao-pcd/representante", isCompleted: false, hasPendency: false },
      ],
    },
    {
      label: "Documentos",
      paths: [
        "/isencao-pcd/laudo-medico",
        "/isencao-pcd/isencao-ipi",
        "/isencao-pcd/doc-representacao",
        "/isencao-pcd/disponibilidade-financeira",
        "/isencao-pcd/condutores",
        "/isencao-pcd/documentos",
      ],
      subSteps: [
        { label: "Laudo médico", path: "/isencao-pcd/laudo-medico", isCompleted: false, hasPendency: false },
        { label: "Isenção de IPI", path: "/isencao-pcd/isencao-ipi", isCompleted: false, hasPendency: false },
        { label: "Documento de representação", path: "/isencao-pcd/doc-representacao", isCompleted: false, hasPendency: false },
        { label: "Disponibilidade financeira", path: "/isencao-pcd/disponibilidade-financeira", isCompleted: false, hasPendency: false },
        { label: "Condutores autorizados", path: "/isencao-pcd/condutores", isCompleted: false, hasPendency: false },
      ],
    },
    {
      label: "Veículo & Compra",
      paths: [
        "/isencao-pcd/concessionaria",
        "/isencao-pcd/fabricante",
        "/isencao-pcd/veiculo",
        "/isencao-pcd/ipva",
      ],
      subSteps: [
        { label: "Dados da concessionária", path: "/isencao-pcd/concessionaria", isCompleted: false, hasPendency: false },
        { label: "Dados do fabricante", path: "/isencao-pcd/fabricante", isCompleted: false, hasPendency: false },
        { label: "Informações do veículo", path: "/isencao-pcd/veiculo", isCompleted: false, hasPendency: false },
        { label: "Isenção de IPVA (opcional)", path: "/isencao-pcd/ipva", isCompleted: false, hasPendency: false },
      ],
    },
    {
      label: "Revisão",
      paths: ["/isencao-pcd/resumo"],
      subSteps: [
        { label: "Revisão final", path: "/isencao-pcd/resumo", isCompleted: false, hasPendency: false },
      ],
    },
  ];

  const currentPath = location.pathname;
  const currentStepIndex =
    steps.findIndex((s) => s.paths.includes(currentPath)) >= 0
      ? steps.findIndex((s) => s.paths.includes(currentPath))
      : 0;

  const stepsWithStatus = steps.map((step) => ({
    ...step,
    subSteps: step.subSteps.map((subStep) => ({
      ...subStep,
      hasPendency: pendencies[subStep.path] || false,
      isCompleted:
        !pendencies[subStep.path] &&
        step.paths.indexOf(subStep.path) < step.paths.indexOf(currentPath),
    })),
  }));

  const stepHasPendency = (stepIndex: number) =>
    stepsWithStatus[stepIndex].subSteps.some((sub) => sub.hasPendency);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <HeaderSefaz />

      {/* Breadcrumb & Actions Bar */}
      <div className="mt-20 border-b border-[#E5E7EB] bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-12 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-[#4A5565]">
            <Link
              to="/servico/isencao-icms-pcd"
              className="flex items-center gap-1 hover:text-[#2A66D9] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Voltar para Ficha</span>
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#2A66D9] font-semibold">
              Solicitação de Isenção de ICMS
            </span>
          </nav>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b border-[#E5E7EB] shadow-sm py-6">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between relative mb-8">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-100 -z-10" />
            {stepsWithStatus.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isPast = index < currentStepIndex;
              const hasPendency = stepHasPendency(index);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 bg-white px-2 sm:px-4"
                >
                  <div
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors
                      ${
                        isActive
                          ? "border-[#2A66D9] bg-[#2A66D9] text-white"
                          : isPast && hasPendency
                          ? "border-red-500 bg-red-500 text-white"
                          : isPast
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-gray-200 bg-white text-gray-400"
                      }`}
                  >
                    {isPast && !hasPendency ? "✓" : index + 1}
                    {hasPendency && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold text-center hidden sm:block
                      ${
                        isActive
                          ? "text-[#2A66D9]"
                          : isPast && hasPendency
                          ? "text-red-600"
                          : isPast
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {currentStepIndex >= 0 &&
            stepsWithStatus[currentStepIndex].subSteps.length > 0 && (
              <div className="bg-[#F9FAFB] rounded-[10px] border border-[#E5E7EB] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#6A7282] uppercase tracking-wide">
                    {stepsWithStatus[currentStepIndex].label}
                  </span>
                  <div className="flex-1 h-px bg-[#DBE0EC]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {stepsWithStatus[currentStepIndex].subSteps.map(
                    (subStep, idx) => {
                      const isCurrentSubStep = currentPath === subStep.path;

                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 px-3 py-2 rounded-[8px] text-xs transition-all
                            ${
                              isCurrentSubStep
                                ? "bg-[#EFF6FF] border border-[#2A66D9]/30"
                                : "bg-white border border-[#E5E7EB]"
                            }
                            ${subStep.hasPendency ? "border-red-200 bg-red-50" : ""}
                            ${subStep.isCompleted ? "border-emerald-200 bg-emerald-50" : ""}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold
                              ${
                                isCurrentSubStep
                                  ? "bg-[#2A66D9] text-white"
                                  : subStep.hasPendency
                                  ? "bg-red-500 text-white"
                                  : subStep.isCompleted
                                  ? "bg-emerald-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                          >
                            {subStep.hasPendency
                              ? "!"
                              : subStep.isCompleted
                              ? "✓"
                              : idx + 1}
                          </div>

                          <span
                            className={`font-semibold flex-1
                              ${
                                isCurrentSubStep
                                  ? "text-[#2A66D9]"
                                  : subStep.hasPendency
                                  ? "text-red-700"
                                  : subStep.isCompleted
                                  ? "text-emerald-700"
                                  : "text-[#4A5565]"
                              }`}
                          >
                            {subStep.label}
                          </span>

                          {subStep.hasPendency && (
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                {stepHasPendency(currentStepIndex) && (
                  <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-[8px] p-3">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                      <strong>Atenção:</strong> Você pode avançar no
                      preenchimento, mas há documentos ou informações
                      pendentes nesta etapa. Complete-os antes de finalizar
                      para evitar atrasos na análise.
                    </p>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

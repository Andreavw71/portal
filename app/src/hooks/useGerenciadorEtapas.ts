import { useCallback, useState } from "react";

export interface Etapa {
  id: string;
  completa: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dados?: any;
}

const STORAGE_KEY = "isencao-pcd-etapas";

const ETAPAS_BASE: Etapa[] = [
  { id: "abertura", completa: false },
  { id: "termo", completa: false },
  { id: "identificacao", completa: false },
  { id: "representante", completa: false },
  { id: "beneficiario", completa: false },
  { id: "validacoes", completa: false },
  { id: "documentos", completa: false },
  { id: "laudo-medico", completa: false },
  { id: "isencao-ipi", completa: false },
  { id: "doc-representacao", completa: false },
  { id: "disponibilidade-financeira", completa: false },
  { id: "condutores", completa: false },
  { id: "concessionaria", completa: false },
  { id: "fabricante", completa: false },
  { id: "veiculo", completa: false },
  { id: "ipva", completa: false },
  { id: "resumo", completa: false },
];

function loadEtapas(): Etapa[] {
  if (typeof window === "undefined") return ETAPAS_BASE;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Etapa[];
      const merged = ETAPAS_BASE.map(
        (base) => parsed.find((e) => e.id === base.id) ?? base
      );
      return merged;
    }
  } catch {
    /* ignore */
  }
  return ETAPAS_BASE;
}

function saveEtapas(etapas: Etapa[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(etapas));
  } catch {
    /* ignore */
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useGerenciadorEtapas(_tipoPcD?: string) {
  const [etapas, setEtapas] = useState<Etapa[]>(() => loadEtapas());

  const marcarEtapaCompleta = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (id: string, dados?: any) => {
      setEtapas((prev) => {
        const next = prev.map((e) =>
          e.id === id ? { ...e, completa: true, dados } : e
        );
        saveEtapas(next);
        return next;
      });
    },
    []
  );

  const obterEtapa = useCallback(
    (id: string): Etapa | undefined => etapas.find((e) => e.id === id),
    [etapas]
  );

  const reiniciarSolicitacao = useCallback(() => {
    setEtapas(ETAPAS_BASE);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem("tipoPcD");
    } catch {
      /* ignore */
    }
  }, []);

  return { etapas, marcarEtapaCompleta, obterEtapa, reiniciarSolicitacao };
}

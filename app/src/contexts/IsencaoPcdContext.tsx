import { createContext, useContext, useState, ReactNode } from "react";

interface PendencyData {
  [key: string]: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = Record<string, any>;

type TipoSolicitacao =
  | "pcd-condutor"
  | "pcd-terceiro"
  | "representante"
  | null;

interface IsencaoPcdContextType {
  pendencies: PendencyData;
  setPendency: (path: string, hasPendency: boolean) => void;
  clearPendency: (path: string) => void;
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFormData: (key: string, value: any) => void;
  tipoSolicitacao: TipoSolicitacao;
  setTipoSolicitacao: (tipo: TipoSolicitacao) => void;
  resetContext: () => void;
}

const IsencaoPcdContext = createContext<IsencaoPcdContextType | undefined>(
  undefined
);

export function IsencaoPcdProvider({ children }: { children: ReactNode }) {
  const [pendencies, setPendencies] = useState<PendencyData>({});
  const [formData, setFormData] = useState<FormData>({});
  const [tipoSolicitacao, setTipoSolicitacao] =
    useState<TipoSolicitacao>(null);

  const setPendency = (path: string, hasPendency: boolean) => {
    setPendencies((prev) => ({ ...prev, [path]: hasPendency }));
  };

  const clearPendency = (path: string) => {
    setPendencies((prev) => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetContext = () => {
    setPendencies({});
    setFormData({});
    setTipoSolicitacao(null);
  };

  return (
    <IsencaoPcdContext.Provider
      value={{
        pendencies,
        setPendency,
        clearPendency,
        formData,
        updateFormData,
        tipoSolicitacao,
        setTipoSolicitacao,
        resetContext,
      }}
    >
      {children}
    </IsencaoPcdContext.Provider>
  );
}

export function useIsencaoPcd() {
  const context = useContext(IsencaoPcdContext);
  if (context === undefined) {
    throw new Error(
      "useIsencaoPcd must be used within IsencaoPcdProvider"
    );
  }
  return context;
}

export function useIsencaoPcdSafe(): IsencaoPcdContextType {
  const context = useContext(IsencaoPcdContext);
  if (context === undefined) {
    return {
      pendencies: {},
      setPendency: () => {},
      clearPendency: () => {},
      formData: {},
      updateFormData: () => {},
      tipoSolicitacao: null,
      setTipoSolicitacao: () => {},
      resetContext: () => {},
    };
  }
  return context;
}

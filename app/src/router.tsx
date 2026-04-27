import { createBrowserRouter, useRouteError } from "react-router";
import { InfograficoPcDPage } from "./pages/InfograficoPcDPage";
import { IsencaoPcdLayoutWrapper } from "./layouts/IsencaoPcdLayoutWrapper";
import { IsencaoPcdAberturaPage } from "./pages/IsencaoPcdAberturaPage";
import { IsencaoPcdTermoPage } from "./pages/IsencaoPcdTermoPage";
import { IsencaoPcdIdentificacaoPage } from "./pages/IsencaoPcdIdentificacaoPage";
import { IsencaoPcdBeneficiarioPage } from "./pages/isencao-pcd/IsencaoPcdBeneficiarioPage";
import { IsencaoPcdRepresentantePage } from "./pages/isencao-pcd/IsencaoPcdRepresentantePage";
import { IsencaoPcdDocumentosPage } from "./pages/IsencaoPcdDocumentosPage";
import { IsencaoPcdLaudoMedicoPage } from "./pages/isencao-pcd/IsencaoPcdLaudoMedicoPage";
import { IsencaoPcdIpiPage } from "./pages/isencao-pcd/IsencaoPcdIpiPage";
import { IsencaoPcdRepresentacaoDocPage } from "./pages/isencao-pcd/IsencaoPcdRepresentacaoDocPage";
import { IsencaoPcdDisponibilidadeFinanceiraPage } from "./pages/isencao-pcd/IsencaoPcdDisponibilidadeFinanceiraPage";
import { IsencaoPcdCondutoresPage } from "./pages/isencao-pcd/IsencaoPcdCondutoresPage";
import { IsencaoPcdAcompanhamentoPage } from "./pages/IsencaoPcdAcompanhamentoPage";
import { IsencaoPcdValidacoesPage } from "./pages/IsencaoPcdValidacoesPage";
import { ValidacoesPage } from "./pages/ValidacoesPage";
import { IsencaoPcdConcessionariaPage } from "./pages/isencao-pcd/IsencaoPcdConcessionariaPage";
import { IsencaoPcdFabricantePage } from "./pages/isencao-pcd/IsencaoPcdFabricantePage";
import { IsencaoPcdVeiculoPage } from "./pages/IsencaoPcdVeiculoPage";
import { IsencaoPcdIpvaPage } from "./pages/isencao-pcd/IsencaoPcdIpvaPage";
import { IsencaoPcdResumoPage } from "./pages/IsencaoPcdResumoPage";
import { IsencaoPcdSucessoPage } from "./pages/IsencaoPcdSucessoPage";
import EditorialReviewPage from "./pages/EditorialReviewPage";
import { IsencaoIcmsPage } from "./pages/IsencaoIcmsPage";
import { GerarPdfIsencaoPcdPage } from "./pages/GerarPdfIsencaoPcdPage";
import { ConsultaSisenPage } from "./pages/ConsultaSisenPage";
import { DeclaracaoFinanceiraPage } from "./pages/DeclaracaoFinanceiraPage";
import { TimelineProcessoPage } from "./pages/TimelineProcessoPage";
import { SefazDigitalHubPage } from "./pages/SefazDigitalHubPage";
import { ValidacaoSisenPage } from "./pages/ValidacaoSisenPage";

function RootErrorBoundary() {
  const error = useRouteError() as Error;
  console.error("Root Route Error Boundary:", error);
  return (
    <div className="p-8 text-red-600">
      <h1 className="text-2xl font-bold mb-4">Application Error</h1>
      <pre className="whitespace-pre-wrap text-sm">{error?.message || String(error)}</pre>
      <pre className="whitespace-pre-wrap text-xs mt-4 text-red-400">{error?.stack}</pre>
    </div>
  );
}

function NotFound() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">404 - Página não encontrada</h1>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, Component: InfograficoPcDPage },
      { path: "servico/isencao-icms-pcd", Component: InfograficoPcDPage },
      { path: "isencao-pcd/sucesso", Component: IsencaoPcdSucessoPage },
      { path: "isencao-pcd/acompanhamento", Component: IsencaoPcdAcompanhamentoPage },
      { path: "isencao-pcd/documentacao-pdf", Component: GerarPdfIsencaoPcdPage },
      { path: "revisao-editorial", Component: EditorialReviewPage },
      { path: "isencao-icms", Component: IsencaoIcmsPage },
      { path: "sefaz-digital-hub", Component: SefazDigitalHubPage },
      { path: "validacao-sisen", Component: ValidacaoSisenPage },
      { path: "consulta-sisen", Component: ConsultaSisenPage },
      { path: "declaracao-financeira", Component: DeclaracaoFinanceiraPage },
      { path: "validacoes", Component: ValidacoesPage },
      { path: "processo/:id", Component: TimelineProcessoPage },
      {
        path: "isencao-pcd",
        Component: IsencaoPcdLayoutWrapper,
        children: [
          { index: true, Component: IsencaoPcdAberturaPage },
          { path: "termo", Component: IsencaoPcdTermoPage },
          { path: "identificacao", Component: IsencaoPcdIdentificacaoPage },
          { path: "beneficiario", Component: IsencaoPcdBeneficiarioPage },
          { path: "validacoes", Component: IsencaoPcdValidacoesPage },
          { path: "representante", Component: IsencaoPcdRepresentantePage },
          { path: "documentos", Component: IsencaoPcdDocumentosPage },
          { path: "laudo-medico", Component: IsencaoPcdLaudoMedicoPage },
          { path: "isencao-ipi", Component: IsencaoPcdIpiPage },
          { path: "doc-representacao", Component: IsencaoPcdRepresentacaoDocPage },
          { path: "disponibilidade-financeira", Component: IsencaoPcdDisponibilidadeFinanceiraPage },
          { path: "condutores", Component: IsencaoPcdCondutoresPage },
          { path: "concessionaria", Component: IsencaoPcdConcessionariaPage },
          { path: "fabricante", Component: IsencaoPcdFabricantePage },
          { path: "veiculo", Component: IsencaoPcdVeiculoPage },
          { path: "ipva", Component: IsencaoPcdIpvaPage },
          { path: "resumo", Component: IsencaoPcdResumoPage },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);

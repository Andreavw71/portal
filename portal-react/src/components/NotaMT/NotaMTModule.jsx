import { notaMTData } from '../../data/modulesData';

export default function NotaMTModule() {
  return (
    <section className="module module-nota-mt-revisado config-module" id="nota-mt" data-module-id="nota-mt" aria-labelledby="nota-mt-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">redeem</span>
        <h3 id="nota-mt-heading">Nota MT</h3>
      </div>
      <div className="module-body">
        <div className="widget-section-header nota-mt-section-header">
          <span className="material-icons-outlined" aria-hidden="true">military_tech</span>
          <h4 style={{ display: 'inline-block', verticalAlign: 'middle', margin: 0 }}>Meu Saldo e Sorteios</h4>
        </div>
        <div className="nota-mt-data-details">
          <div className="data-row">
            <span className="label">Total Acumulado:</span>
            <span className="value">{notaMTData.pointsTotal}</span>
          </div>
          <div className="data-row">
            <span className="label">Já Resgatados:</span>
            <span className="value">{notaMTData.pointsRedeemed}</span>
          </div>
          <div className="data-row">
            <span className="label">Saldo Disponível:</span>
            <span className="value large">{notaMTData.pointsAvailable}</span>
          </div>
          <div className="data-row">
            <span className="label">Último Sorteio:</span>
            <span className="value">{notaMTData.lastDrawDate}</span>
          </div>
          <div className="data-row premio-actions-row">
            <span className="label">Situação Prêmio:</span>
            <span className="value draw-result success">{notaMTData.drawResult}</span>
            <button className="button primary small">
              <span className="material-icons-outlined" aria-hidden="true">savings</span> Resgatar Pontos
            </button>
          </div>
        </div>
        <div className="nota-mt-links nota-mt-footer-links">
          <a href="https://www.sefaz.mt.gov.br/notamt/inicio" target="_blank" rel="noopener noreferrer">Como Funciona?</a>
          {' | '}
          <a href="https://www.sefaz.mt.gov.br/notamt/inicio" target="_blank" rel="noopener noreferrer">Resultados Sorteios</a>
          {' | '}
          <a href="https://www.sefaz.mt.gov.br/notamt/inicio" target="_blank" rel="noopener noreferrer" className="nota-mt-portal-link">
            Portal Oficial Nota MT <span className="material-icons-outlined" style={{ fontSize: '1em', verticalAlign: 'middle' }} aria-hidden="true">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
}

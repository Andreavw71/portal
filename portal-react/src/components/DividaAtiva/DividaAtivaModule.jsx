import { useState } from 'react';
import { dividaAtivaData } from '../../data/modulesData';

export default function DividaAtivaModule() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="module module-divida-ativa config-module centered-table" id="divida-ativa" data-module-id="pge" aria-labelledby="divida-heading">
      <div className="module-header">
        <span className="material-icons-outlined" style={{ color: '#dc3545' }} aria-hidden="true">gavel</span>
        <h3 id="divida-heading">Dívida Ativa e Pendências PGE</h3>
      </div>
      <div className="module-body">
        <p className="module-intro-text">Situação de débitos junto à Procuradoria Geral do Estado:</p>
        <div className="pge-section">
          <h4 className="sub-section-title">Débitos em Dívida Ativa</h4>
          <div className="data-table divida-table small-table centered-table pge-table-aligned">
            <div className="data-table-header">
              <span>CDA</span><span>Origem</span>
              <span style={{ textAlign: 'right', justifySelf: 'end' }}>Valor</span>
              <span>Ações</span>
            </div>
            {dividaAtivaData.debitos.map((d, i) => (
              <div key={i} className="data-table-row">
                <div className="data-cell cda-number" data-label="CDA:"><strong>{d.cda}</strong></div>
                <div className="data-cell origem" data-label="Origem:">{d.origin}</div>
                <div className="data-cell valor" data-label="Valor:"><strong>{d.value}</strong></div>
                <div className="data-cell actions">
                  <a href={d.actionLink} className="button primary small">{d.actionLabel}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showMore && (
          <>
            <div className="pge-section">
              <h4 className="sub-section-title">Títulos Protestados</h4>
              <div className="data-table divida-table protesto small-table centered-table pge-table-aligned">
                <div className="data-table-header">
                  <span>CDA Origem</span><span>Cartório</span>
                  <span style={{ textAlign: 'right', justifySelf: 'end' }}>Valor*</span>
                  <span>Ações</span>
                </div>
                {dividaAtivaData.protestos.map((p, i) => (
                  <div key={i} className="data-table-row">
                    <div className="data-cell cda-number" data-label="CDA Origem:"><strong>{p.cda}</strong></div>
                    <div className="data-cell origem" data-label="Cartório:">{p.cartorio}</div>
                    <div className="data-cell valor" data-label="Valor:*"><strong>{p.value}</strong></div>
                    <div className="data-cell actions">
                      <a href={p.actionLink} className="button danger small">{p.actionLabel}</a>
                    </div>
                  </div>
                ))}
              </div>
              <small>*Valor sem custas.</small>
            </div>
            <div className="pge-section">
              <h4 className="sub-section-title">Execuções Fiscais</h4>
              <div className="data-table divida-table execucao small-table centered-table pge-table-aligned">
                <div className="data-table-header">
                  <span>Processo</span><span>Origem</span>
                  <span style={{ textAlign: 'right', justifySelf: 'end' }}>Valor</span>
                  <span>Status</span>
                </div>
                {dividaAtivaData.execucoes.map((e, i) => (
                  <div key={i} className="data-table-row">
                    <div className="data-cell process-number" data-label="Processo:"><strong>{e.processo}</strong></div>
                    <div className="data-cell origem" data-label="Origem:">{e.origin}</div>
                    <div className="data-cell valor" data-label="Valor:"><strong>{e.value}</strong></div>
                    <div className="data-cell" data-label="Status:">
                      <span className={`tag ${e.statusTag}`}>{e.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="module-actions centered">
          <button
            type="button"
            className="button secondary small outlined toggle-visibility-btn"
            aria-expanded={showMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Ocultar Detalhes PGE' : 'Mostrar Mais Detalhes PGE'}
            <span className="material-icons-outlined">{showMore ? 'expand_less' : 'expand_more'}</span>
          </button>
          <a href="#pge-extrato-completo" className="view-all" style={{ marginTop: 0, paddingTop: 0 }}>
            Consultar Extrato Completo na PGE
          </a>
        </div>
      </div>
    </section>
  );
}

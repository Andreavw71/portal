import { useState } from 'react';
import { tadsData } from '../../data/modulesData';

export default function TADsModule() {
  const [showMore, setShowMore] = useState(false);

  const mainItems = tadsData.filter((t) => !t.collapsible);
  const collapsibleItems = tadsData.filter((t) => t.collapsible);

  const renderRow = (tad) => (
    <div key={tad.id} className="data-table-row">
      <div className="data-cell tad-number" data-label="Termo"><strong>{tad.term}</strong></div>
      <div className="data-cell tad-origin" data-label="Origem">{tad.origin}</div>
      <div className="data-cell tad-value" data-label="Valor"><strong>{tad.value}</strong></div>
      <div className="data-cell actions">
        <a href={tad.impugnarLink} className="action-link small">Impugnar</a><br />
        <a href={tad.pagarLink} className="button danger small" style={{ marginTop: '5px' }}>Pagar</a>
      </div>
    </div>
  );

  return (
    <section className="module module-tads-revisado config-module centered-table" id="tads-module" data-module-id="tads" aria-labelledby="tads-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">receipt_long</span>
        <h3 id="tads-heading">Termos de Apreensão e Depósito</h3>
      </div>
      <div className="module-body">
        <p className="module-intro-text">Consulte os Termos de Apreensão e Depósito (TAD) vinculados:</p>
        <div className="data-table tads-table centered-table">
          <div className="data-table-header">
            <span>Termo</span><span>Origem</span><span style={{ textAlign: 'right', justifySelf: 'end' }}>Valor</span><span>Ações</span>
          </div>
          {mainItems.map(renderRow)}
          {showMore && collapsibleItems.map(renderRow)}
        </div>
        <div className="module-actions centered">
          {collapsibleItems.length > 0 && (
            <button
              type="button"
              className="button secondary small outlined toggle-visibility-btn"
              aria-expanded={showMore}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Ocultar TADs' : 'Mostrar Mais TADs'}
              <span className="material-icons-outlined">{showMore ? 'expand_less' : 'expand_more'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

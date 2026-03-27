import { useState } from 'react';
import { nfaeData } from '../../data/modulesData';

export default function NFAeModule() {
  const [showMore, setShowMore] = useState(false);

  const mainItems = nfaeData.filter((n) => !n.collapsible);
  const collapsibleItems = nfaeData.filter((n) => n.collapsible);

  const renderRow = (item) => (
    <div key={item.id} className="data-table-row">
      <div className="data-cell nfae-number" data-label="NFA-e / Data:">
        <strong>{item.number}</strong>
        <span className="nfae-date">Emitida: {item.date}</span>
      </div>
      <div className="data-cell nfae-recipient" data-label="Destinatário:">
        {item.recipient}<br /><small>{item.recipientDoc}</small>
      </div>
      <div className="data-cell nfae-value" data-label="Valor:"><strong>{item.value}</strong></div>
      <div className="data-cell nfae-status" data-label="Status:">
        <span className={`tag ${item.statusTag}`}>{item.status}</span>
      </div>
      <div className="data-cell actions">
        <a href={item.viewLink} className="action-link small">Visualizar</a>
        {item.cancelLink && (
          <a href={item.cancelLink} className="action-link small danger">Cancelar</a>
        )}
        {item.cancelDisabled && (
          <span className="action-link small disabled">Cancelar</span>
        )}
      </div>
    </div>
  );

  return (
    <section className="module module-nfae-emitidas config-module centered-table" id="nfae-emitidas" data-module-id="nfae" aria-labelledby="nfae-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">description</span>
        <h3 id="nfae-heading">Minhas Notas Fiscais Avulsas Emitidas</h3>
      </div>
      <div className="module-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <p className="module-intro-text" style={{ order: 1 }}>Consulte as Notas Fiscais Avulsas que você emitiu:</p>
        <div className="data-table nfae-table centered-table" style={{ order: 2 }}>
          <div className="data-table-header">
            <span>Número / Data</span><span>Destinatário</span>
            <span style={{ textAlign: 'right', justifySelf: 'end' }}>Valor</span>
            <span>Status</span><span>Ações</span>
          </div>
          {mainItems.map(renderRow)}
          {showMore && collapsibleItems.map(renderRow)}
        </div>
        <div className="module-controls-row" style={{ order: 4 }}>
          <div className="module-actions centered" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
            {collapsibleItems.length > 0 && (
              <button
                type="button"
                className="button secondary small outlined toggle-visibility-btn"
                aria-expanded={showMore}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Ocultar NFA-e' : 'Mostrar Mais NFA-e'}
                <span className="material-icons-outlined">{showMore ? 'expand_less' : 'expand_more'}</span>
              </button>
            )}
          </div>
        </div>
        <div className="module-actions" style={{ order: 5, borderTop: '1px dashed var(--cinza-borda)', marginTop: '20px', paddingTop: '15px', justifyContent: 'space-between' }}>
          <a href="#nfae-emitir" className="button primary small">
            <span className="material-icons-outlined" aria-hidden="true">add</span> Emitir Nova NFA-e
          </a>
          <a href="#nfae-extrato-completo" className="view-all" style={{ marginTop: 0, paddingTop: 0 }}>
            Consultar Extrato Completo de NFA-e
          </a>
        </div>
      </div>
    </section>
  );
}

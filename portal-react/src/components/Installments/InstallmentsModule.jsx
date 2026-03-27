import { useState } from 'react';
import { installmentsData } from '../../data/modulesData';

export default function InstallmentsModule() {
  const [showMore, setShowMore] = useState(false);

  const mainItems = installmentsData.filter((i) => !i.collapsible);
  const collapsibleItems = installmentsData.filter((i) => i.collapsible);

  const renderRow = (item) => (
    <div key={item.id} className="data-table-row">
      <div className="data-cell description" data-label="Descrição:"><strong>{item.description}</strong></div>
      <div className="data-cell due-info" data-label="Próx. Parcela:">{item.nextInstallment}</div>
      <div className="data-cell value" data-label="Valor:"><strong>{item.value}</strong></div>
      <div className="data-cell actions">
        <a href={item.detailsLink} className="action-link small">Detalhes</a>
        <a href={item.boletoLink} className="button primary small" style={{ marginTop: '5px' }}>Gerar Boleto</a>
      </div>
    </div>
  );

  return (
    <section className="module module-installments config-module centered-table" id="installments" data-module-id="installments" aria-labelledby="installments-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">request_quote</span>
        <h3 id="installments-heading">Meus Parcelamentos</h3>
      </div>
      <div className="module-body">
        <p className="module-intro-text">Acompanhe seus parcelamentos ativos:</p>
        <div className="data-table installment-table centered-table">
          <div className="data-table-header">
            <span>Descrição</span><span>Próxima Parcela</span><span style={{ textAlign: 'right', justifySelf: 'end' }}>Valor</span><span>Ações</span>
          </div>
          {mainItems.map(renderRow)}
          {showMore && collapsibleItems.map(renderRow)}
        </div>
        <div className="module-actions">
          <a href="#solicitar-parcelamento" className="button secondary small outlined">
            <span className="material-icons-outlined" aria-hidden="true">add_circle_outline</span>Solicitar Novo Parcelamento
          </a>
          {collapsibleItems.length > 0 && (
            <button
              type="button"
              className="button secondary small outlined toggle-visibility-btn"
              aria-expanded={showMore}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Ocultar Parcelamentos' : 'Mostrar Mais Parcelamentos'}
              <span className="material-icons-outlined">{showMore ? 'expand_less' : 'expand_more'}</span>
            </button>
          )}
          <a href="#conta-corrente-fiscal" className="view-all" style={{ marginTop: 0, paddingTop: 0 }}>Acessar Conta Corrente</a>
        </div>
      </div>
    </section>
  );
}

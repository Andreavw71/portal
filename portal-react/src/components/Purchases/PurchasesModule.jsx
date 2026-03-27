import { useState } from 'react';
import { purchasesData } from '../../data/modulesData';

export default function PurchasesModule() {
  const [showMore, setShowMore] = useState(false);

  const months = Object.entries(purchasesData);
  const mainMonths = months.filter(([, data]) => !data.collapsible);
  const collapsibleMonths = months.filter(([, data]) => data.collapsible);

  return (
    <section className="module module-minhas-compras config-module" id="minhas-compras-notamt" data-module-id="minhas-compras" aria-labelledby="minhas-compras-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">shopping_basket</span>
        <h3 id="minhas-compras-heading">Minhas Compras (Nota MT)</h3>
      </div>
      <div className="module-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <p className="module-intro-text" style={{ order: 1 }}>Consulte as notas fiscais com seu CPF:</p>
        <div className="monthly-purchases" style={{ order: 2 }}>
          {mainMonths.map(([monthName, data]) => (
            <details key={monthName} className="month-group" open={data.open}>
              <summary>{monthName} <span className="count">({data.count} notas)</span></summary>
              <ul className="purchase-list">
                {data.items.map((item, i) => (
                  <li key={i}>
                    <span className="date">{item.date}</span>
                    <span className="company"><strong>{item.company}</strong></span>
                    <span className="value"><strong>{item.value}</strong></span>
                    <a href={item.link} className="action-link small">Ver Detalhes/NFe</a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          {showMore && collapsibleMonths.map(([monthName, data]) => (
            <details key={monthName} className="month-group">
              <summary>{monthName} <span className="count">({data.count} notas)</span></summary>
              <ul className="purchase-list">
                {data.items.map((item, i) => (
                  <li key={i}>
                    <span className="date">{item.date}</span>
                    <span className="company"><strong>{item.company}</strong></span>
                    <span className="value"><strong>{item.value}</strong></span>
                    <a href={item.link} className="action-link small">Ver Detalhes/NFe</a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <div className="module-controls-row" style={{ order: 3 }}>
          <div className="module-actions centered" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
            {collapsibleMonths.length > 0 && (
              <button
                type="button"
                className="button secondary small outlined toggle-visibility-btn"
                aria-expanded={showMore}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Ocultar Meses Anteriores' : 'Mostrar Meses Anteriores'}
                <span className="material-icons-outlined">{showMore ? 'expand_less' : 'expand_more'}</span>
              </button>
            )}
          </div>
        </div>
        <a href="#notamt-extrato-completo" className="view-all" style={{ order: 4, marginTop: '20px' }}>
          Ver extrato completo no Portal Nota MT
        </a>
      </div>
    </section>
  );
}

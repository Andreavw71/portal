import { useState } from 'react';

export default function AlertCard({ alert }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`alert-card ${alert.type} expandable-card`} id={alert.id}>
      <div className="card-header">
        <div className="card-header-info">
          <span className="alert-icon">
            <span className="material-icons-outlined">{alert.icon}</span>
          </span>
          <span className="alert-title"><strong>{alert.title}</strong></span>
        </div>
        <button
          className="btn-details"
          title="Ver/Ocultar Detalhes"
          aria-expanded={expanded}
          aria-label={`Ver/Ocultar Detalhes ${alert.title}`}
          onClick={() => setExpanded(!expanded)}
        >
          <span className="material-icons-outlined">{expanded ? 'expand_less' : 'expand_more'}</span>
        </button>
      </div>
      {expanded && (
        <div className="detail-panel" role="region">
          {alert.details.map((detail, i) => (
            <p key={i} className="alert-details">
              {detail.label ? `${detail.label}: ` : ''}
              {detail.bold ? <strong>{detail.value}</strong> : detail.value}
            </p>
          ))}
          {alert.note && <small style={{ fontSize: '0.75em', display: 'block', marginBottom: '5px' }}>{alert.note}</small>}
          <div className="detail-actions">
            <a href={alert.actionLink} className={`button ${alert.actionVariant} small`}>{alert.actionLabel}</a>
          </div>
        </div>
      )}
    </article>
  );
}

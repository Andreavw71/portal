import { useState } from 'react';
import { processesData } from '../../data/modulesData';

export default function ProcessesModule() {
  const [showMore, setShowMore] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const mainItems = processesData.filter((p) => !p.collapsible);
  const collapsibleItems = processesData.filter((p) => p.collapsible);

  const toggleSubject = (id) => {
    setExpandedSubjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderRow = (process) => (
    <div key={process.id} className="data-table-row">
      <div className="data-cell process-number" data-label="Número"><strong>{process.number}</strong></div>
      <div className="data-cell process-subject expandable-text" data-label="Assunto">
        {expandedSubjects[process.id] ? (
          <span className="text-full">{process.subject}</span>
        ) : (
          <span className="text-preview">{process.subjectPreview}<span className="ellipsis">...</span></span>
        )}
        <button className="expand-button" aria-label="Mostrar/Ocultar assunto completo" onClick={() => toggleSubject(process.id)}>
          <span className="material-icons-outlined">{expandedSubjects[process.id] ? 'expand_less' : 'expand_more'}</span>
        </button>
      </div>
      <div className="data-cell process-update" data-label="Últ. Andamento">{process.lastUpdate}</div>
      <div className="data-cell process-status" data-label="Status">
        <a href={process.link} className="status-link" aria-label={`Ver detalhes do processo ${process.number}`}>
          <span className={`tag ${process.statusTag}`}>{process.status}</span>
        </a>
      </div>
    </div>
  );

  return (
    <section className="module module-processes-all config-module centered-table" id="processes" data-module-id="processes" aria-labelledby="processes-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">assignment</span>
        <h3 id="processes-heading">Meus Processos e Solicitações</h3>
      </div>
      <div className="module-body">
        <p className="module-intro-text">Acompanhe aqui seus processos administrativos e solicitações registradas:</p>
        <div className="data-table processes-table centered-table">
          <div className="data-table-header">
            <span>Número</span><span>Assunto</span><span>Últ. Andamento</span><span>Status</span>
          </div>
          {mainItems.map(renderRow)}
          {showMore && collapsibleItems.map(renderRow)}
        </div>
        <div className="module-actions">
          <a href="#novo-processo" className="button secondary small outlined">
            <span className="material-icons-outlined" aria-hidden="true">add_circle_outline</span> Protocolar Novo Processo
          </a>
          {collapsibleItems.length > 0 && (
            <button
              type="button"
              className="button secondary small outlined toggle-visibility-btn"
              aria-expanded={showMore}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Ocultar Processos' : 'Mostrar Mais Processos'}
              <span className="material-icons-outlined">{showMore ? 'expand_less' : 'expand_more'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

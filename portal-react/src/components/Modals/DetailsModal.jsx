export default function DetailsModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay details-modal" role="dialog" aria-modal="true" aria-labelledby="details-modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="details-modal-title">{title || 'Detalhes'}</h2>
          <button className="modal-close-button" title="Fechar" aria-label="Fechar detalhes" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children || <p>Carregando detalhes...</p>}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function ExitSurveyModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(null);
  const [found, setFound] = useState(null);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const emojis = [
    { value: 'pessimo', label: 'Péssimo', emoji: '\uD83D\uDE1E' },
    { value: 'ruim', label: 'Ruim', emoji: '\uD83D\uDE15' },
    { value: 'neutro', label: 'Neutro', emoji: '\uD83D\uDE10' },
    { value: 'bom', label: 'Bom', emoji: '\uD83D\uDE0A' },
    { value: 'otimo', label: 'Ótimo', emoji: '\uD83D\uDE03' },
  ];

  return (
    <div className="modal-overlay exit-intent-modal" role="dialog" aria-modal="true" aria-labelledby="modal-exit-title">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-exit-title">Sua Opinião Importa!</h2>
          <button className="modal-close-button" title="Fechar" aria-label="Fechar pesquisa de satisfação" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>Antes de sair, poderia nos dizer como foi sua experiência no portal?</p>
          <fieldset className="survey-question">
            <legend><strong>1. Como você avalia sua experiência geral?</strong></legend>
            <div className="satisfaction-emojis">
              {emojis.map((e) => (
                <button
                  key={e.value}
                  className={`emoji-btn ${rating === e.value ? 'selected' : ''}`}
                  title={e.label}
                  aria-label={`Avaliação: ${e.label}`}
                  onClick={() => setRating(e.value)}
                >
                  {e.emoji}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="survey-question">
            <legend><strong>2. Você encontrou facilmente o que procurava?</strong></legend>
            <div className="survey-options">
              {['Sim', 'Parcialmente', 'Não'].map((opt) => (
                <label key={opt}>
                  <input type="radio" name="encontrou" value={opt.toLowerCase()} checked={found === opt.toLowerCase()} onChange={() => setFound(opt.toLowerCase())} />
                  {' '}{opt}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="survey-question">
            <label htmlFor="survey-comment"><strong>3. Gostaria de deixar um comentário ou sugestão? (Opcional)</strong></label>
            <textarea id="survey-comment" rows="3" placeholder="Digite seu comentário aqui..." value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="button primary" onClick={onClose}>Enviar Avaliação</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'iara', text: 'Olá! Sou a Iara, sua assistente virtual da SEFAZ-MT.', time: '14:14' },
    {
      from: 'iara',
      text: 'Para consultas com dados pessoais, preciso do seu consentimento (LGPD). Concorda?',
      time: '14:14',
      options: [
        { label: 'Sim, concordo', value: 'sim-lgpd' },
        { label: 'Não concordo', value: 'nao-lgpd' },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: inputValue, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <button
        className="chatbot-fab enlarged-fab"
        title="Olá! Precisa de Ajuda? Fale com a Iara"
        aria-label="Abrir chat com assistente virtual Iara"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/Iara.png" alt="Iara - Assistente Virtual" loading="lazy" />
      </button>

      {isOpen && (
        <div className="chat-window" role="log" aria-live="polite">
          <div className="chat-header">
            <span className="chat-title">Iara - Atendente Virtual</span>
            <div className="chat-header-actions">
              <button className="chat-action-button" title="Falar com Atendente" aria-label="Solicitar atendente humano">
                <span className="material-icons-outlined">support_agent</span>
              </button>
              <button className="chat-action-button" title="Minimizar" aria-label="Minimizar chat" onClick={() => setIsOpen(false)}>
                <span className="material-icons-outlined">remove</span>
              </button>
              <button className="chat-action-button" title="Fechar" aria-label="Fechar chat" onClick={() => setIsOpen(false)}>
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
          </div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from === 'iara' ? 'iara' : 'user'}`}>
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
                {msg.options && (
                  <div className="chat-options">
                    {msg.options.map((opt, j) => (
                      <button key={j} className="chat-option-button" data-value={opt.value}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Digite sua pergunta ou escolha uma opção..."
              aria-label="Digite sua mensagem para o chat"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-send-button" title="Enviar" aria-label="Enviar mensagem" onClick={handleSend}>
              <span className="material-icons-outlined">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

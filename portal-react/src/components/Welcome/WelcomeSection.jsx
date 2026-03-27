import { useState } from 'react';

export default function WelcomeSection({ user, onShowUpdateModal }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="module module-welcome-simplified config-module" data-module-id="welcome" aria-labelledby="welcome-heading">
      <div className="module-body">
        <div className="welcome-line-1">
          <h2 className="welcome-greeting" id="welcome-heading">
            <span className="wave-emoji" aria-hidden="true">👋</span> Olá, <span className="user-detail highlight name">{user.firstName}</span>!
          </h2>
          <span className="user-detail access-time subtle">
            <span className="material-icons-outlined detail-icon subtle" aria-hidden="true">schedule</span> Último acesso: {user.lastAccess}
          </span>
        </div>
        <div className="welcome-line-2">
          <p className="welcome-subtitle">Seja bem-vinda ao Portal de Autoatendimento da SEFAZ-MT.</p>
        </div>
        <div className="welcome-line-3">
          <p className="welcome-intro-text">Aqui você encontra seus serviços fiscais de forma rápida e segura. Mantenha seus dados atualizados.</p>
          <div className="welcome-actions">
            <button className="button primary prominent-update" onClick={onShowUpdateModal}>
              <span className="material-icons-outlined" aria-hidden="true">edit</span> Atualizar Dados
            </button>
          </div>
        </div>
        <div className="welcome-search-bar" role="search">
          <input
            type="search"
            placeholder="Pesquisar serviços ou informações no portal..."
            aria-label="Pesquisar no portal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="button secondary small" aria-label="Realizar pesquisa">
            <span className="material-icons-outlined" aria-hidden="true">search</span>
          </button>
        </div>
      </div>
    </section>
  );
}

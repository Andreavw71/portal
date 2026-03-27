import { useState } from 'react';
import { notifications, recentAtendimentos } from '../../data/userData';

export default function MainHeaderBar({ user }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="main-header-bar">
      <div className="container main-header-container">
        <div className="header-left">
          <a href="https://www5.sefaz.mt.gov.br/" target="_blank" rel="noopener noreferrer" className="logo-link">
            <img src="/sefaz-logo.png" alt="Logo SEFAZ MT" className="logo" />
            <h1>Portal de Autoatendimento</h1>
          </a>
        </div>
        <div className="header-right" role="navigation" aria-label="Controles do usuário">
          <div className="accessibility-controls">
            <span>ACESSIBILIDADE</span>
            <button title="Aumentar Fonte" className="a11y-button" aria-label="Aumentar fonte">A+</button>
            <button title="Diminuir Fonte" className="a11y-button" aria-label="Diminuir fonte">A-</button>
            <button title="Alto Contraste" className="a11y-button" aria-pressed="false" aria-label="Alternar alto contraste">
              <span className="material-icons-outlined" aria-hidden="true">contrast</span>
            </button>
          </div>
          <a href="http://www.transparencia.mt.gov.br/" target="_blank" rel="noopener noreferrer" className="transparencia-link icon-link" title="Portal da Transparência">
            <img src="/transparencia-logo-white.png" alt="Portal da Transparência" />
          </a>
          <div className="user-info">
            <div style={{ position: 'relative' }}>
              <button
                className="icon-button notification-button"
                title="Notificações"
                aria-haspopup="true"
                aria-expanded={notifOpen}
                aria-label="Abrir notificações"
                onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
              >
                <span className="material-icons-outlined">notifications</span>
                <span className="notification-badge">{notifications.length}</span>
              </button>
              {notifOpen && (
                <div className="header-dropdown notifications">
                  <div className="dropdown-header">Notificações Recentes</div>
                  <ul className="dropdown-list">
                    {notifications.map((n) => (
                      <li key={n.id}>
                        <a href={n.link}>
                          <span className={`material-icons-outlined icon ${n.iconClass}`}>{n.icon}</span>
                          <div className="content">
                            <p><strong>{n.title}:</strong> {n.message}</p>
                            <span className="timestamp">{n.timestamp}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="dropdown-footer">
                    <a href="#notifications-page">Ver todas as notificações</a>
                  </div>
                </div>
              )}
            </div>
            <div className="user-dropdown">
              <button
                className="user-button"
                title="Menu do Usuário"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                aria-label="Abrir menu do usuário"
                onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
              >
                <span className="user-name-header-highlight">{user.firstName}</span>
                <span className="material-icons-outlined dropdown-arrow">arrow_drop_down</span>
              </button>
              {userMenuOpen && (
                <div className="dropdown-content user-dropdown-content">
                  <div className="dropdown-user-info">
                    <strong>{user.name}</strong><br />
                    <small>CPF: {user.cpf}</small>
                  </div>
                  <div className="dropdown-divider" />
                  <a href="#"><span className="material-icons-outlined">person_outline</span> Meu Perfil Completo</a>
                  <a href="#alterar-senha"><span className="material-icons-outlined">security</span> Alterar Senha</a>
                  <a href="#"><span className="material-icons-outlined">switch_account</span> Mudar Perfil (Contador)</a>
                  <a href="#configuracoes"><span className="material-icons-outlined">settings</span> Configurações</a>
                  <div className="dropdown-divider" />
                  <a href="#logout"><span className="material-icons-outlined">logout</span> Sair</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

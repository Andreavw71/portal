import { useState } from 'react';
import { secondaryNavLinks } from '../../data/servicesData';
import { recentAtendimentos } from '../../data/userData';

export default function SecondaryNav() {
  const [atendimentosOpen, setAtendimentosOpen] = useState(false);

  return (
    <nav className="secondary-nav-bar" role="navigation" aria-label="Navegação Secundária">
      <div className="container secondary-nav-container">
        <div
          className="current-section-indicator clickable"
          title="Ver Meus Atendimentos"
          aria-haspopup="true"
          aria-expanded={atendimentosOpen}
          onClick={() => setAtendimentosOpen(!atendimentosOpen)}
        >
          Meus atendimentos
          <span className="material-icons-outlined dropdown-arrow-secondary">arrow_drop_down</span>
          {atendimentosOpen && (
            <div className="header-dropdown atendimentos">
              <div className="dropdown-header">Meus Últimos Atendimentos</div>
              <ul className="dropdown-list">
                {recentAtendimentos.map((a) => (
                  <li key={a.id}>
                    <a href={a.link}>
                      <div className="content">
                        <p><strong>{a.protocol}:</strong> {a.subject}</p>
                        <span className="details">Status: {a.status} | Atualizado: {a.updated}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="dropdown-footer">
                <a href="#todos-atendimentos">Ver todos os atendimentos</a>
              </div>
            </div>
          )}
        </div>
        <div className="secondary-nav-links">
          {secondaryNavLinks.map((link, i) => (
            <a
              key={i}
              href={link.link}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="http://www.transparencia.mt.gov.br/acesso-a-informacao/servico-de-informacao-ao-cidadao-sic-presencial/"
          target="_blank"
          rel="noopener noreferrer"
          className="sic-link icon-link"
          title="Serviço de Informação ao Cidadão"
        >
          <img src="/sic-logo.png" alt="SIC" />
        </a>
      </div>
    </nav>
  );
}

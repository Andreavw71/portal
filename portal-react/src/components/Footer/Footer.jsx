import { footerColumns } from '../../data/servicesData';

export default function Footer() {
  return (
    <footer className="portal-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-links">
          {footerColumns.map((col, i) => (
            <div key={i} className="footer-column">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.link}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom-content">
          <div className="footer-contact-info">
            <h4>Contato SEFAZ/MT</h4>
            <p>
              Secretaria de Estado de Fazenda - SEFAZ MT<br />
              Av. Historiador Rubens de Mendonça (Av. do CPA) - Centro Político Administrativo<br />
              Bloco C - Cuiabá/MT - CEP: 78049-919
            </p>
          </div>
          <div className="footer-apps-dev">
            <div className="app-badges">
              <a href="#" target="_blank" rel="noopener noreferrer" title="Disponível no Google Play">
                <img src="/google-play-badge.png" alt="Disponível no Google Play" loading="lazy" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" title="Disponível na App Store">
                <img src="/app-store-badge.png" alt="Disponível na App Store" loading="lazy" />
              </a>
            </div>
            <div className="developer-info">
              <span>Desenvolvido por</span>
              <a href="https://www.mti.mt.gov.br/" target="_blank" rel="noopener noreferrer">
                <img src="/mti-logo.png" alt="MTI" loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { recentAccessData } from '../../data/servicesData';

export default function RecentServices() {
  return (
    <section className="module module-recent-services config-module" data-module-id="recent-services" aria-labelledby="recent-access-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">history</span>
        <h3 id="recent-access-heading">Acessos Recentes</h3>
      </div>
      <div className="module-body">
        <div className="cards-grid" id="recent-access-grid">
          {recentAccessData.map((item) => (
            <article key={item.id} className="card recent-access-card" role="group">
              <div className="card-main-line">
                <span className="card-icon material-icons-outlined" aria-hidden="true">{item.icon}</span>
                <h4 className="card-title">{item.title}</h4>
                <button className="btn-details button secondary extra-small outlined" aria-label={`Ver detalhes de ${item.title}`}>
                  Detalhes
                </button>
              </div>
              <p className="card-timestamp">{item.timestamp}</p>
            </article>
          ))}
        </div>
        <a href="#historico-completo-servicos" className="view-all">Ver histórico completo</a>
      </div>
    </section>
  );
}

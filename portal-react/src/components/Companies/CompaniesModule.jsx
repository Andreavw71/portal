import { companiesData } from '../../data/modulesData';

export default function CompaniesModule() {
  return (
    <section className="module config-module" id="empresas-vinculadas" data-module-id="empresas-vinculadas" aria-labelledby="empresas-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">business</span>
        <h3 id="empresas-heading">Empresas Vinculadas ao meu CPF</h3>
      </div>
      <div className="module-body">
        <p className="module-intro-text">Empresas em que seu CPF consta como sócio ou responsável:</p>
        <div className="data-table companies-table centered-table">
          <div className="data-table-header">
            <span>Inscrição Estadual</span><span>Razão Social</span><span>CNPJ</span>
            <span>Situação Cadastral</span>
            <span style={{ textAlign: 'center', justifySelf: 'center' }}>Ações</span>
          </div>
          {companiesData.map((company, i) => (
            <div key={i} className="data-table-row">
              <div className="data-cell ie-number" data-label="IE:"><strong>{company.ie}</strong></div>
              <div className="data-cell company-name" data-label="Razão Social:">{company.name}</div>
              <div className="data-cell cnpj" data-label="CNPJ:">{company.cnpj}</div>
              <div className="data-cell status" data-label="Situação:">
                <span className={`tag ${company.statusTag}`}>{company.status}</span>
              </div>
              <div className="data-cell actions">
                <a href={company.link} className="action-link small">Ver Ficha</a>
              </div>
            </div>
          ))}
        </div>
        <a href="#consulta-completa-vinculos" className="view-all">Consultar Cadastro Completo</a>
      </div>
    </section>
  );
}

import { useState } from 'react';

export default function MenorPrecoModule() {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [distancia, setDistancia] = useState(10);
  const [periodo, setPeriodo] = useState(7);

  return (
    <section className="module module-menor-preco config-module" id="menor-preco" data-module-id="menor-preco" aria-labelledby="menor-preco-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">price_check</span>
        <h3 id="menor-preco-heading">Consulta Menor Preço</h3>
      </div>
      <div className="module-body">
        <div className="menor-preco-filters filter-area revised-filters">
          <div className="filter-row">
            <div className="form-group full-width">
              <label htmlFor="menor-preco-produto">Pesquisar Produto*</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <input type="text" id="menor-preco-produto" placeholder="Digite nome ou cód. barras" />
                <button type="button" className="button icon-button-input" title="Buscar Produto" aria-label="Buscar Produto">
                  <span className="material-icons-outlined">search</span>
                </button>
              </div>
            </div>
          </div>
          <div className="filter-row">
            <div className="form-group full-width">
              <label htmlFor="menor-preco-municipio">Município</label>
              <select id="menor-preco-municipio">
                <option value="cuiaba">Cuiabá</option>
                <option value="varzea_grande">Várzea Grande</option>
                <option value="rondonopolis">Rondonópolis</option>
                <option value="sinop">Sinop</option>
                <option value="outros">Outros...</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="form-group full-width">
              <label htmlFor="menor-preco-min">Valor Mínimo</label>
              <input type="number" id="menor-preco-min" placeholder="R$" step="0.01" />
            </div>
          </div>
          <div className="filter-row">
            <div className="form-group full-width">
              <label htmlFor="menor-preco-max">Valor Máximo</label>
              <input type="number" id="menor-preco-max" placeholder="R$" step="0.01" />
            </div>
          </div>
          <div className="module-actions centered" style={{ borderTop: 'none', paddingTop: '5px', marginTop: '5px' }}>
            <button
              type="button"
              className="button secondary small outlined toggle-visibility-btn"
              aria-expanded={showMoreFilters}
              onClick={() => setShowMoreFilters(!showMoreFilters)}
            >
              {showMoreFilters ? 'Ocultar Filtros' : 'Mostrar Mais Filtros'}
              <span className="material-icons-outlined">{showMoreFilters ? 'expand_less' : 'expand_more'}</span>
            </button>
          </div>
          {showMoreFilters && (
            <div>
              <div className="filter-row">
                <div className="form-group slider-group full-width">
                  <label htmlFor="menor-preco-distancia">Distância Máxima: <span className="slider-value">{distancia} Km</span></label>
                  <input type="range" id="menor-preco-distancia" min="1" max="50" value={distancia} step="1" className="slider-input" onChange={(e) => setDistancia(e.target.value)} />
                </div>
              </div>
              <div className="filter-row">
                <div className="form-group slider-group full-width">
                  <label htmlFor="menor-preco-periodo">Período da Pesquisa: <span className="slider-value">{periodo} dias</span></label>
                  <input type="range" id="menor-preco-periodo" min="1" max="30" value={periodo} step="1" className="slider-input" onChange={(e) => setPeriodo(e.target.value)} />
                </div>
              </div>
            </div>
          )}
          <div className="filter-row">
            <div className="form-group actions-filter full-width" style={{ marginTop: '15px' }}>
              <button type="button" className="button primary" style={{ width: '100%' }}>
                <span className="material-icons-outlined" aria-hidden="true">search</span> Pesquisar Menor Preço
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

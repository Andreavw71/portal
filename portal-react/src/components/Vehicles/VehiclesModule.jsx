import { useState } from 'react';
import { vehiclesData } from '../../data/modulesData';

function VehicleCard({ vehicle }) {
  return (
    <article className="vehicle-card-v22" aria-labelledby={`plate-${vehicle.plate.toLowerCase()}`}>
      <div className="vehicle-card-header">
        <span className="plate" id={`plate-${vehicle.plate.toLowerCase()}`}>{vehicle.plate}</span>
        <span className="model-year">{vehicle.model}</span>
        <a href={vehicle.detailsLink} className="action-link">Detalhes</a>
      </div>
      <div className="vehicle-card-body">
        {vehicle.sections.map((section, i) => (
          <div key={i} className={`status-section ${section.type} status-${section.statusTag === 'success' ? 'ok' : section.statusTag === 'danger' ? (section.type === 'multas' ? 'pendente' : 'vencido') : 'vencer'}`}>
            <span className="label">
              <span className="material-icons-outlined">{section.icon}</span>{section.label}
            </span>
            <span className={`status-tag tag ${section.statusTag}`}>{section.status}</span>
            <span className="value">{section.value}</span>
            <span className="due-date">{section.dueDate || '\u00A0'}</span>
            {section.actionLabel ? (
              <a href={section.actionLink} className={`button ${section.actionVariant} small action-button`}>{section.actionLabel}</a>
            ) : (
              <span className="action-button-placeholder" />
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default function VehiclesModule() {
  const [showMore, setShowMore] = useState(false);

  const mainVehicles = vehiclesData.filter((v) => !v.collapsible);
  const collapsibleVehicles = vehiclesData.filter((v) => v.collapsible);

  return (
    <section className="module module-vehicles-v22 config-module" id="vehicles" data-module-id="vehicles" aria-labelledby="vehicles-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">directions_car</span>
        <h3 id="vehicles-heading">Meus Veículos</h3>
      </div>
      <div className="module-body enhanced-vehicle-v22">
        {mainVehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
        {showMore && collapsibleVehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
        <div className="module-actions centered">
          <button
            type="button"
            className="button secondary small outlined toggle-visibility-btn"
            aria-expanded={showMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Ocultar Veículos' : 'Mostrar Mais Veículos'}
            <span className="material-icons-outlined">{showMore ? 'expand_less' : 'expand_more'}</span>
          </button>
        </div>
        <a href="#todos-veiculos" className="view-all" style={{ textAlign: 'center', marginTop: '10px' }}>
          Ver histórico completo de veículos
        </a>
      </div>
    </section>
  );
}

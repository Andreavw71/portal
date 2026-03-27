import AlertCard from './AlertCard';
import { alertsData } from '../../data/alertsData';

export default function PendenciasAvisos() {
  return (
    <section className="module config-module" id="pendencias-avisos" data-module-id="pendencias-avisos" aria-labelledby="pendencias-heading">
      <div className="module-header header-pendencias">
        <span className="material-icons-outlined" aria-hidden="true">notification_important</span>
        <h3 id="pendencias-heading">Pendências e Avisos</h3>
      </div>
      <div className="module-body">
        <div className="pendencias-avisos-grid">
          {alertsData.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </section>
  );
}

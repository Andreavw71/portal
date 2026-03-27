import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { paymentHistoryData } from '../../data/modulesData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function PaymentHistoryModule() {
  const [year, setYear] = useState('2024');
  const [periodType, setPeriodType] = useState('ano');
  const [semester, setSemester] = useState('all');
  const [quarter, setQuarter] = useState('all');
  const [month, setMonth] = useState('all');
  const [showTable, setShowTable] = useState(false);

  const filtered = paymentHistoryData.filter((p) => {
    const d = new Date(p.date);
    if (d.getFullYear().toString() !== year) return false;
    const m = d.getMonth() + 1;
    if (periodType === 'semestre' && semester !== 'all') {
      return semester === '1' ? m <= 6 : m > 6;
    }
    if (periodType === 'trimestre' && quarter !== 'all') {
      const q = Math.ceil(m / 3);
      return q.toString() === quarter;
    }
    if (periodType === 'mes' && month !== 'all') {
      return m.toString() === month;
    }
    return true;
  });

  const total = filtered.reduce((sum, p) => sum + p.valor, 0);

  const groupedByTributo = {};
  const monthsSet = new Set();
  filtered.forEach((p) => {
    const d = new Date(p.date);
    const m = d.getMonth();
    monthsSet.add(m);
    if (!groupedByTributo[p.tributo]) groupedByTributo[p.tributo] = {};
    groupedByTributo[p.tributo][m] = (groupedByTributo[p.tributo][m] || 0) + p.valor;
  });

  const sortedMonths = [...monthsSet].sort((a, b) => a - b);
  const labels = sortedMonths.map((m) => monthNames[m]);
  const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f'];
  const datasets = Object.keys(groupedByTributo).map((tributo, i) => ({
    label: tributo,
    data: sortedMonths.map((m) => groupedByTributo[tributo][m] || 0),
    backgroundColor: colors[i % colors.length],
  }));

  const chartData = { labels, datasets };
  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true, ticks: { callback: (v) => `R$ ${v.toFixed(0)}` } } },
  };

  return (
    <section className="module module-dynamic-dashboard config-module" id="payment-history-dynamic" data-module-id="payment-history-dynamic" aria-labelledby="payment-history-dynamic-heading">
      <div className="module-header">
        <span className="material-icons-outlined" aria-hidden="true">history_edu</span>
        <h3 id="payment-history-dynamic-heading">Histórico de Pagamentos</h3>
      </div>
      <div className="module-body">
        <div className="dynamic-dashboard-container">
          <details open>
            <summary>Filtros</summary>
            <div className="filters">
              <label>
                Ano
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </label>
              <label>
                Período
                <select value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
                  <option value="ano">Ano</option>
                  <option value="semestre">Semestre</option>
                  <option value="trimestre">Trimestre</option>
                  <option value="mes">Mês</option>
                </select>
              </label>
              {periodType === 'semestre' && (
                <label>
                  Semestre
                  <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                    <option value="all">Todos</option>
                    <option value="1">1º Semestre</option>
                    <option value="2">2º Semestre</option>
                  </select>
                </label>
              )}
              {periodType === 'trimestre' && (
                <label>
                  Trimestre
                  <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
                    <option value="all">Todos</option>
                    <option value="1">1º Trimestre</option>
                    <option value="2">2º Trimestre</option>
                    <option value="3">3º Trimestre</option>
                    <option value="4">4º Trimestre</option>
                  </select>
                </label>
              )}
              {periodType === 'mes' && (
                <label>
                  Mês
                  <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="all">Todos</option>
                    {monthNames.map((name, i) => (
                      <option key={i} value={i + 1}>{name}</option>
                    ))}
                  </select>
                </label>
              )}
            </div>
          </details>

          <div id="totalPeriodo">Total no Período: R$ {total.toFixed(2).replace('.', ',')}</div>

          <Bar data={chartData} options={chartOptions} height={200} />

          <details>
            <summary>Todos os Pagamentos</summary>
            <table id="tabelaPagamentos">
              <thead>
                <tr><th>Data</th><th>Tributo</th><th>Valor</th></tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i}>
                    <td>{new Date(p.date).toLocaleDateString('pt-BR')}</td>
                    <td>{p.tributo}</td>
                    <td>R$ {p.valor.toFixed(2).replace('.', ',')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Total</td>
                  <td>R$ {total.toFixed(2).replace('.', ',')}</td>
                </tr>
              </tfoot>
            </table>
          </details>
        </div>
      </div>
    </section>
  );
}

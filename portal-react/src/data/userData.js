export const userData = {
  name: 'Ana Clara Silva',
  firstName: 'Ana Clara',
  cpf: '123.456.789-00',
  email: 'ana.clara.silva@email.com',
  dddTelefone: '65',
  numeroTelefone: '36131000',
  dddCelular: '65',
  numeroCelular: '998765432',
  lastAccess: '16/04/2025 às 15:05',
};

export const notifications = [
  {
    id: 1,
    icon: 'sync',
    iconClass: 'info',
    title: 'Processo Atualizado',
    message: 'PROT20250410001 teve novo andamento.',
    timestamp: '16/04/2025 10:15',
    link: '#processes',
  },
  {
    id: 2,
    icon: 'check_circle',
    iconClass: 'success',
    title: 'Processo Concluído',
    message: 'PROT20241105010 foi finalizado.',
    timestamp: '15/04/2025 14:30',
    link: '#processes',
  },
  {
    id: 3,
    icon: 'emoji_events',
    iconClass: 'attention',
    title: 'Nota MT',
    message: 'Parabéns, você foi premiado!',
    timestamp: '15/04/2025 09:00',
    link: '#nota-mt',
  },
];

export const recentAtendimentos = [
  {
    id: 1,
    protocol: 'PROT20250410001',
    subject: 'Solicitação Isenção IPVA',
    status: 'Em Análise',
    updated: '16/04/2025',
    link: '#atendimento-1',
  },
  {
    id: 2,
    protocol: 'PROT20250315023',
    subject: 'Consulta GIA ITCD',
    status: 'Concluído',
    updated: '18/03/2025',
    link: '#atendimento-2',
  },
];

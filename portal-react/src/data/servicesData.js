export const quickAccessItems = [
  { id: 'ipva', icon: 'directions_car', label: 'IPVA', submenuId: 'ipva-submenu' },
  { id: 'itcd', icon: 'account_balance', label: 'ITCD', submenuId: 'itcd-submenu' },
  { id: 'notamt', icon: 'redeem', label: 'Nota MT', submenuId: 'notamt-submenu' },
  { id: 'nfae', icon: 'description', label: 'NFA-e', submenuId: 'nfae-submenu' },
  { id: 'tads', icon: 'receipt_long', label: 'TADs', submenuId: 'tads-submenu' },
  { id: 'certificates', icon: 'verified_user', label: 'Certidões', submenuId: 'certificates-submenu' },
];

export const subMenus = {
  'ipva-submenu': {
    title: 'Opções de IPVA',
    items: [
      { label: 'Emitir Guia (Ano Corrente)', link: '#ipva-guia' },
      { label: 'Extrato Completo IPVA', link: '#ipva-extrato' },
      { label: 'Consultar Vencimentos', link: '#ipva-vencimentos' },
      { label: 'Usar Pontos Nota MT', link: '#ipva-resgate-notamt' },
      { label: 'Parcelar Débitos Vencidos', link: '#ipva-parcelamento-vencido' },
      { label: 'Consultar/Alterar Parcelamento', link: '#ipva-alterar-parcelamento' },
      { label: 'Solicitar Isenção IPVA', link: '#ipva-isencao' },
      { label: 'Solicitar Compensação', link: '#ipva-compensacao' },
      { label: 'Débitos em Dívida Ativa', link: '#ipva-divida-ativa' },
      { label: 'Isenção ICMS (Veículo Novo)', link: '#ipva-icms-isencao-veiculo' },
    ],
  },
  'itcd-submenu': {
    title: 'Opções de ITCD',
    items: [
      { label: 'Orientações Gerais / GIA', link: '#itcd-orientacoes' },
      { label: 'Incluir Nova GIA-ITCD', link: '#itcd-incluir-gia' },
      { label: 'Consultar/Alterar GIA', link: '#itcd-consultar-gia' },
      { label: 'Emitir DAR / Solicitar Isenção', link: '#itcd-emitir-dar' },
      { label: 'Solicitar Parcelamento ITCD', link: '#itcd-parcelamento' },
      { label: 'Emitir DAR (Parcelamento)', link: '#itcd-emitir-dar-parc' },
      { label: 'Consultar Processo ITCD', link: '#itcd-consultar-processo' },
      { label: 'Contestar Lançamento', link: '#itcd-contestar' },
      { label: 'Reativar GIA', link: '#itcd-reativar-gia' },
      { label: 'Inativar/Substituir GIA', link: '#itcd-inativar-gia' },
    ],
  },
  'notamt-submenu': {
    title: 'Programa Nota MT',
    items: [
      { label: 'Conheça o Programa', link: '#notamt-programa' },
      { label: 'Meu Cadastro Nota MT', link: '#notamt-cadastro' },
      { label: 'Minhas Compras (Extrato)', link: '#minhas-compras-notamt' },
      { label: 'Meus Pontos e Resgates', link: '#notamt-pontos' },
      { label: 'Sorteios e Prêmios', link: '#notamt-sorteios' },
      { label: 'Desconto IPVA', link: '#notamt-desconto-ipva' },
      { label: 'Portal Oficial Nota MT', link: 'https://www.sefaz.mt.gov.br/notamt/inicio', external: true },
    ],
  },
  'nfae-submenu': {
    title: 'Nota Fiscal Avulsa Eletrônica (NFA-e)',
    items: [
      { label: 'Emitir Nova NFA-e', link: '#nfae-emitir' },
      { label: 'Consultar NFA-e Emitidas', link: '#nfae-minhas-emitidas' },
      { label: 'Cancelar NFA-e', link: '#nfae-cancelar' },
      { label: 'Orientações NFA-e', link: '#nfae-orientacoes' },
      { label: 'Validar Autenticidade (Terceiros)', link: '#nfae-validar' },
    ],
  },
  'tads-submenu': {
    title: 'Opções de TAD',
    items: [
      { label: 'Consultar Meus TADs', link: '#tads-module' },
      { label: 'Pagar TAD', link: '#tad-pagamento' },
      { label: 'Impugnar TAD (Via e-Process)', link: '#tad-impugnacao' },
      { label: 'Orientações Contestação', link: '#tad-orientacoes-contestacao' },
      { label: 'Orientações Fiel Depositário', link: '#tad-fiel-depositario' },
      { label: 'Consulta TAD Correios', link: '#tad-consulta-correios' },
    ],
  },
  'certificates-submenu': {
    title: 'Certidões',
    items: [
      { label: 'Emitir Certidão Negativa (CND)', link: '#certidao-emitir' },
      { label: 'Emitir Certidão Positiva (com Efeitos de Negativa)', link: '#certidao-positiva' },
      { label: 'Relatório de Pendências / Irregularidades', link: '#certidao-irregularidades' },
      { label: 'Consultar Minhas Certidões', link: '#certidao-minhas' },
      { label: 'Validar Autenticidade', link: '#certidao-validar' },
    ],
  },
};

export const recentAccessData = [
  { id: 1, icon: 'receipt', title: 'Emitiu Guia IPVA', timestamp: '10/03/2025 14:30' },
  { id: 2, icon: 'shopping_basket', title: 'Consultou Compras', timestamp: '05/03/2025 11:05' },
  { id: 3, icon: 'assignment', title: 'Verificou Processo', timestamp: '11/04/2025 08:55' },
  { id: 4, icon: 'verified_user', title: 'Emitiu Certidão', timestamp: '01/02/2025 16:12' },
  { id: 5, icon: 'description', title: 'Consultou NFA-e', timestamp: '20/01/2025 10:00' },
  { id: 6, icon: 'business', title: 'Consultou Empresas', timestamp: '15/01/2025 09:00' },
  { id: 7, icon: 'receipt_long', title: 'Consultou TAD', timestamp: '12/01/2025 17:05' },
  { id: 8, icon: 'request_quote', title: 'Consultou Parcelamentos', timestamp: '10/01/2025 11:30' },
];

export const secondaryNavLinks = [
  { label: 'AUTO ATENDIMENTO e-PAC', link: '#' },
  { label: 'PORTAL DA SEFAZ', link: 'https://www5.sefaz.mt.gov.br/', external: true },
  { label: 'PORTAL DA LEGISLAÇÃO', link: 'http://app1.sefaz.mt.gov.br/0325677500623408/Legislacao/legislacao/indice.htm', external: true },
  { label: 'PORTAL DO CONHECIMENTO', link: 'https://www.portaldoconhecimento.mt.gov.br/inicio', external: true },
  { label: 'FÓRUM', link: '#' },
];

export const footerColumns = [
  {
    title: 'Serviços',
    links: [
      { label: 'Portal de Serviços', link: '#servicos-todos' },
      { label: 'MT Cidadão', link: 'https://www.mtcidadao.mt.gov.br/', external: true },
      { label: 'Autoatendimento e-PAC', link: '#autoatendimento-epac' },
    ],
  },
  {
    title: 'Contatos',
    links: [
      { label: 'Lista de Telefones', link: '#lista-telefones' },
      { label: 'Ouvidoria (Fala.BR)', link: 'https://falabr.cgu.gov.br/', external: true },
      { label: 'Fale Conosco', link: '#fale-conosco' },
    ],
  },
  {
    title: 'Comunicação',
    links: [
      { label: 'Notícias', link: 'https://www.sefaz.mt.gov.br/portal/comunicacao/noticias/', external: true },
      { label: 'Rádio Paiaguás', link: 'https://www.mt.gov.br/radio-paiaguas', external: true },
      { label: 'TV Paiaguás', link: '#', external: true },
      { label: 'Fotos', link: 'https://www.flickr.com/photos/governodematogrosso/', external: true },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Portal da SEFAZ', link: 'https://www5.sefaz.mt.gov.br/', external: true },
      { label: 'Secretarias do Governo', link: 'https://www.mt.gov.br/-/-secretarias-do-governo', external: true },
      { label: 'Mapa do Site', link: '#mapa-site' },
    ],
  },
  {
    title: 'Transparência',
    links: [
      { label: 'Portal da Transparência', link: 'http://www.transparencia.mt.gov.br/', external: true },
      { label: 'Acesso à Informação (SIC)', link: 'http://www.transparencia.mt.gov.br/acesso-a-informacao/servico-de-informacao-ao-cidadao-sic-presencial/', external: true },
    ],
  },
];

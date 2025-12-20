
import { Fan, FanStatus, RiskLevel, Campaign, Transaction, Connector } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-05-15', type: 'Ingresso', amount: 60.00, description: 'Ingresso Social - América x Cruzeiro (Independência)' },
  { id: 't2', date: '2024-05-10', type: 'Loja', amount: 289.90, description: 'Camisa Volt Oficial I 2024 - América' },
  { id: 't3', date: '2024-05-01', type: 'Mensalidade', amount: 119.90, description: 'Mensalidade Sócio Coelhão Black' },
  { id: 't4', date: '2024-04-28', type: 'Ingresso', amount: 40.00, description: 'Arq. Independência - América x Botafogo' },
];

export const MOCK_FANS: Fan[] = [
  {
    id: '1',
    name: 'Bernardo Coelho',
    email: 'bernardo.coelho@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    status: FanStatus.ACTIVE,
    segment: 'Coelhão Black',
    ltv: 2150.00,
    engagementScore: 92,
    churnRisk: RiskLevel.LOW,
    lastInteraction: '1 dia atrás',
    transactions: [MOCK_TRANSACTIONS[1], MOCK_TRANSACTIONS[2]],
    interests: ['Camisas Volt', 'Jogos no Horto', 'Tour Independência']
  },
  {
    id: '2',
    name: 'Ana Green',
    email: 'ana.green@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    status: FanStatus.CHURN_RISK,
    segment: 'Onda Verde',
    ltv: 380.00,
    engagementScore: 35,
    churnRisk: RiskLevel.HIGH,
    lastInteraction: '50 dias atrás',
    transactions: [],
    interests: ['Coelhão TV', 'Descontos Loja']
  },
  {
    id: '3',
    name: 'Marcus Decacampeão',
    email: 'marcus.10@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    status: FanStatus.ACTIVE,
    segment: 'Americano',
    ltv: 720.00,
    engagementScore: 85,
    churnRisk: RiskLevel.LOW,
    lastInteraction: '3 dias atrás',
    transactions: [MOCK_TRANSACTIONS[0]],
    interests: ['Ações de Ingressos', 'Sócio Estádio']
  },
  {
    id: '4',
    name: 'Leticia América',
    email: 'leticia.afc@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    status: FanStatus.ACTIVE,
    segment: 'Onda Verde',
    ltv: 1200.00,
    engagementScore: 72,
    churnRisk: RiskLevel.MEDIUM,
    lastInteraction: '12 dias atrás',
    transactions: [MOCK_TRANSACTIONS[3]],
    interests: ['Membros Família', 'Sócio Horto']
  }
];

export const CHURN_REASONS_DATA = [
  { name: 'Financeiro', value: 30, color: '#008037' },
  { name: 'Falta de Jogos no Horto', value: 25, color: '#0a2a1a' },
  { name: 'Benefícios', value: 20, color: '#4B5563' },
  { name: 'Time', value: 20, color: '#9CA3AF' },
  { name: 'Outros', value: 5, color: '#D1D5DB' },
];

export const DASHBOARD_STATS_DATA = [
  { name: 'Jan', revenue: 32000, churn: 1800, forecast: 32000 },
  { name: 'Fev', revenue: 29000, churn: 1200, forecast: 29000 },
  { name: 'Mar', revenue: 27000, churn: 3100, forecast: 27000 },
  { name: 'Abr', revenue: 38000, churn: 2200, forecast: 38000 },
  { name: 'Mai', revenue: 42000, churn: 1500, forecast: 42000 },
  { name: 'Jun', revenue: 46000, churn: 1400, forecast: 46000 },
  { name: 'Jul', revenue: 51200, churn: 1300, forecast: 51200 },
  { name: 'Ago*', revenue: null, churn: null, forecast: 58000 },
  { name: 'Set*', revenue: null, churn: null, forecast: 64500 },
];

export const PRODUCT_SALES_DISTRIBUTION = [
  { name: 'Uniformes Volt', value: 50, color: '#0a2a1a' },
  { name: 'Ingressos (Horto)', value: 25, color: '#008037' },
  { name: 'Acessórios', value: 15, color: '#9CA3AF' },
  { name: 'Experiências', value: 10, color: '#4B5563' },
];

export const APP_USAGE_STATS = [
  { feature: 'Carteirinha Digital', users: 8200 },
  { feature: 'Check-in Horto', users: 6400 },
  { feature: 'Coelhão TV', users: 4500 },
  { feature: 'Loja América', users: 3200 },
  { feature: 'Interatividade', users: 1100 },
];

export const DEMOGRAPHICS_DATA = {
  gender: [
    { name: 'Masculino', value: 65, color: '#0a2a1a' },
    { name: 'Feminino', value: 35, color: '#008037' },
  ],
  age: [
    { name: '0-17', value: 18, label: 'Kids/Teens' },
    { name: '18-29', value: 30, label: 'Jovens Adultos' },
    { name: '30-49', value: 32, label: 'Adultos' },
    { name: '50-64', value: 12, label: 'Sênior' },
    { name: '65+', value: 8, label: 'Idosos' },
  ],
  location: [
    { name: 'BH (Capital)', value: 65 },
    { name: 'Grande BH', value: 25 },
    { name: 'Interior MG', value: 7 },
    { name: 'Fora de MG', value: 3 },
  ],
  pcd: [
    { name: 'Não PCD', value: 98, color: '#E5E7EB' },
    { name: 'PCD', value: 2, color: '#008037' },
  ]
};

export const LTV_BY_SEGMENT_DATA = [
  { name: 'Coelhão Black', ltv: 2200, description: 'Premium' },
  { name: 'Americano', ltv: 1200, description: 'Intermediário' },
  { name: 'Onda Verde', ltv: 750, description: 'Básico' },
  { name: 'Coelhinho', ltv: 280, description: 'Kids' },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: 'Horto Lotado',
    description: 'Prioridade total para o clássico contra o Cruzeiro.',
    targetSegment: 'Coelhão Black',
    conversionRate: 21.2,
    status: 'Active'
  },
  {
    id: 'c2',
    title: 'Manto Verde',
    description: 'Desconto de 20% na nova coleção Volt para sócios.',
    targetSegment: 'Onda Verde',
    conversionRate: 11.5,
    status: 'Active'
  },
  {
    id: 'c3',
    title: 'Renovação Coelhão',
    description: 'Campanha de retenção para planos anuais.',
    targetSegment: 'Americano',
    conversionRate: 28.0,
    status: 'Completed'
  }
];

export const MOCK_CONNECTORS: Connector[] = [
  {
    id: 'conn1',
    name: 'Onda Verde (Base)',
    description: 'Importação da base legado de sócios.',
    category: 'Arquivo',
    icon: 'FileSpreadsheet',
    status: 'Disconnected'
  },
  {
    id: 'conn2',
    name: 'CRM Mineiro',
    description: 'Gestão de relacionamento local.',
    category: 'CRM',
    icon: 'Database',
    status: 'Connected',
    lastSync: '15 min atrás'
  },
  {
    id: 'conn3',
    name: 'Ticket Master / Horto',
    description: 'Integração de check-in Independência.',
    category: 'Bilheteria',
    icon: 'Ticket',
    status: 'Connected',
    lastSync: '1 hora atrás'
  },
  {
    id: 'conn4',
    name: 'Loja do América (Shop)',
    description: 'Dados de vendas oficiais.',
    category: 'Loja',
    icon: 'ShoppingBag',
    status: 'Connected',
    lastSync: '8 min atrás'
  }
];

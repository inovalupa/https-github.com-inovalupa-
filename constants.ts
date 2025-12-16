
import { Fan, FanStatus, RiskLevel, Campaign, Transaction, Connector } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-05-15', type: 'Ingresso', amount: 80.00, description: 'Ingresso Social - Vasco x Flamengo (Maracanã)' },
  { id: 't2', date: '2024-05-10', type: 'Loja', amount: 349.90, description: 'Camisa Kappa Oficial I 2024 - Payet #10' },
  { id: 't3', date: '2024-05-01', type: 'Mensalidade', amount: 129.90, description: 'Mensalidade Sócio Gigante Black' },
  { id: 't4', date: '2024-04-28', type: 'Ingresso', amount: 60.00, description: 'Arq. São Januário - Vasco x Vitória' },
];

export const MOCK_FANS: Fan[] = [
  {
    id: '1',
    name: 'João da Colina',
    email: 'joao.vasco@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    status: FanStatus.ACTIVE,
    segment: 'Gigante Black',
    ltv: 2450.00,
    engagementScore: 95,
    churnRisk: RiskLevel.LOW,
    lastInteraction: '2 dias atrás',
    transactions: [MOCK_TRANSACTIONS[1], MOCK_TRANSACTIONS[2], MOCK_TRANSACTIONS[3]],
    interests: ['Camisas Oficiais', 'Jogos em São Januário', 'Meet & Greet']
  },
  {
    id: '2',
    name: 'Maria Cruz',
    email: 'maria.cruz@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    status: FanStatus.CHURN_RISK,
    segment: 'Norte a Sul',
    ltv: 450.00,
    engagementScore: 42,
    churnRisk: RiskLevel.HIGH,
    lastInteraction: '45 dias atrás',
    transactions: [],
    interests: ['Vasco TV', 'Descontos Loja Online']
  },
  {
    id: '3',
    name: 'Roberto Dinamite Neto',
    email: 'beto.dina@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    status: FanStatus.ACTIVE,
    segment: 'Camisas Negras',
    ltv: 890.00,
    engagementScore: 88,
    churnRisk: RiskLevel.LOW,
    lastInteraction: '1 dia atrás',
    transactions: [MOCK_TRANSACTIONS[0]],
    interests: ['Ingresso Social', 'Ações Históricas']
  },
  {
    id: '4',
    name: 'Juliana Gama',
    email: 'ju.gama@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    status: FanStatus.ACTIVE,
    segment: 'Gigante Ouro',
    ltv: 1400.00,
    engagementScore: 78,
    churnRisk: RiskLevel.MEDIUM,
    lastInteraction: '10 dias atrás',
    transactions: [MOCK_TRANSACTIONS[3]],
    interests: ['Setor Social', 'Renovação']
  }
];

export const CHURN_REASONS_DATA = [
  { name: 'Financeiro', value: 35, color: '#FF6B00' },
  { name: 'Distância/Acesso', value: 25, color: '#0B1E3B' },
  { name: 'Falta de Benefícios', value: 20, color: '#4B5563' },
  { name: 'Insatisfação com Time', value: 15, color: '#9CA3AF' },
  { name: 'Outros', value: 5, color: '#D1D5DB' },
];

export const DASHBOARD_STATS_DATA = [
  { name: 'Jan', revenue: 42000, churn: 2100, forecast: 42000 },
  { name: 'Fev', revenue: 38000, churn: 1500, forecast: 38000 },
  { name: 'Mar', revenue: 35000, churn: 4200, forecast: 35000 },
  { name: 'Abr', revenue: 45000, churn: 2800, forecast: 45000 },
  { name: 'Mai', revenue: 52000, churn: 2100, forecast: 52000 },
  { name: 'Jun', revenue: 58000, churn: 1900, forecast: 58000 },
  { name: 'Jul', revenue: 64900, churn: 1800, forecast: 64900 },
  { name: 'Ago*', revenue: null, churn: null, forecast: 71000 },
  { name: 'Set*', revenue: null, churn: null, forecast: 78500 },
];

export const PRODUCT_SALES_DISTRIBUTION = [
  { name: 'Camisas Kappa', value: 45, color: '#0B1E3B' },
  { name: 'Ingressos (SJ)', value: 30, color: '#FF6B00' },
  { name: 'Licenciados', value: 15, color: '#9CA3AF' },
  { name: 'Experiências', value: 10, color: '#4B5563' },
];

export const APP_USAGE_STATS = [
  { feature: 'Carteirinha Digital', users: 15200 },
  { feature: 'Check-in Expresso', users: 12400 },
  { feature: 'Notícias/VascoTV', users: 8500 },
  { feature: 'Loja In-App', users: 6200 },
  { feature: 'Quiz Histórico', users: 3100 },
];

export const DEMOGRAPHICS_DATA = {
  gender: [
    { name: 'Masculino', value: 62, color: '#0B1E3B' },
    { name: 'Feminino', value: 38, color: '#FF6B00' },
  ],
  age: [
    { name: '0-17', value: 15, label: 'Kids/Teens' },
    { name: '18-29', value: 28, label: 'Jovens Adultos' },
    { name: '30-49', value: 35, label: 'Adultos' },
    { name: '50-64', value: 15, label: 'Sênior' },
    { name: '65+', value: 7, label: 'Idosos' },
  ],
  location: [
    { name: 'Rio (Capital)', value: 55 },
    { name: 'Grande Rio', value: 20 },
    { name: 'Interior RJ', value: 10 },
    { name: 'Outros Estados (Off-Rio)', value: 15 },
  ],
  pcd: [
    { name: 'Não PCD', value: 97.5, color: '#E5E7EB' },
    { name: 'PCD', value: 2.5, color: '#FF6B00' },
  ]
};

export const LTV_BY_SEGMENT_DATA = [
  { name: 'Gigante Black', ltv: 2850, description: 'Premium' },
  { name: 'Gigante Ouro', ltv: 1600, description: 'Intermediário' },
  { name: 'Norte a Sul', ltv: 850, description: 'Off-Rio' },
  { name: 'Camisas Negras', ltv: 500, description: 'Entrada/Social' },
  { name: 'Almirantinho', ltv: 320, description: 'Kids' },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: 'Caldeirão Lotado',
    description: 'Prioridade para compra de ingressos contra o Flamengo.',
    targetSegment: 'Gigante Ouro',
    conversionRate: 18.5,
    status: 'Active'
  },
  {
    id: 'c2',
    title: 'Resgate Off-Rio',
    description: 'Cupom de 20% na Vasco Store para sócios de fora do RJ.',
    targetSegment: 'Norte a Sul',
    conversionRate: 9.2,
    status: 'Active'
  },
  {
    id: 'c3',
    title: 'Lançamento Kappa III',
    description: 'Pré-venda exclusiva da nova camisa preta.',
    targetSegment: 'Gigante Black',
    conversionRate: 32.0,
    status: 'Completed'
  }
];

export const MOCK_CONNECTORS: Connector[] = [
  {
    id: 'conn1',
    name: 'Sócio Gigante (Base)',
    description: 'Importação da base legado de sócios.',
    category: 'Arquivo',
    icon: 'FileSpreadsheet',
    status: 'Disconnected'
  },
  {
    id: 'conn2',
    name: 'Salesforce CRM',
    description: 'Gestão de relacionamento e leads.',
    category: 'CRM',
    icon: 'Database',
    status: 'Connected',
    lastSync: '10 min atrás'
  },
  {
    id: 'conn3',
    name: 'Socios.com / Bilheteria',
    description: 'Integração de check-in e venda de ingressos.',
    category: 'Bilheteria',
    icon: 'Ticket',
    status: 'Connected',
    lastSync: '1 hora atrás'
  },
  {
    id: 'conn4',
    name: 'Vasco Store (VTEX)',
    description: 'Dados de vendas da loja oficial.',
    category: 'Loja',
    icon: 'ShoppingBag',
    status: 'Connected',
    lastSync: '5 min atrás'
  }
];

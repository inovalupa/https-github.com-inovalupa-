export enum RiskLevel {
  LOW = 'Baixo',
  MEDIUM = 'Médio',
  HIGH = 'Alto'
}

export enum FanStatus {
  ACTIVE = 'Ativo',
  INACTIVE = 'Inativo',
  CHURN_RISK = 'Risco de Churn'
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Ingresso' | 'Loja' | 'Mensalidade';
  amount: number;
  description: string;
}

export interface Fan {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: FanStatus;
  segment: string;
  ltv: number; // Lifetime Value
  engagementScore: number; // 0-100
  churnRisk: RiskLevel;
  lastInteraction: string;
  transactions: Transaction[];
  interests: string[];
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  targetSegment: string;
  conversionRate: number;
  status: 'Active' | 'Draft' | 'Completed';
}

export interface DashboardStats {
  totalRevenue: number;
  activeMembers: number;
  churnRate: number;
  engagementAvg: number;
}

export type ConnectorCategory = 'Bilheteria' | 'CRM' | 'Loja' | 'Social' | 'Arquivo' | 'Pagamentos';

export interface Connector {
  id: string;
  name: string;
  description: string;
  category: ConnectorCategory;
  icon: string; // Lucide icon name or image url
  status: 'Connected' | 'Disconnected' | 'Error';
  lastSync?: string;
}
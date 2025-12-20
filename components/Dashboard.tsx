
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { DASHBOARD_STATS_DATA, PRODUCT_SALES_DISTRIBUTION, APP_USAGE_STATS, CHURN_REASONS_DATA } from '../constants';
import { Users, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Smartphone, Sparkles, BrainCircuit } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Receita Mensal</p>
              <h3 className="text-2xl font-bold text-brand-blue">R$ 51.200</h3>
              <p className="text-xs text-green-500 flex items-center mt-1 font-semibold">
                <TrendingUp size={14} className="mr-1" /> +8% vs Junho
              </p>
            </div>
            <div className="bg-brand-orange p-3 rounded-lg text-white shadow-lg shadow-brand-orange/20">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Sócios Ativos</p>
              <h3 className="text-2xl font-bold text-brand-blue">8.950</h3>
              <p className="text-xs text-green-500 flex items-center mt-1 font-semibold">
                <TrendingUp size={14} className="mr-1" /> +3% novas adesões
              </p>
            </div>
            <div className="bg-brand-orange p-3 rounded-lg text-white shadow-lg shadow-brand-orange/20">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Taxa de Churn</p>
              <h3 className="text-2xl font-bold text-brand-blue">1.8%</h3>
              <p className="text-xs text-green-500 flex items-center mt-1 font-semibold">
                <TrendingDown size={14} className="mr-1" /> Estável
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-gray-500">
              <TrendingDown size={24} />
            </div>
          </div>
        </div>

        <div className="bg-[#0a2a1a] p-6 rounded-xl shadow-lg border border-gray-800 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="absolute top-0 right-0 p-2 opacity-20"><Sparkles size={40} className="text-brand-orange" /></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-blue-200 mb-1 font-medium">Health Score (IA)</p>
              <h3 className="text-2xl font-bold text-white">85/100</h3>
              <p className="text-xs text-brand-orange mt-1 font-medium">
                Alta Fidelidade
              </p>
            </div>
            <div className="bg-brand-orange p-3 rounded-lg text-white">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-brand-blue">Projeção Coelhão Preditiva</h3>
            <span className="text-[10px] uppercase font-bold bg-brand-orange/10 text-brand-orange px-2 py-1 rounded">America Data Analytics</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DASHBOARD_STATS_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008037" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#008037" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Area type="monotone" dataKey="revenue" stroke="#008037" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="forecast" stroke="#0a2a1a" strokeDasharray="5 5" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 italic text-center">*Projeção baseada em histórico Independência.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit size={20} className="text-brand-orange" />
            <h3 className="text-lg font-bold text-brand-blue">Insights de Evasão (IA)</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CHURN_REASONS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CHURN_REASONS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

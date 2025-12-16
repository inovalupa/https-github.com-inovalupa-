
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DASHBOARD_STATS_DATA, PRODUCT_SALES_DISTRIBUTION, APP_USAGE_STATS } from '../constants';
import { Users, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Smartphone } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-blue/5 rounded-bl-full transition-all group-hover:bg-brand-blue/10"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Receita Mensal</p>
              <h3 className="text-2xl font-bold text-brand-blue">R$ 34.900</h3>
              <p className="text-xs text-green-500 flex items-center mt-1 font-semibold">
                <TrendingUp size={14} className="mr-1" /> +12% vs mês anterior
              </p>
            </div>
            <div className="bg-brand-blue p-3 rounded-lg text-white shadow-lg shadow-brand-blue/20">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 rounded-bl-full transition-all group-hover:bg-brand-orange/10"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Sócios Ativos</p>
              <h3 className="text-2xl font-bold text-brand-blue">12.450</h3>
              <p className="text-xs text-green-500 flex items-center mt-1 font-semibold">
                <TrendingUp size={14} className="mr-1" /> +5% novos adesões
              </p>
            </div>
            <div className="bg-brand-orange p-3 rounded-lg text-white shadow-lg shadow-brand-orange/20">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Taxa de Churn</p>
              <h3 className="text-2xl font-bold text-brand-blue">2.4%</h3>
              <p className="text-xs text-red-500 flex items-center mt-1 font-semibold">
                <TrendingDown size={14} className="mr-1" /> Alerta: +0.4%
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-red-500">
              <TrendingDown size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Engajamento Médio</p>
              <h3 className="text-2xl font-bold text-brand-blue">78/100</h3>
              <p className="text-xs text-gray-400 mt-1">
                Baseado em interações recentes
              </p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg text-brand-blue">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Financial & Risk Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brand-blue mb-4">Evolução de Receita</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DASHBOARD_STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#F3F4F6'}}
                />
                <Bar dataKey="revenue" fill="#0B1E3B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Churn Risk Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brand-blue mb-4">Risco de Cancelamento (Churn)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DASHBOARD_STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="churn" 
                  stroke="#FF6B00" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#FF6B00', strokeWidth: 0 }} 
                  activeDot={{ r: 8, fill: '#FF6B00', stroke: '#fff', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* New Section: Product & App Analysis */}
      <h3 className="text-xl font-bold text-brand-blue mt-8 pt-4 border-t border-gray-200">
        Comportamento de Consumo e Digital
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Sales Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-blue-50 rounded-lg text-brand-blue">
                <ShoppingBag size={20} />
             </div>
             <h3 className="text-lg font-bold text-brand-blue">Venda de Produtos (Share)</h3>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PRODUCT_SALES_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PRODUCT_SALES_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Participação']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="middle" 
                  align="right" 
                  layout="vertical"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* App Usage Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-orange-50 rounded-lg text-brand-orange">
                <Smartphone size={20} />
             </div>
             <h3 className="text-lg font-bold text-brand-blue">Uso do App Oficial</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={APP_USAGE_STATS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="feature" 
                  type="category" 
                  width={100}
                  tick={{fill: '#4B5563', fontSize: 11, fontWeight: 500}} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  formatter={(value: number) => [value, 'Usuários Únicos']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={20} fill="#0B1E3B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

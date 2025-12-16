
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { DASHBOARD_STATS_DATA, PRODUCT_SALES_DISTRIBUTION, APP_USAGE_STATS } from '../constants';
import { Users, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Smartphone, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-blue/5 rounded-bl-full transition-all group-hover:bg-brand-blue/10"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Receita Mensal</p>
              <h3 className="text-2xl font-bold text-brand-blue">R$ 64.900</h3>
              <p className="text-xs text-green-500 flex items-center mt-1 font-semibold">
                <TrendingUp size={14} className="mr-1" /> +12% vs mês anterior
              </p>
            </div>
            <div className="bg-brand-blue p-3 rounded-lg text-white shadow-lg shadow-brand-blue/20">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 rounded-bl-full transition-all group-hover:bg-brand-orange/10"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-gray-500 mb-1 font-medium">Sócios Ativos</p>
              <h3 className="text-2xl font-bold text-brand-blue">12.450</h3>
              <p className="text-xs text-green-500 flex items-center mt-1 font-semibold">
                <TrendingUp size={14} className="mr-1" /> +5% novas adesões
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

        <div className="bg-brand-dark p-6 rounded-xl shadow-lg border border-gray-800 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="absolute top-0 right-0 p-2 opacity-20"><Sparkles size={40} className="text-brand-orange" /></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-blue-200 mb-1 font-medium">Health Score (IA)</p>
              <h3 className="text-2xl font-bold text-white">82/100</h3>
              <p className="text-xs text-brand-orange mt-1 font-medium">
                Tendência de Alta
              </p>
            </div>
            <div className="bg-brand-orange p-3 rounded-lg text-white">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-brand-blue">Projeção de Receita (IA)</h3>
            <span className="text-[10px] uppercase font-bold bg-brand-orange/10 text-brand-orange px-2 py-1 rounded">Vasco Data Analytics</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DASHBOARD_STATS_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B1E3B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0B1E3B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#0B1E3B" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="forecast" stroke="#FF6B00" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 italic text-center">*Dados de Ago/Set baseados em sazonalidade histórica e IA.</p>
        </div>

        {/* Churn Risk Evolution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brand-blue mb-4">Evolução do Risco de Churn</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DASHBOARD_STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Line 
                  type="monotone" 
                  dataKey="churn" 
                  stroke="#FF6B00" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#FF6B00', strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Behavioral Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
             <div className="p-2 bg-blue-50 rounded-lg text-brand-blue"><ShoppingBag size={20} /></div>
             <h3 className="text-lg font-bold text-brand-blue">Participação por Produto</h3>
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
                <Tooltip formatter={(value: number) => [`${value}%`, 'Participação']} />
                <Legend verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
             <div className="p-2 bg-orange-50 rounded-lg text-brand-orange"><Smartphone size={20} /></div>
             <h3 className="text-lg font-bold text-brand-blue">Engajamento App Oficial</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={APP_USAGE_STATS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="feature" type="category" width={120} tick={{fill: '#4B5563', fontSize: 11}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#F9FAFB'}} />
                <Bar dataKey="users" radius={[0, 4, 4, 0]} fill="#0B1E3B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

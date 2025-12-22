
import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { DEMOGRAPHICS_DATA } from '../constants';
import { MapPin, User, Accessibility, Users, Info } from 'lucide-react';

const Demographics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-50 text-brand-blue rounded-lg">
              <Users size={20} />
            </div>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">+4% vs 2023</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Idade Média</p>
            <h3 className="text-2xl font-bold text-gray-900">34 Anos</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-orange-50 text-brand-orange rounded-lg">
              <User size={20} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Público Feminino</p>
            <h3 className="text-2xl font-bold text-gray-900">38%</h3>
            <p className="text-xs text-gray-400">Potencial de crescimento</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <MapPin size={20} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fora de BH (Off-BH)</p>
            <h3 className="text-2xl font-bold text-gray-900">15%</h3>
            <p className="text-xs text-gray-400">Plano Norte a Sul</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Accessibility size={20} />
            </div>
            <Info size={16} className="text-gray-300" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Sócios PCD</p>
            <h3 className="text-2xl font-bold text-gray-900">312</h3>
            <p className="text-xs text-gray-400">Isenção/Desconto Aplicado</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brand-blue mb-1">Gênero</h3>
          <p className="text-sm text-gray-500 mb-6">Distribuição da base ativa.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEMOGRAPHICS_DATA.gender}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEMOGRAPHICS_DATA.gender.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                   formatter={(value: number) => [`${value}%`, 'Porcentagem']}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brand-blue mb-1">Faixa Etária</h3>
          <p className="text-sm text-gray-500 mb-6">Renovação da torcida (0-17) e poder de consumo (30-49).</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEMOGRAPHICS_DATA.age} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'da Base']}
                />
                <Bar dataKey="value" fill="#0B1E3B" radius={[4, 4, 0, 0]} barSize={40}>
                    {DEMOGRAPHICS_DATA.age.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#FF6B00' : '#0B1E3B'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location / Geography */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
             <div>
                <h3 className="text-lg font-bold text-brand-blue mb-1">Localização da Residência</h3>
                <p className="text-sm text-gray-500">Concentração geográfica dos sócios.</p>
             </div>
             <div className="p-2 bg-gray-100 rounded-full text-gray-500">
                <MapPin size={20} />
             </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEMOGRAPHICS_DATA.location} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={110}
                  tick={{fill: '#4B5563', fontSize: 11, fontWeight: 500}} 
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip 
                  cursor={{fill: '#F9FAFB'}}
                  formatter={(value: number) => [`${value}%`, 'Participação']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} fill="#0B1E3B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PCD Inclusion Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full"></div>
          
          <h3 className="text-lg font-bold text-brand-blue mb-1">Inclusão (PCD)</h3>
          <p className="text-sm text-gray-500 mb-6">Monitoramento de acessibilidade e gratuidades.</p>
          
          <div className="flex items-center gap-8">
            <div className="h-48 w-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={DEMOGRAPHICS_DATA.pcd}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    >
                    {DEMOGRAPHICS_DATA.pcd.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Accessibility className="text-brand-orange" size={24} />
                </div>
            </div>
            
            <div className="flex-1 space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-brand-orange">
                    <p className="text-xs text-gray-500 font-semibold uppercase">Total PCD</p>
                    <p className="text-xl font-bold text-gray-900">2.5% <span className="text-sm font-normal text-gray-500">da base</span></p>
                </div>
                <div className="text-sm text-gray-600">
                    <p>A categoria PCD possui acesso facilitado a São Januário e descontos exclusivos na loja.</p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Demographics;

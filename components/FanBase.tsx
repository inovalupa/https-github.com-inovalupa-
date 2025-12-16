
import React, { useState } from 'react';
import { MOCK_FANS, LTV_BY_SEGMENT_DATA } from '../constants';
import { Fan, FanStatus, RiskLevel } from '../types';
import { Search, Filter, Mail, AlertTriangle, X, ShoppingBag, Ticket, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FanBase: React.FC = () => {
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFans = MOCK_FANS.filter(fan => 
    fan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fan.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: FanStatus) => {
    switch(status) {
      case FanStatus.ACTIVE: return 'bg-green-100 text-green-700';
      case FanStatus.INACTIVE: return 'bg-gray-100 text-gray-600';
      case FanStatus.CHURN_RISK: return 'bg-red-100 text-red-700';
    }
  };

  const getRiskColor = (risk: RiskLevel) => {
     switch(risk) {
      case RiskLevel.LOW: return 'text-green-600';
      case RiskLevel.MEDIUM: return 'text-yellow-600';
      case RiskLevel.HIGH: return 'text-red-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          Filtrar Segmentos
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
              <tr>
                <th className="px-6 py-4">Torcedor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Segmento (Plano)</th>
                <th className="px-6 py-4">Engajamento</th>
                <th className="px-6 py-4">Risco Churn</th>
                <th className="px-6 py-4">LTV</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFans.map((fan) => (
                <tr key={fan.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedFan(fan)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={fan.avatar} alt={fan.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-900">{fan.name}</p>
                        <p className="text-xs text-gray-500">{fan.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fan.status)}`}>
                      {fan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fan.segment}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                      <div 
                        className="bg-brand-blue h-2.5 rounded-full" 
                        style={{ width: `${fan.engagementScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 inline-block">{fan.engagementScore}/100</span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-medium ${getRiskColor(fan.churnRisk)}`}>
                    {fan.churnRisk}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    R$ {fan.ltv.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-blue hover:text-brand-orange text-sm font-medium">
                      Ver Perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LTV Analysis Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-brand-orange" />
              Lifetime Value (LTV) Médio por Segmento
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Análise comparativa do valor gerado pelos diferentes planos do Sócio Gigante.
            </p>
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={LTV_BY_SEGMENT_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={120} 
                tick={{fill: '#4B5563', fontSize: 13, fontWeight: 500}} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{fill: '#F9FAFB'}}
                formatter={(value: number) => [`R$ ${value}`, 'LTV Médio']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="ltv" radius={[0, 4, 4, 0]} barSize={32}>
                {LTV_BY_SEGMENT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#0B1E3B' : '#FF6B00'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fan Detail Modal */}
      {selectedFan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-brand-blue to-brand-orange rounded-t-2xl"></div>
              <button 
                onClick={() => setSelectedFan(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row items-start gap-6 -mt-12">
                  <img src={selectedFan.avatar} alt={selectedFan.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
                  <div className="mt-12 md:mt-14 flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedFan.name}</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <span>{selectedFan.email}</span>
                      <span>•</span>
                      <span>Sócio desde 2021</span>
                    </div>
                  </div>
                  <div className="mt-14 flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                      <Mail size={16} /> Contatar
                    </button>
                    {selectedFan.churnRisk === RiskLevel.HIGH && (
                       <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-lg">
                       <AlertTriangle size={16} /> Ação de Retenção
                     </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {/* Column 1: Stats */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Score de Engajamento</h4>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-brand-blue">{selectedFan.engagementScore}</span>
                        <span className="text-sm text-gray-500 mb-1">/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${selectedFan.engagementScore}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Interesses Detectados (IA)</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFan.interests.map(interest => (
                          <span key={interest} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Transaction History */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-semibold text-gray-900 text-lg">Histórico de Transações</h3>
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                      {selectedFan.transactions.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                          {selectedFan.transactions.map(tx => (
                            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${tx.type === 'Loja' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                  {tx.type === 'Loja' ? <ShoppingBag size={18} /> : <Ticket size={18} />}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{tx.description}</p>
                                  <p className="text-xs text-gray-500">{tx.date} • {tx.type}</p>
                                </div>
                              </div>
                              <span className="font-semibold text-gray-900">R$ {tx.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          Nenhuma transação recente encontrada.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FanBase;

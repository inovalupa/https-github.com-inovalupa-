
import React, { useState } from 'react';
import { MOCK_FANS, LTV_BY_SEGMENT_DATA } from '../constants';
import { Fan, FanStatus, RiskLevel } from '../types';
import { Search, Filter, Mail, AlertTriangle, X, ShoppingBag, Ticket, TrendingUp, Fingerprint, Brain } from 'lucide-react';
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
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..."
            className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-semibold shadow-sm">
          <Filter size={18} />
          Filtros Avançados
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 text-gray-500 font-bold text-[10px] uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-5">Torcedor</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Segmento</th>
                <th className="px-6 py-5">Score de Engajamento</th>
                <th className="px-6 py-5">Risco Churn</th>
                <th className="px-6 py-5">LTV</th>
                <th className="px-6 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredFans.map((fan) => (
                <tr key={fan.id} className="hover:bg-brand-blue/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedFan(fan)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={fan.avatar} alt={fan.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${fan.status === FanStatus.ACTIVE ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{fan.name}</p>
                        <p className="text-[11px] text-gray-400">{fan.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight ${getStatusColor(fan.status)}`}>
                      {fan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600">{fan.segment}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="flex-1 bg-gray-100 rounded-full h-1.5 min-w-[60px]">
                        <div 
                          className={`h-1.5 rounded-full ${fan.engagementScore > 80 ? 'bg-brand-blue' : 'bg-brand-orange'}`} 
                          style={{ width: `${fan.engagementScore}%` }}
                        ></div>
                      </div>
                      <span className="text-[11px] font-bold text-gray-600">{fan.engagementScore}%</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-[11px] font-bold uppercase tracking-tighter ${getRiskColor(fan.churnRisk)}`}>
                    {fan.churnRisk}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                    R$ {fan.ltv.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-gray-50 hover:bg-brand-blue hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-gray-100">
                      Gerenciar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fan Detail Modal */}
      {selectedFan && (
        <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in flex flex-col">
            <div className="relative h-40 bg-gradient-to-br from-brand-dark via-brand-blue to-black">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Fingerprint size={120} className="text-white" /></div>
              <button 
                onClick={() => setSelectedFan(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="px-10 pb-10 flex-1 overflow-y-auto">
              <div className="flex flex-col md:flex-row items-start gap-8 -mt-16 relative z-10">
                <div className="relative">
                  <img src={selectedFan.avatar} alt={selectedFan.name} className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover" />
                  <div className="absolute -bottom-2 -right-2 bg-brand-orange text-white p-2 rounded-xl shadow-lg border-2 border-white">
                    <Brain size={20} />
                  </div>
                </div>
                
                <div className="mt-16 md:mt-20 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl font-black text-brand-blue tracking-tight">{selectedFan.name}</h2>
                    <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{selectedFan.segment}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mt-2 font-medium">
                    <span className="flex items-center gap-1"><Mail size={14} /> {selectedFan.email}</span>
                    <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                    <span>Sócio Ativo há 2 anos</span>
                  </div>
                </div>

                <div className="mt-16 md:mt-20 flex gap-3">
                   <button className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-brand-blue/20">
                     Ações Diretas
                   </button>
                   {selectedFan.churnRisk === RiskLevel.HIGH && (
                     <div className="animate-pulse px-6 py-3 bg-red-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/30">
                       <AlertTriangle size={18} /> Risco Crítico
                     </div>
                   )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* Column 1: AI DNA */}
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <Brain className="text-brand-orange" size={20} />
                    <h3 className="font-bold text-brand-blue uppercase text-xs tracking-widest">DNA Comportamental (IA)</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">Resumo Preditivo</p>
                      <p className="text-sm text-brand-blue font-medium leading-relaxed italic">
                        "{selectedFan.engagementScore > 85 
                          ? 'Torcedor engajado com alta propensão a upgrade para Sócio Black. Frequentador assíduo de São Januário.' 
                          : 'Torcedor dormente. Risco de churn detectado devido à inatividade nos últimos 45 dias. Sensível a promoções da Vasco Store.'}"
                      </p>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-3">Interesses Prioritários</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFan.interests.map(interest => (
                          <span key={interest} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Stats & Timeline */}
                <div className="lg:col-span-2 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Lifetime Value</p>
                        <p className="text-xl font-black text-brand-blue">R$ {selectedFan.ltv.toFixed(2)}</p>
                      </div>
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Engagement</p>
                        <p className="text-xl font-black text-brand-orange">{selectedFan.engagementScore}%</p>
                      </div>
                      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Último Check-in</p>
                        <p className="text-xl font-black text-gray-800">{selectedFan.lastInteraction}</p>
                      </div>
                   </div>

                   <div>
                    <h3 className="font-bold text-brand-blue text-lg mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-brand-orange" />
                      Histórico Financeiro
                    </h3>
                    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                      {selectedFan.transactions.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                          {selectedFan.transactions.map(tx => (
                            <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${tx.type === 'Loja' ? 'bg-orange-50 text-brand-orange' : 'bg-blue-50 text-brand-blue'}`}>
                                  {tx.type === 'Loja' ? <ShoppingBag size={18} /> : <Ticket size={18} />}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900 text-sm">{tx.description}</p>
                                  <p className="text-[11px] text-gray-500 font-medium uppercase">{tx.date} • {tx.type}</p>
                                </div>
                              </div>
                              <span className="font-black text-brand-blue">R$ {tx.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-10 text-center text-gray-400 italic font-medium">
                          Nenhuma transação financeira registrada nos últimos 6 meses.
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

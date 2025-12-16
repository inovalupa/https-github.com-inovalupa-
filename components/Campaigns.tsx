
import React, { useState } from 'react';
import { MOCK_CAMPAIGNS } from '../constants';
import { Campaign } from '../types';
import { Sparkles, Send, Plus, CheckCircle2, TrendingUp, Target, MessageSquare } from 'lucide-react';
import { generateCampaignIdea } from '../services/geminiService';

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState('Risco de Churn');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedIdea(null);
    const idea = await generateCampaignIdea(selectedSegment);
    setGeneratedIdea(idea);
    setIsGenerating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-10">
      {/* List of Active Campaigns */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-brand-blue">Campaign Studio</h2>
            <p className="text-xs text-gray-500">Gerencie e monitore suas ações de engajamento.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-bold shadow-md shadow-brand-blue/20">
            <Plus size={18} /> Nova Campanha
          </button>
        </div>

        <div className="grid gap-4">
          {campaigns.map(camp => (
            <div key={camp.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4 group hover:border-brand-orange/30 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${camp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {camp.status === 'Active' ? 'Em Execução' : 'Concluída'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-brand-blue border border-blue-100">
                    Segmento: {camp.targetSegment}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-brand-orange transition-colors">{camp.title}</h3>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{camp.description}</p>
              </div>
              <div className="flex flex-col items-center justify-center min-w-[120px] bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Conversão</span>
                <span className="text-2xl font-bold text-brand-orange">{camp.conversionRate}%</span>
                <div className="w-full bg-gray-200 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-brand-orange h-full" style={{ width: `${camp.conversionRate}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Generator Panel */}
      <div className="lg:col-span-1">
        <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-2xl h-full border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Sparkles size={80} /></div>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-brand-orange p-2 rounded-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Vasco AI Creative</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-blue-300 uppercase tracking-widest mb-3">
                Segmento Alvo
              </label>
              <select 
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all hover:bg-white/10"
              >
                <option value="Risco de Churn">Risco de Churn (Prevenção)</option>
                <option value="VIP">Torcedores VIP (Upsell)</option>
                <option value="Ocasional">Sócios Ocasionais (Ativação)</option>
                <option value="Família">Plano Família (Retenção)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-brand-orange hover:bg-orange-600 disabled:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-orange/20 group"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="animate-spin" size={20} />
                  <span>Analisando Comportamento...</span>
                </>
              ) : (
                <>
                  <span>Gerar Ação Estratégica</span>
                  <TrendingUp size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>

            {generatedIdea && (
              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-4 text-brand-orange">
                  <Target size={18} />
                  <span className="text-xs font-bold uppercase">Proposta de Campanha</span>
                </div>
                <div className="text-sm text-gray-200 whitespace-pre-line leading-relaxed italic font-light">
                  {generatedIdea}
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Impacto Previsto</p>
                      <p className="text-lg font-bold text-green-400">+12.5%</p>
                   </div>
                   <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Custo/ROI</p>
                      <p className="text-lg font-bold text-blue-400">Alto</p>
                   </div>
                </div>

                <div className="mt-6 flex gap-2">
                   <button className="flex-1 bg-white text-brand-blue py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                     Configurar Agora
                   </button>
                   <button className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                     <MessageSquare size={18} />
                   </button>
                </div>
              </div>
            )}
            
            {!generatedIdea && !isGenerating && (
              <div className="mt-12 bg-white/5 p-6 rounded-2xl border border-dashed border-white/20">
                <p className="text-xs text-blue-200 leading-relaxed text-center">
                  Utilize o poder da IA para processar trilhas de comportamento e gerar as melhores ofertas para cada sócio automaticamente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;

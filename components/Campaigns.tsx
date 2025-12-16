import React, { useState } from 'react';
import { MOCK_CAMPAIGNS } from '../constants';
import { Campaign } from '../types';
import { Sparkles, Send, Plus } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* List of Active Campaigns */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Campanhas Ativas</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-900 transition-colors">
            <Plus size={18} /> Nova Campanha
          </button>
        </div>

        <div className="grid gap-4">
          {campaigns.map(camp => (
            <div key={camp.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${camp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {camp.status === 'Active' ? 'Ativa' : 'Concluída'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-brand-blue border border-blue-100">
                    Alvo: {camp.targetSegment}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{camp.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{camp.description}</p>
              </div>
              <div className="flex flex-col items-end justify-center min-w-[100px]">
                <span className="text-sm text-gray-500">Conversão</span>
                <span className="text-2xl font-bold text-brand-orange">{camp.conversionRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Generator */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-brand-dark to-brand-blue text-white p-6 rounded-xl shadow-lg h-full">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-brand-orange" />
            <h3 className="text-lg font-bold">Data Fan AI Generator</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Qual segmento você quer atingir?
              </label>
              <select 
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <option value="Risco de Churn">Risco de Churn (Prevenção)</option>
                <option value="VIP">Torcedores VIP (Upsell)</option>
                <option value="Ocasional">Torcedores Ocasionais (Ativação)</option>
                <option value="Família">Famílias (Retenção)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-brand-orange hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? 'Criando...' : 'Gerar Ideia de Campanha'}
              {!isGenerating && <Sparkles size={18} />}
            </button>

            {generatedIdea && (
              <div className="mt-6 bg-white/10 border border-white/10 rounded-lg p-4 animate-fade-in">
                <h4 className="text-sm font-semibold text-brand-orange mb-2">Ideia Sugerida:</h4>
                <div className="text-sm text-gray-100 whitespace-pre-line leading-relaxed">
                  {generatedIdea}
                </div>
                <button className="mt-4 w-full bg-white text-brand-blue text-sm font-medium py-2 rounded hover:bg-gray-100 transition-colors">
                  Usar esta ideia
                </button>
              </div>
            )}
            
            {!generatedIdea && !isGenerating && (
              <div className="mt-8 text-center text-blue-200 text-sm">
                <p>Nossa IA analisa o comportamento histórico do segmento para sugerir a oferta mais assertiva.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
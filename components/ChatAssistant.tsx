
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, TrendingDown, Target } from 'lucide-react';
import { generateInsight } from '../services/geminiService';
import { DASHBOARD_STATS_DATA, MOCK_FANS } from '../constants';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou a Inteligência Artificial do Data Fan. Como posso ajudar a melhorar os resultados do seu clube hoje? Posso analisar dados de churn, sugerir ações de engajamento ou projetar receitas.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const QUICK_ACTIONS = [
    { label: 'Analisar Churn', icon: TrendingDown, prompt: 'Quais os principais motivos para o aumento do Churn em Março e como reverter?' },
    { label: 'Sugerir Campanha', icon: Target, prompt: 'Sugira uma campanha de renovação para o plano Gigante Ouro com foco em quem não vai ao estádio há 3 meses.' },
    { label: 'Projeção Receita', icon: Sparkles, prompt: 'Qual a projeção de receita para o próximo trimestre considerando a janela de transferências?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customPrompt?: string) => {
    const userMessage = customPrompt || input;
    if (!userMessage.trim()) return;

    if (!customPrompt) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const context = JSON.stringify({
      dashboardStats: DASHBOARD_STATS_DATA,
      fansSample: MOCK_FANS.map(f => ({ name: f.name, status: f.status, score: f.engagementScore }))
    });

    const aiResponse = await generateInsight(userMessage, context);

    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-brand-dark p-4 flex items-center justify-between text-white border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-brand-orange p-2 rounded-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold">Consultora Estratégica Data Fan</h3>
            <p className="text-[10px] text-brand-orange uppercase tracking-widest font-bold">Vasco AI powered</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 custom-scroll">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${
              msg.role === 'user' 
                ? 'bg-brand-blue text-white rounded-tr-none shadow-lg shadow-brand-blue/10' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-md'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none prose-headings:text-brand-blue">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm font-medium">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-3">
              <Loader2 className="animate-spin text-brand-orange" size={20} />
              <span className="text-sm text-gray-500 font-medium italic">Data Fan AI está processando sua análise estratégica...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions & Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.prompt)}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-brand-orange hover:text-white rounded-full text-xs font-semibold text-gray-600 transition-all border border-gray-200"
            >
              <action.icon size={14} />
              {action.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte qualquer coisa sobre sua base de torcedores..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
            />
            <MessageSquare className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-brand-orange hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white p-3 rounded-xl transition-all shadow-lg shadow-brand-orange/20"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;

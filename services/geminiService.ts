
import { GoogleGenAI } from "@google/genai";

/**
 * Função principal para gerar insights estratégicos baseados em dados.
 */
export const generateInsight = async (prompt: string, contextData: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Você é a "Data Fan AI", uma consultora estratégica especialista em marketing esportivo e análise de dados para o América Futebol Clube (América Mineiro).
    Seu objetivo é ajudar gestores a:
    1. Aumentar a receita direta (loja oficial, ingressos no Independência, mensalidades Onda Verde).
    2. Reduzir o Churn (cancelamento) do Sócio Coelhão através de ações preditivas.
    3. Melhorar o engajamento no Horto (estádio Independência) e canais digitais.
    
    Responda em Markdown, use negrito para destaques e emojis (como 🐰🟢) para facilitar a leitura. 
    Seja direto e prático, focado na realidade de um clube de tradição e crescimento.

    DADOS ATUAIS DO DASHBOARD:
    ${contextData}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não consegui processar essa análise agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro de conexão com a Data Fan AI. Verifique os logs do console.";
  }
};

export const generateCampaignIdea = async (targetSegment: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Crie uma campanha de marketing inovadora e personalizada para o segmento de torcedores do América Mineiro: ${targetSegment}. 
      Considere o estádio Independência e o programa Onda Verde.
      Inclua: Título, Oferta Principal, Canal de Comunicação e KPI esperado.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || "Erro ao gerar campanha.";
  } catch (error) {
    return "Falha na conexão com a IA para geração de campanha.";
  }
};

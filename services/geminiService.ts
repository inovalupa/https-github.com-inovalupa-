
import { GoogleGenAI } from "@google/genai";

/**
 * Função principal para gerar insights estratégicos baseados em dados.
 */
export const generateInsight = async (prompt: string, contextData: string): Promise<string> => {
  // @fix Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Você é a "Data Fan AI", uma consultora estratégica especialista em marketing esportivo e análise de dados para o Club de Regatas Vasco da Gama.
    Seu objetivo é ajudar gestores a:
    1. Aumentar a receita direta (loja, ingressos, mensalidades).
    2. Reduzir o Churn (cancelamento) do Sócio Gigante através de ações preditivas.
    3. Melhorar o engajamento digital e físico.
    
    Responda em Markdown, use negrito para destaques e emojis para facilitar a leitura. 
    Seja direto e prático.

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

    // @fix Extract text output using the .text property (not a method)
    return response.text || "Desculpe, não consegui processar essa análise agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro de conexão com a Data Fan AI. Verifique os logs do console.";
  }
};

export const generateCampaignIdea = async (targetSegment: string): Promise<string> => {
  // @fix Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Crie uma campanha de marketing inovadora e personalizada para o segmento de torcedores do Vasco: ${targetSegment}. 
      Inclua: Título, Oferta Principal, Canal de Comunicação e KPI esperado.`,
      config: {
        temperature: 0.9,
      }
    });
    // @fix Extract text output using the .text property
    return response.text || "Erro ao gerar campanha.";
  } catch (error) {
    return "Falha na conexão com a IA para geração de campanha.";
  }
};

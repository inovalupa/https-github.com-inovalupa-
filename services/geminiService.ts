
import { GoogleGenAI } from "@google/genai";

/**
 * Função principal para gerar insights estratégicos baseados em dados.
 */
export const generateInsight = async (prompt: string, contextData: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "### ⚠️ Chave de API Não Encontrada\n\nPara que a IA funcione, você deve adicionar a variável de ambiente no Vercel com o nome exato: **`API_KEY`**.\n\n1. Vá em Settings -> Environment Variables.\n2. Key: `API_KEY`\n3. Value: (Sua chave do Google AI Studio)\n4. Faça um novo Deploy.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    Você é a "Data Fan AI", uma consultora estratégica especialista em marketing esportivo para o Club de Regatas Vasco da Gama.
    Sugerir ações para aumentar receita, reduzir churn e melhorar o engajamento do Sócio Gigante.
    Use Markdown.

    Dados do dashboard:
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

    return response.text || "Sem resposta da IA.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao consultar a IA. Verifique se a `API_KEY` é válida.";
  }
};

export const generateCampaignIdea = async (targetSegment: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "Configure a variável `API_KEY` no seu ambiente.";

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Sugira uma campanha para o segmento: ${targetSegment} (Vasco da Gama).`,
    });
    return response.text || "Erro ao gerar ideia.";
  } catch (error) {
    return "Falha na conexão com Gemini.";
  }
};

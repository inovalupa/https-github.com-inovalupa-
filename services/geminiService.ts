import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInsight = async (prompt: string, contextData: string): Promise<string> => {
  const systemInstruction = `
    Você é a "Data Fan AI", uma consultora estratégica especialista em marketing esportivo trabalhando especificamente para o **Club de Regatas Vasco da Gama**.
    
    Seu objetivo é analisar dados e sugerir ações para aumentar receita, reduzir churn (cancelamento) e melhorar o engajamento do programa **Sócio Gigante**.
    
    Ao responder, leve em consideração:
    1. A paixão da torcida vascaína (São Januário, Barreira do Vasco).
    2. A história de inclusão do clube (Camisas Negras).
    3. Oportunidades com a Vasco Store e venda de ingressos.
    4. Contexto dos planos: Gigante Black, Ouro, Norte a Sul, etc.
    
    Responda de forma profissional, direta e orientada a dados, mas com o tom apaixonado que o futebol exige. Use formatação Markdown.
    
    Contexto dos dados atuais do painel:
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

    return response.text || "Não foi possível gerar uma resposta no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao consultar a inteligência artificial. Verifique sua conexão e chave de API.";
  }
};

export const generateCampaignIdea = async (targetSegment: string): Promise<string> => {
  const prompt = `Crie uma ideia de campanha de marketing criativa para o segmento de torcedores do Vasco: ${targetSegment}. 
  Considere o contexto do Vasco da Gama (São Januário, história).
  Inclua um título atraente, descrição da mecânica e canais sugeridos (WhatsApp, Email, Push).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Erro ao gerar campanha.";
  } catch (error) {
    return "Erro ao conectar com a IA.";
  }
};
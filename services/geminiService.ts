
import { GoogleGenAI } from "@google/genai";
import { ContractDetails } from "../types";

export class GeminiService {
  private apiKey: string | null = null;

  constructor() {
    // Preferência: chave do usuário (local) > env build-time
    if (typeof window !== 'undefined') {
      this.apiKey = window.localStorage.getItem('capy_gemini_api_key');
    }
  }

  setApiKey(key: string) {
    this.apiKey = key;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('capy_gemini_api_key', key);
    }
  }

  getApiKey() {
    return this.apiKey || (process.env.API_KEY as unknown as string | undefined) || undefined;
  }

  // Creating a new instance of GoogleGenAI for each request to ensure fresh API key context
  private getClient() {
    const key = this.getApiKey();
    if (!key) throw new Error('Missing Gemini API key');
    return new GoogleGenAI({ apiKey: key });
  }

  // Basic validation using gemini-3-flash-preview
  async validateKey(manualKey?: string): Promise<boolean> {
    try {
      if (manualKey) this.setApiKey(manualKey);
      const ai = this.getClient();
      // Using gemini-3-flash-preview for quick and cost-effective validation
      await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'ping',
        config: { maxOutputTokens: 10, thinkingConfig: { thinkingBudget: 0 } }
      });
      return true;
    } catch (error: any) {
      return false;
    }
  }

  // Requirement improvement using basic reasoning
  async improveDescription(description: string): Promise<string> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Melhore tecnicamente esta descrição de requisitos contratuais para um especialista jurídico: "${description}"`,
    });
    return response.text || description;
  }

  // Contract synthesis using gemini-3-pro-preview for complex drafting
  async generateContract(details: ContractDetails): Promise<string> {
    const ai = this.getClient();
    const systemInstruction = `
[PERSONA JURÍDICA ELITE]
Você é um Advogado Sênior e Consultor Jurídico Especialista em redação de contratos complexos.
Seu objetivo é gerar um modelo de contrato profissional, robusto e atualizado com as leis brasileiras.

Regras de Redação:
- Use linguagem jurídica formal e precisa.
- Formate em Markdown estruturado (Título, Cláusulas, Parágrafos).
- Inclua espaços em branco [__________] para preenchimento de dados sensíveis onde necessário.
- Garanta clareza sobre obrigações, multas, rescisão e foro.
- Se o tom for 'amigável', mantenha o rigor jurídico mas com redação mais clara.
- Se for 'rígido', proteja ao máximo a parte contratante.

Você está operando no motor CapyContrato Elite. Gere apenas o texto do contrato.
`;

    const prompt = `Gere um contrato de: ${details.type}.
Partes: ${details.parties || 'Não especificadas - use lacunas [__________]'}.
Tom: ${details.tone}.
Detalhes adicionais e cláusulas solicitadas: ${details.clauses || 'Nenhuma adicional'}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        // Using a healthy thinking budget for professional legal drafting
        thinkingConfig: { thinkingBudget: 8000 }
      }
    });

    return response.text || "// Erro ao gerar contrato.";
  }
}

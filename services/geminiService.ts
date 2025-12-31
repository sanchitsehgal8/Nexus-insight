import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeGeopolitics = async (
  industry: string, 
  region: string
): Promise<AnalysisResult> => {
  
  const prompt = `
    Act as a senior strategy consultant at a top-tier firm (like McKinsey or BCG) specializing in geopolitical risk and market foresight.
    
    Conduct a deep strategic analysis of the intersection between the following Industry and Geopolitical Region:
    Industry/Sector: ${industry}
    Region/Geopolitics: ${region}

    You must generate a structured JSON response containing:
    1. An executive summary (max 3 sentences).
    2. Three distinct future scenarios (Optimistic, Pessimistic, Status Quo) with probabilities and descriptions.
    3. Hypothetical 5-year market growth index data (0-200 scale, where 100 is baseline today) for all three scenarios to populate a line chart.
    4. Key strategic opportunities.
    5. Critical geopolitical risks.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a specialized AI for Strategic Foresight and Geopolitical Analysis. Always return valid JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING },
          scenarios: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                probability: { type: Type.STRING },
                description: { type: Type.STRING },
                keyTrigger: { type: Type.STRING, description: "The catalyst event" }
              }
            }
          },
          marketData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.STRING },
                optimistic: { type: Type.NUMBER },
                realistic: { type: Type.NUMBER },
                pessimistic: { type: Type.NUMBER }
              }
            }
          },
          strategicOpportunities: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          geopoliticalRisks: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["executiveSummary", "scenarios", "marketData", "strategicOpportunities", "geopoliticalRisks"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response generated from Gemini.");
  }

  return JSON.parse(response.text) as AnalysisResult;
};
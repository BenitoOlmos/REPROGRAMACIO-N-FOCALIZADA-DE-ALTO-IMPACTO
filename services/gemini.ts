
import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI with the API key from environment variables as required.
// Always use the named parameter format: { apiKey: string }.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTherapeuticInsights = async (results: any[]) => {
  // Assume process.env.API_KEY is pre-configured and valid. 
  // Do not perform conditional checks on its availability within the app code.
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza la evolución de este paciente basada en sus tests de bienestar (0-100).
      Resultados: ${JSON.stringify(results)}.
      Genera un resumen motivador de 2 párrafos sobre su progreso. Sé profesional, empático y usa un tono de 'lujo minimalista' (directo, elegante, calmado).`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });

    // Access the text property directly from the response object.
    return response.text || "Progreso constante detectado.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Tu camino de evolución está en marcha.";
  }
};

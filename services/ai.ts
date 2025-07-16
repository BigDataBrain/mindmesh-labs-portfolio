import { GoogleGenAI } from '@google/genai';

// IMPORTANT: This file assumes that process.env.API_KEY is available in the execution environment.
// In a standard browser environment, this would be managed by a build tool like Vite or Create React App.
// For this environment, it's expected to be set externally.

const getApiKey = (): string => {
    // In a real build system, `process.env.API_KEY` would be replaced at build time.
    // For this environment, we are assuming it is available.
    // Ensure you have a valid API Key set in your environment variables.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY environment variable not set.");
        throw new Error("API Key is missing. Please set the API_KEY environment variable.");
    }
    return apiKey;
};


let ai: GoogleGenAI;
try {
   ai = new GoogleGenAI({ apiKey: getApiKey() });
} catch(e) {
    console.error(e);
}


export const askAboutProject = async (projectContext: string, question: string): Promise<string> => {
    if(!ai) {
        throw new Error("GoogleGenAI client not initialized. Check your API key.");
    }

    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are an expert AI assistant providing information about a software project. 
Your knowledge is strictly limited to the project description provided below. 
Do not make up information. If the answer is not in the description, state that the information is not available in the provided context.
Answer concisely and directly based on the user's question.

PROJECT DESCRIPTION:
---
${projectContext}
---
`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: question,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
                topK: 32,
                topP: 1,
            }
        });

        if (response && response.text) {
            return response.text;
        } else {
            return "I received a response, but it was empty. The model may not have had an answer based on the context.";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        
        let errorMessage = "An error occurred while communicating with the AI. Please try again later.";
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                errorMessage = "The provided API Key is not valid. Please check your credentials.";
            } else if (error.message.includes('fetch')) {
                 errorMessage = "A network error occurred. Please check your connection and firewall settings.";
            } else {
                errorMessage = error.message;
            }
        }
        throw new Error(errorMessage);
    }
};

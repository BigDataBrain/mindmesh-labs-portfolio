import { GoogleGenAI } from '@google/genai';

// IMPORTANT: This file uses `import.meta.env.VITE_API_KEY` which is injected by the Vite build tool.
// For local development, you must create a `.env` file in the project root and add `VITE_API_KEY="YOUR_API_KEY"`.
// For deployment, you must set the `VITE_API_KEY` environment variable in your hosting provider's settings.

const getApiKey = (): string => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        console.error("VITE_API_KEY environment variable not set.");
        throw new Error("API Key is missing. Please set the VITE_API_KEY environment variable. If running locally, create a .env file. See README.md for more details.");
    }
    return apiKey;
};


let ai: GoogleGenAI;
try {
   ai = new GoogleGenAI({ apiKey: getApiKey() });
} catch(e) {
    console.error("Failed to initialize GoogleGenAI. Ensure your VITE_API_KEY is correct.", e);
}


export const askAboutProject = async (projectContext: string, question: string): Promise<string> => {
    if(!ai) {
        throw new Error("GoogleGenAI client not initialized. Please check your API key is configured correctly.");
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

        const text = response.text;

        if (text) {
            return text;
        } else {
            return "I received a response, but it was empty. The model may not have had an answer based on the context.";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        
        let errorMessage = "An error occurred while communicating with the AI. Please try again later.";
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                errorMessage = "The provided API Key is not valid. Please check your credentials in your .env file or deployment settings.";
            } else if (error.message.includes('fetch')) {
                 errorMessage = "A network error occurred. Please check your connection and firewall settings.";
            } else {
                errorMessage = error.message;
            }
        }
        throw new Error(errorMessage);
    }
};

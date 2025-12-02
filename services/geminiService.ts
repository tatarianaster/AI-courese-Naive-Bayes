import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are an expert Computer Science teacher specializing in Machine Learning. 
Your specific goal is to teach the "Naive Bayes" algorithm to a student who has zero background.
You must explain concepts simply, using analogies (like the Spam filter or Fruit basket).
When the student asks a question, do not just give the answer directly if it involves a calculation; instead, guide them through the steps of Bayes' Theorem.
Focus on:
1. The difference between Prior Probability P(A) and Posterior Probability P(A|B).
2. Why we call it "Naive" (assumption of independence).
3. How to calculate likelihoods.

Keep your responses concise, encouraging, and formatted with clear paragraphs or lists.
Use Markdown for formatting.
`;

export const initChat = async (): Promise<void> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initChat();
    if (!chatSession) return "Error: AI Tutor not initialized. Please check your API key.";
  }

  try {
    const response: GenerateContentResponse = await chatSession!.sendMessage({ message });
    return response.text || "I'm having trouble thinking right now. Try again?";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I encountered an error connecting to the AI service.";
  }
};

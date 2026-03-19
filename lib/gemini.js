import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askAI(message, history = []) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  // ✅ System prompt to control behavior
  const systemPrompt = `
You are a supportive AI therapist.

Rules:
- Keep responses SHORT (2–4 sentences max)
- Be empathetic and natural (like a human)
- Ask only ONE gentle follow-up question
- Avoid bullet points, lists, or headings
- Do NOT sound like a lecture or article
- Keep tone calm, simple, and conversational
`;

  // ✅ Start chat with proper history
  const chat = model.startChat({
    history: [
      // system instruction (important)
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Okay, I understand." }],
      },

      // actual conversation history
      ...history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    ],
  });

  // ✅ Send current message
  const result = await chat.sendMessage(message);

  return result.response.text();
}
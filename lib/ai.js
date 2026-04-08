import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ✅ safer JSON extractor
function extractJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    // try to extract JSON inside text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
    return null;
  }
}

export async function askAI(message, history = []) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const formattedHistory = history
    .map((msg) => `${msg.role}: ${msg.text}`)
    .join("\n");

  const prompt = `
You are a supportive AI therapist.

Rules:
- Keep responses SHORT (2–4 sentences max)
- Be empathetic and natural (like a human)
- Ask only ONE gentle follow-up question
- Avoid bullet points, lists, or headings
- Do NOT sound like a lecture or article
- Keep tone calm, simple, and conversational

IMPORTANT:
Return ONLY valid JSON. No markdown. No explanation.

Format:
{
  "reply": "...",
  "mood": {
    "label": "happy/sad/anxiety/stress/neutral",
    "value": number between 0 and 100
  }
}

IMPORTANT SCALE:
- anxiety/sad → 20–40
- stress → 30–50
- neutral → 50
- calm → 60–70
- happy → 70–90

Conversation:
${formattedHistory}

User: ${message}
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // ✅ remove markdown if present
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  const parsed = extractJSON(text);

  // ❌ fallback if parsing fails
  if (!parsed) {
    console.log("⚠️ Failed JSON:", text);

    return {
      reply: text,
      mood: { label: "neutral", value: 50 },
    };
  }

  // ✅ sanitize mood
  let mood = parsed.mood || { label: "neutral", value: 50 };

  if (typeof mood.value !== "number") mood.value = 50;
  if (mood.value < 0) mood.value = 0;
  if (mood.value > 100) mood.value = 100;

  return {
    reply: parsed.reply || "I'm here for you. Tell me more.",
    mood,
  };
}
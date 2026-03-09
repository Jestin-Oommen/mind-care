import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askAI(message) {

const model = genAI.getGenerativeModel({
model: "gemini-2.5-flash"
});

const prompt = `
You are a supportive AI therapist.

Respond with empathy and emotional support.
Ask gentle questions to help the user reflect.
Do not give medical diagnosis.

User: ${message}
`;

const result = await model.generateContent(prompt);

return result.response.text();

}
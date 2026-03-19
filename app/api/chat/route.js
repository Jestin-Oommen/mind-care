import { askAI } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    const reply = await askAI(message, history);

    return Response.json({ reply });
  } catch (error) {
    console.error(error);
    return Response.json({ reply: "Something went wrong." });
  }
}
import { askAI } from "@/lib/gemini";

export async function POST(req) {

const { message } = await req.json();

const reply = await askAI(message);

return Response.json({ reply });

}
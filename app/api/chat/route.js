import { prisma } from "@/lib/prisma";
import { askAI } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { message, sessionId } = await req.json();

    if (!sessionId) {
      return Response.json({ reply: "Session ID missing" });
    }

    // ✅ 1. Get previous messages from DB
    const previousMessages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });

    // ✅ 2. Format history for Gemini
    const history = previousMessages.map((msg) => ({
      role: msg.role,
      text: msg.text,
    }));

    // ✅ 3. Get AI response
    const reply = await askAI(message, history);

    // ✅ 4. Save messages in DB
    await prisma.message.createMany({
      data: [
        { sessionId, role: "user", text: message },
        { sessionId, role: "assistant", text: reply },
      ],
    });

    return Response.json({ reply });
  } catch (error) {
    console.error(error);
    return Response.json({ reply: "Something went wrong." });
  }
}
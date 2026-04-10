import { prisma } from "@/lib/prisma";
import { askAI } from "../../../lib/ai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path if needed

export async function POST(req) {
  try {
    // ✅ 1. Check auth
    const session = await getServerSession(authOptions);

    

    // ✅ 2. Ensure user exists
    

          let user = null;

          if (session) {
            user = await prisma.user.upsert({
              where: { email: session.user.email },
              update: {},
              create: {
                email: session.user.email,
                name: session.user.name,
              },
            });
          }

    const { message, sessionId } = await req.json();

    

    // ✅ 3. Get previous messages
    const previousMessages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });

    // ✅ 4. Format history
    const history = previousMessages.map((msg) => ({
      role: msg.role,
      text: msg.text,
    }));

    // ✅ 5. Get AI response (with mood)
    const ai = await askAI(message, history);

    // ✅ 6. Save chat messages
    await prisma.message.createMany({
      data: [
        { sessionId, role: "user", text: message },
        { sessionId, role: "assistant", text: ai.reply },
      ],
    });

    // ✅ 7. Save mood
    if (user && ai.mood) {
      await prisma.mood.create({
        data: {
          userId: user.id,
          value: ai.mood.value,
          label: ai.mood.label,
        },
      });
    }

    // ✅ 8. Return response
    return Response.json({
      reply: ai.reply,
      mood: ai.mood,
    });

  } catch (error) {
    console.error(error);
    return Response.json({ reply: "Something went wrong." });
  }
}
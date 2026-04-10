import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    let userId = null;

    if (session) {
      const user = await prisma.user.upsert({
        where: { email: session.user.email },
        update: {},
        create: {
          email: session.user.email,
          name: session.user.name,
        },
      });

      userId = user.id;
    }

    // ✅ IMPORTANT FIX
    const chatSession = await prisma.chatSession.create({
      data: userId ? { userId } : {},
    });

    return Response.json({ sessionId: chatSession.id });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create session" });
  }
}
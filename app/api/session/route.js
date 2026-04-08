import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" });
  }

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name,
    },
  });

  const chatSession = await prisma.chatSession.create({
    data: {
      userId: user.id,
    },
  });

  return Response.json({ sessionId: chatSession.id });
}
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await prisma.chatSession.create({
    data: {},
  });

  return Response.json({ sessionId: session.id });
}
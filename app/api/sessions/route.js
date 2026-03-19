import { prisma } from "@/lib/prisma";

export async function GET() {
  const sessions = await prisma.chatSession.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return Response.json(sessions);
}
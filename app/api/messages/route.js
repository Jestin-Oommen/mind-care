import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const { sessionId } = await req.json();

  const messages = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(messages);
}
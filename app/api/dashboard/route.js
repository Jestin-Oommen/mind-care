import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  if (!session) return Response.json({ moods: [], sessions: [] });

  // ensure user exists
  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name,
    },
  });

  // get moods
  const moods = await prisma.mood.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  // get sessions
  const sessions = await prisma.chatSession.findMany({
    where: { userId: user.id },
  });

  return Response.json({
    moods,
    sessions,
  });
}
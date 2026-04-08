import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) return Response.json({ error: "Unauthorized" });

  // ensure user exists
  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name,
    },
  });

  const { value, label } = await req.json();

  const mood = await prisma.mood.create({
    data: {
      userId: user.id,
      value,
      label,
    },
  });

  return Response.json(mood);
}
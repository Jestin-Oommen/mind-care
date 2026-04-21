import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ error: "All fields required" });
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return Response.json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: null,
    },
  });

  return Response.json({ success: true });
}
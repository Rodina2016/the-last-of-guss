import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function findOrCreateUser(username: string, password: string) {
  const lower = username.trim().toLowerCase();
  const role: "admin" | "nikita" | "survivor" =
    lower === "admin"
      ? "admin"
      : lower === "никита" || lower === "nikita"
      ? "nikita"
      : "survivor";

  let user = await prisma.user.findUnique({ where: { username: lower } });

  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: { username: lower, passwordHash: hash, role },
    });
  } else {
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("invalid-password");
  }

  return user;
}

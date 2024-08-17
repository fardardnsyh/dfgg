import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma/db";
import bcrypt from "bcrypt";

// Export a named function for the POST method
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  let dbUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!dbUser) {
    const hashedPassword = await bcrypt.hash(password, 5);
    dbUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  }

  const dashboardUrl = new URL("/dashboard", req.url);
  return NextResponse.redirect(dashboardUrl);
}

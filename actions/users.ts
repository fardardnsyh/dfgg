// server-actions.ts
"use server";

import prisma from "@/prisma/prisma/db";

export async function getUser() {
    return await prisma.user.findFirst();
}

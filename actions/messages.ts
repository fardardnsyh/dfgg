"use server";

import prisma from '@/prisma/prisma/db'


export async function getFileMessages(fileId: string) {
  return await prisma.message.findMany({
    where: { fileId: fileId },
  });
}

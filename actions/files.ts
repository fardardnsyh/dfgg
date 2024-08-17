"use server";

import prisma from "@/prisma/prisma/db";
import { UTApi } from "uploadthing/server";

export async function getFileFromDb(id: string) {
  return await prisma.file.findUnique({
    where: { id: id },
  });
}

export async function getAllFilesFromDb() {
  return await prisma.file.findMany();
}

export async function deleteFileById(key: string) {
  try {
    const utApi = new UTApi();

    const deletedFile = await prisma.file.delete({
      where: { key: key },
    });

    if (!deletedFile) {
      return { error: "Internal server error.", status: 500 };
    }

    const { success } = await utApi.deleteFiles(key);

    if (!success) return { error: "Internal server error.", status: 500 };

    return { success: "File deleted successfully.", status: 200 };
  } catch (error) {
    return { error: "Internal server error.", status: 500 };
  }
}

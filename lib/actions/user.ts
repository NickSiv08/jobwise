"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function findUser() {
  try {
    const user = await currentUser();

    if (!user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (existingUser) {
      return { exists: true };
    } else {
      return { exists: false };
    }
  } catch (error) {
    console.error("Error finding user:", error);
  }
}

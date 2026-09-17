"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { UserRole } from "@/generated/prisma/enums";

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

export async function createUser(
  firstName: string,
  lastName: string,
  phone: string,
  role: UserRole,
) {
  try {
    const user = await currentUser();

    if (!user) return;

    if (!firstName || !lastName || !phone) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (existingUser) return;

    const createdUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        role: role,
        isConfirmed: true,
      },
    });

    return createdUser;
  } catch (error) {
    console.error("Could not create user:", error);
    throw new Error("User could not be created");
  }
}

export async function createCandidate() {
  try {
  } catch (error) {}
}

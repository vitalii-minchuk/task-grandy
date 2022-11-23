import prisma from "../../utils/prisma";
import { User } from "@prisma/client";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: {
        first_name: input.first_name,
        gender: input.gender,
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUsers() {
  const users = await prisma.user.findMany({
    select: {
      first_name: true,
      gender: true,
      id: true,
    },
  });

  return users;
}

export async function findSingleUser(userId: number) {
  const user = prisma.user.findFirst({
    where: { id: userId },
    select: {
      id: true,
      first_name: true,
      gender: true,
      following: { select: { following: true } },
      followedBy: { select: { follower: true } },
      friends: true,
    },
  });

  return user;
}

export async function deleteAllUsers() {
  return prisma.user.deleteMany();
}

export async function deleteSingleUser(id: number) {
  return prisma.user.delete({ where: { id }, select: { id: true } });
}

export async function findSingleUserWithFriends(
  userId: number,
  order_type: "desc" | "asc"
) {
  try {
    const user = prisma.user.findFirst({
      where: {
        id: { equals: userId },
      },
      select: {
        id: true,
        first_name: true,
        friends: {
          select: {
            id: true,
            first_name: true,
          },
          orderBy: { id: order_type },
        },
      },
    });

    return user;
  } catch (error) {
    throw new Error("Invalid request");
  }
}

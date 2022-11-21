import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const user = await prisma.user.create({
    data: {
      first_name: input.first_name,
      gender: input.gender,
    },
  });

  return user;
}

export async function findUsers() {
  const users = await prisma.user.findMany({
    select: {
      first_name: true,
      gender: true,
      id: true,
      followedBy: {
        select: { follower: { select: { id: true, first_name: true } } },
      },
      following: {
        select: { following: { select: { id: true, first_name: true } } },
      },
    },
  });

  return users;
}

export async function findSingleUser(userId: number) {
  const user = prisma.user.findFirst({ where: { id: userId } });

  return user;
}

export async function deleteAllUsers() {
  return prisma.user.deleteMany();
}

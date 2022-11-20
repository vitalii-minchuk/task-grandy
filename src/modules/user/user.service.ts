import prisma from "../../utils/prisma";
import { CreateUserInput, CreateUserResponse } from "./user.schema";

export async function createUser(
  input: CreateUserInput
): Promise<CreateUserResponse> {
  const user = await prisma.user.create({
    data: {
      first_name: input.first_name,
      gender: input.gender,
    },
  });

  return user;
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      first_name: true,
      gender: true,
      id: true,
    },
  });
}

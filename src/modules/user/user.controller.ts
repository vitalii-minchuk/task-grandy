import { CreateUserInput } from "./user.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUser,
  deleteAllUsers,
  findSingleUser,
  findUsers,
} from "./user.service";

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const user = await createUser(request.body);

  return reply.code(201).send(user);
}

export async function getAllUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const users = await findUsers();

  return reply.status(200).send(users);
}

export async function getSingleUserHandler(
  request: FastifyRequest<{
    Params: {
      id: number;
    };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const user = await findSingleUser(+id);

  return reply.status(200).send(user);
}

export async function deleteAllUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await deleteAllUsers();

  return reply.status(200);
}

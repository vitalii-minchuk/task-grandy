import { CreateUserInput } from "./user.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";

async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const user = await createUser(request.body);

  return reply.code(201).send(user);
}

export default createUserHandler;

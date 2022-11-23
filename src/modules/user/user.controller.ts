import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./user.schema";
import {
  createUser,
  deleteAllUsers,
  deleteSingleUser,
  findSingleUser,
  findSingleUserWithFriends,
  findUsers,
} from "./user.service";

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  try {
    const user = await createUser(request.body);

    return reply.code(201).send(user);
  } catch (error: any) {
    console.log("Create user error", error);
    return reply.send(error);
  }
}

export async function getAllUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await findUsers();

    return reply.status(200).send(users);
  } catch (error) {
    console.log("Get all users error", error);
    return reply.send(error);
  }
}

export async function getSingleUserHandler(
  request: FastifyRequest<{
    Params: {
      id: number;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const user = await findSingleUser(+id);

    return reply.status(200).send(user);
  } catch (error) {
    console.log("Get single user error", error);
    return reply.send(error);
  }
}

export async function deleteAllUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    deleteAllUsers();

    return { status: "OK" };
  } catch (error) {
    console.log("Delete all users error", error);
    return reply.send(error);
  }
}

export async function deleteSingleUserHandler(
  request: FastifyRequest<{
    Params: {
      id: number;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const id = Number(request.params.id);

    const deletedUserId = await deleteSingleUser(id);

    return reply.send(deletedUserId);
  } catch (error) {
    console.log("Delete single user error", error);
    return reply.send(error);
  }
}

export async function getFriendsHandler(
  request: FastifyRequest<{
    Params: {
      id: number;
    };
    Querystring: {
      order_type: "desc" | "asc";
    };
  }>,
  reply: FastifyReply
) {
  try {
    const id = Number(request.params.id);
    const { order_type } = request.query;

    const user = await findSingleUserWithFriends(id, order_type);

    return reply.status(200).send(user);
  } catch (error) {
    console.log("Get user with friends error", error);
    return reply.send(error);
  }
}

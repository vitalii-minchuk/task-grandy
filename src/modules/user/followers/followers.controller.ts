import { FastifyReply, FastifyRequest } from "fastify";
import {
  findUsersWithMaxFollowings,
  findUsersWithoutFollowings,
  follow,
} from "./followers.service";

export async function getNotFollowingHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const users = await findUsersWithoutFollowings();

  return users;
}

export async function getMaxFollowingHandler(
  request: FastifyRequest<{
    Params: {
      top: number;
    };
  }>,
  reply: FastifyReply
) {
  const { top } = request.params;
  const users = await findUsersWithMaxFollowings(+top);

  return users;
}

export async function followHandler(
  request: FastifyRequest<{
    Body: {
      userId: number;
      friendId: number;
    };
  }>,
  reply: FastifyReply
) {
  const { userId, friendId } = request.body;
  console.log({ userId, friendId });
  const friend = await follow(+userId, +friendId);

  return friend;
}

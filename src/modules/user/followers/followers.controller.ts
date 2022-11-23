import { FastifyReply, FastifyRequest } from "fastify";
import {
  findUsersWithMaxFollowings,
  findUsersWithoutFollowings,
  follow,
  isMutual,
  makeFriend,
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

  const followingUser = await follow(+userId, +friendId);
  const candidate = await isMutual(+userId, +friendId);

  if (candidate) {
    await makeFriend(+userId, +friendId);
    await makeFriend(+friendId, +userId);
  }

  return followingUser;
}

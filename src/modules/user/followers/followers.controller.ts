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
  try {
    const users = await findUsersWithoutFollowings();

    return users;
  } catch (error) {
    console.log("Find users with followers error", error);
    return reply.send(error);
  }
}

export async function getMaxFollowingHandler(
  request: FastifyRequest<{
    Params: {
      top: number;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { top } = request.params;
    const users = await findUsersWithMaxFollowings(+top);

    return users;
  } catch (error) {
    console.log("Get users with max followers error", error);
    return reply.send(error);
  }
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
  try {
    const { userId, friendId } = request.body;

    const followingUser = await follow(+userId, +friendId);
    const candidate = await isMutual(+userId, +friendId);

    if (candidate) {
      await makeFriend(+userId, +friendId);
      await makeFriend(+friendId, +userId);
    }

    return followingUser;
  } catch (error) {
    console.log("Follow error", error);
    return reply.send(error);
  }
}

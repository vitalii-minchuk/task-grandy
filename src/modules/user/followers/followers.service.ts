import { prisma } from "../../../utils/prisma";

export async function findUsersWithoutFollowings() {
  const users = prisma.user.findMany({
    select: {
      id: true,
      first_name: true,
    },
    where: {
      following: {
        none: {},
      },
    },
  });

  return users;
}

export async function findUsersWithMaxFollowings(top: number) {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          following: true,
        },
      },
    },
    orderBy: {
      following: { _count: "desc" },
    },
    take: top,
  });

  return users;
}

export async function follow(followerId: number, followingId: number) {
  const user = await prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
    select: {
      followingId: true,
    },
  });

  return user;
}

export async function makeFriend(userId: number, friendId: number) {
  const friend = await prisma.user.update({
    where: { id: userId },
    data: { friends: { connect: { id: friendId } } },
  });

  return friend;
}

export async function isMutual(userId: number, friendId: number) {
  const isFollower = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: friendId,
        followingId: userId,
      },
    },
  });

  return isFollower;
}

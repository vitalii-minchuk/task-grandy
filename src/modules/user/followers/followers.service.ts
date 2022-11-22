import prisma from "../../../utils/prisma";

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

export async function findFriends(userId: number) {
  const friends = prisma.user.findMany({
    where: {
      id: userId,
    },
  });

  return friends;
}

export async function follow(userId: number, friendId: number) {
  console.log(userId, friendId);
  const friend = await prisma.user.update({
    where: { id: userId },
    data: {
      friends: { create: friendId },
    },
    include: {
      friends: true,
    },
  });
  console.log(friend);
  return friend;
}

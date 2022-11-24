import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  { gender: "male", first_name: "John" },
  { gender: "male", first_name: "Steve" },
  { gender: "female", first_name: "Ann" },
  { gender: "female", first_name: "Julia" },
];

async function main() {
  await Promise.all(
    Array(196)
      .fill(null)
      .map(() => {
        const randomIndex = getRandomNumber(0, 3);
        return prisma.user.create({
          data: {
            first_name: data[randomIndex].first_name,
            gender: data[randomIndex].gender,
          },
        });
      })
  );

  const users = await prisma.user.findMany();
  const minId = users[0]?.id;
  const maxId = users[users.length - 1]?.id;

  await Promise.all(
    users.map((user) => {
      const numberOfFollowings = getRandomNumber(0, 149);
      const arrayOfFollowings = getArrayOfRandomIndexes(
        minId,
        maxId,
        numberOfFollowings,
        user.id
      );
      arrayOfFollowings.map(async (el) => {
        follow(user.id, el);
      });
    })
  );

  const usersWithFollowers = await prisma.user.findMany({
    select: { following: true, followedBy: true },
  });
  await Promise.all(
    usersWithFollowers.map((user) => {
      user.following.forEach((el) => {
        user.followedBy.forEach(async (item) => {
          if (el.followingId === item.followerId) {
            await Promise.all([
              makeFriend(+item.followerId, +item.followingId),
            ]);
          }
        });
      });
    })
  );

  await Promise.all(
    Array(4)
      .fill(null)
      .map(() => {
        const randomIndex = getRandomNumber(0, 3);
        return prisma.user.create({
          data: {
            first_name: data[randomIndex].first_name,
            gender: data[randomIndex].gender,
          },
        });
      })
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getArrayOfRandomIndexes(
  from: number,
  to: number,
  size: number,
  userId: number
): Array<number> {
  const arr: Array<number> = [];
  while (arr.length <= size) {
    let index = getRandomNumber(from, to);
    if (index !== userId && !arr.includes(index)) {
      arr.push(index);
    }
  }
  return arr;
}
async function follow(followerId: number, followingId: number) {
  await prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
  });
}
async function makeFriend(followerId: number, followingId: number) {
  await prisma.user.update({
    where: { id: followerId },
    data: { friends: { connect: { id: followingId } } },
  });
}
async function isMutual(userId: number, friendId: number) {
  const candidate = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: friendId,
        followingId: userId,
      },
    },
  });
  return candidate;
}

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
    Array(20)
      .fill(null)
      .map((el) => {
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
      const numberOfFollowings = getRandomNumber(0, 15);
      const arrayOfFollowings = getArrayOfRandomIndexes(
        minId,
        maxId,
        numberOfFollowings,
        user.id
      );

      arrayOfFollowings.map(async (el) => {
        await prisma.follows.create({
          data: {
            followerId: user.id,
            followingId: el,
          },
        });
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

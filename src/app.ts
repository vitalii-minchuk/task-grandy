import fastify from "fastify";

import userRoutes from "./modules/user/user.routes";

const server = fastify();
const port = 4004;

server.get("/healthcheck", async function () {
  return { status: "OK" };
});

async function main() {
  server.register(userRoutes, { prefix: "api/users" });

  try {
    await server.listen({ port: port, host: "0.0.0.0" });
    console.log(`Server is ready at port: ${port}`);
  } catch (error) {
    console.log("Start server error:", error);
    process.exit(1);
  }
}

main();

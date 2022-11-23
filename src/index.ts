import fastify from "fastify";

import followersRoutes from "./modules/user/followers/followers.routes";
import userRoutes from "./modules/user/user.routes";
import { userSchemas } from "./modules/user/user.schema";

const server = fastify();
const port = 4004;

server.get("/healthcheck", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });
  server.register(followersRoutes, { prefix: "/api" });

  try {
    await server.listen({ port: port, host: "0.0.0.0" });
    console.log(`Server is ready at port: ${port}`);
  } catch (error) {
    console.log("Start server error:", error);
    process.exit(1);
  }
}

main();

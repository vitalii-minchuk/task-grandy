import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteAllUsersHandler,
  deleteSingleUserHandler,
  getAllUsersHandler,
  getFriendsHandler,
  getSingleUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: { 201: $ref("createUserResponseSchema") },
      },
    },
    createUserHandler
  );

  server.get("/", getAllUsersHandler);

  server.get("/:id", getSingleUserHandler);

  server.delete("/", deleteAllUsersHandler);

  server.delete("/:id", deleteSingleUserHandler);

  server.get("/:id/friends", getFriendsHandler);
}

export default userRoutes;

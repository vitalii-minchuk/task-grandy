import { FastifyInstance } from "fastify";
import {
  followHandler,
  getMaxFollowingHandler,
  getNotFollowingHandler,
} from "./followers.controller";

async function followersRoutes(server: FastifyInstance) {
  server.get("/not-following", getNotFollowingHandler);

  server.get("/max-following/:top", getMaxFollowingHandler);

  server.put("/following", followHandler);
}

export default followersRoutes;

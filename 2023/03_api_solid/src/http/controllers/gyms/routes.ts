import { FastifyInstance } from "fastify";
import * as G from "./";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/search', G.search);
  app.get('/gyms/nearby', G.nearby);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, G.create);
}
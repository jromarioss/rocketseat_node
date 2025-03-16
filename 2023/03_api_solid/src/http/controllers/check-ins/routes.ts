import { FastifyInstance } from "fastify";
import * as G from ".";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkIns(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/check-ins/history', G.history);
  app.get('/check-ins/metrics', G.metrics);
  
  app.post('/gyms/:gymId/check-ins', G.create);
  app.get('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] }, G.validate);
}
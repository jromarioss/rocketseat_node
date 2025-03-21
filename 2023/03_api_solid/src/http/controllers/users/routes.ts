import { FastifyInstance } from "fastify";
import * as R from ".";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register-user', R.register);
  app.post('/sessions', R.authenticate);

  app.patch('/token/refresh', R.refresh);

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, R.profile);
}
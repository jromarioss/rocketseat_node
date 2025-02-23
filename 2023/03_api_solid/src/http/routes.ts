import { FastifyInstance } from "fastify";
import * as R from "./controllers";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post('/register-user', R.register);
  app.post('/sessions', R.authenticate);

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, R.profile);
}
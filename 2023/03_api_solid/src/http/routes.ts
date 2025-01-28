import { FastifyInstance } from "fastify";
import * as R from "./controllers";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', R.register);
  app.post('/sessions', R.authenticate);
  app.get('/me', R.profile);
}
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsCheckInUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await metricsCheckInUseCase.execute({ userId: request.user.sub });

  return reply.status(200).send(checkInsCount);
}
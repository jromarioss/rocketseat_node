import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const primaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(primaUsersRepository);
  
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error;
  }

  return reply.status(200).send();
}
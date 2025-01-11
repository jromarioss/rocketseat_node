import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";

export function makeAuthenticateUseCase() {
  const primaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(primaUsersRepository);
  return authenticateUseCase;
}
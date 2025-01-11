import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeRegisterUseCase() {
  const primaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(primaUsersRepository);
  return registerUseCase;
}
import { ValidateCheckInUseCase } from "../validate-check-in.ts";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const registerUseCase = new ValidateCheckInUseCase(checkInsRepository);
  return registerUseCase;
}
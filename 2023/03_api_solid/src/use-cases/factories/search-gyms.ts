import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const registerUseCase = new SearchGymsUseCase(gymsRepository);
  return registerUseCase;
}
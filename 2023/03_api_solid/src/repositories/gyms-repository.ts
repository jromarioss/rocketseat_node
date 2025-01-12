import { Prisma, Gym } from "@prisma/client";

export interface GymsRepository {
  //create(data: Prisma.UserCreateInput): Promise<Gym>;
  //findByEmail(email: string): Promise<Gym | null>;
  findById(id: string): Promise<Gym | null>;
}
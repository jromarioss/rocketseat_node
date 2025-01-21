import { prisma } from "../../lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { GymsRepository, IFetchNearbyParams } from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = await prisma.gym.create({ data });
    return gym;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: { title: { contains: query } },
      take: 10,
      skip: (page - 1) * 10
    });
    return gyms;
  }

  async fetchNearby({ latitude, longitude }: IFetchNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: { id }
    });

    return gym;
  }
}
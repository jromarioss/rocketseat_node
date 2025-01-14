import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      title: data.title,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym);

    return gym;
  }

  // async findByEmail(email: string) {
  //   const user = this.items.find(item => item.email === email);

  //   if (!user) {
  //     return null;
  //   }

  //   return user;
  // }

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
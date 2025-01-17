import { Prisma, Gym } from "@prisma/client";

export interface IFetchNearbyParams {
  userLatitude: number;
  userLongitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  fetchNearby(params: IFetchNearbyParams): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
}
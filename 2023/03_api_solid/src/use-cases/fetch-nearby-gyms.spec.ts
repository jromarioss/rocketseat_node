import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms UseCase", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymRepository.create({
      title: "Js-gym",
      description: "Academia top",
      phone: "15 99632-6585",
      latitude: -23.1761287,
      longitude: -47.7249961,
    });

    await gymRepository.create({
      title: "Ts-gym",
      description: "Academia top",
      phone: "15 99632-6585",
      latitude: -23.1734978,
      longitude: -47.7286967
    });

    await gymRepository.create({
      title: "Ts-gym-For",
      description: "Academia top",
      phone: "15 99632-6585",
      latitude: -22.8408618,
      longitude: -47.6822009,
    });

    const { gyms } = await sut.execute({ userLatitude: -23.1687112, userLongitude: -47.7262325 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Js-gym" }),
      expect.objectContaining({ title: "Ts-gym" }),
    ]);
  });
});
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gyms UseCase", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymRepository.create({
      title: "Js-gym",
      description: "Academia top",
      phone: "15 99632-6585",
      latitude: -23.1734203,
      longitude: -47.7228867,
    });

    await gymRepository.create({
      title: "Ts-gym",
      description: "Academia top",
      phone: "15 99632-6585",
      latitude: -23.1734203,
      longitude: -47.7228867,
    });

    const { gyms } = await sut.execute({ query: "Js-gym", page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Js-gym" })
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Ts-gym ${i}`,
        description: "Academia top",
        phone: "15 99632-6585",
        latitude: -23.1734203,
        longitude: -47.7228867,
      });
    }

    const { gyms } = await sut.execute({ query: "Ts-", page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Ts-gym 21" }),
      expect.objectContaining({ title: "Ts-gym 22" }),
    ]);
  });
});
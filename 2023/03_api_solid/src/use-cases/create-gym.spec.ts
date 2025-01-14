import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym UseCase", () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to register!", async () => {
    const { gym } = await sut.execute({
      title: "Gym JS",
      description: "Academia top",
      phone: "15 99632-6585",
      latitude: -23.1734203,
      longitude: -47.7228867,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
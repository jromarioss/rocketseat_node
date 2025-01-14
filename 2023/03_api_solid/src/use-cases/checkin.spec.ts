import { expect, describe, it, beforeEach, vi } from "vitest";
import { CheckinUseCase } from "./checkin";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckinUseCase;

describe("Check-in UseCase", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckinUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Gym JS",
      description: "Academia top",
      phone: "15 99632-6585",
      latitude: -23.1734203,
      longitude: -47.7228867,
    });

    vi.useFakeTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.1734203,
      userLongitude: -47.7228867,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.1734203,
      userLongitude: -47.7228867,
    });

    await expect(() => 
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.1734203,
        userLongitude: -47.7228867,
      }
    )).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.1734203,
      userLongitude: -47.7228867,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.1734203,
      userLongitude: -47.7228867,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "gym-JS-2",
      description: "Teste Js",
      phone: "15 99696-9696",
      latitude: new Decimal(-23.1733311),
      longitude: new Decimal(-47.7243498)
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -23.1734203,
        userLongitude: -47.7228867,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
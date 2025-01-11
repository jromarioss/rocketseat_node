import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "./errors/invalid-credentials-error";

describe("Authenticate UseCase", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "teste 01",
      email: "teste01@email.com",
      password_hash: await hash("123456", 6)
    });

    const { user } = await sut.execute({
      email: "teste01@email.com",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "teste02@email.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "teste 01",
      email: "teste01@email.com",
      password_hash: await hash("123456", 6)
    });

    await expect(() =>
      sut.execute({
        email: "teste02@email.com",
        password: "12345"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  }); 
});
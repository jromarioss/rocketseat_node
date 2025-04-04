import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a Answer", async () => { 
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1")
    }, new UniqueEntityId("answer-1"));

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toValue(),
      content: "New Content"
    });
  
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "New Content"
    });
  });

  it("should not be able to delete a answer from another user", async () => { 
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1")
    }, new UniqueEntityId("answer-1"));

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        authorId: "author-1",
        answerId: newAnswer.id.toValue(),
        content: "New Content"
      });
    });
  });
});
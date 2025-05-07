import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";
import { makeAnswerAttachments } from "test/factories/make-answer-attachments";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
    sut = new EditAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1")
    }, new UniqueEntityId("question-1"))

    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachments({ answerId: newAnswer.id, attachmentId: new UniqueEntityId("1") }),
      makeAnswerAttachments({ answerId: newAnswer.id, attachmentId: new UniqueEntityId("2") }),
    )

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "author-1",
      content: "Conteúdo teste",
      attachmentsIds: ["1", "3"]
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({ content: "Conteúdo teste"});
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityId("3") }),
    ]);
  });

  it("should not be able to edit a answer from another user", async () => { 
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-1")
    }, new UniqueEntityId("answer-1"));

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "author-2",
      answerId: newAnswer.id.toValue(),
      content: "New Content",
      attachmentsIds: []
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
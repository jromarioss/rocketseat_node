import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => { 
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("author-1")
    }, new UniqueEntityId("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: newQuestion.id.toValue(),
      title: "New Title",
      content: "New Content"
    });
  
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "New Title",
      content: "New Content"
    });
  });

  it("should not be able to delete a question from another user", async () => { 
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("author-1")
    }, new UniqueEntityId("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        authorId: "author-1",
        questionId: newQuestion.id.toValue(),
        title: "New Title",
        content: "New Content"
      });
    });
  });
});
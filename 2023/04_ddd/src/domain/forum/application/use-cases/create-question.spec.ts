import { expect, test } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { CreateQuestionUseCase } from "./create-question";
import { Question } from "../../enterprise/entities/question";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {
    return;
  }
};

test("create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Nova question",
    content: "Question content"
  });

  expect(question.id).toBeTruthy();
});
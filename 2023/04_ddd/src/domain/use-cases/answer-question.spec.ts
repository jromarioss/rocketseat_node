import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  }
};

test("create an answer", async () => {
  const ansQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await ansQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Nova resposta"
  });

  expect(answer.content).toEqual("Nova resposta");
});
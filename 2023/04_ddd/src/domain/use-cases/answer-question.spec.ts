import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const ansQuestion = new AnswerQuestionUseCase();

  const answer = ansQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Nova resposta"
  });

  expect(answer.content).toEqual("Nova resposta");
});
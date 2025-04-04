import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
  findById(answerId: string): Promise<Answer | null>;
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  save(question: Answer): Promise<void>;
}
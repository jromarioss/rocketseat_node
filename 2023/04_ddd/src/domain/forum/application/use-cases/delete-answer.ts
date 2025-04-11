import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";

export interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<string, {}>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left("Answer not found.");
    if (authorId !== answer.authorId.toString()) return left("Not allowed.");

    await this.answersRepository.delete(answer);

    return right({});
  }
}
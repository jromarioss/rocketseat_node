import { AnswersRepository } from "../repositories/answers-repository";

export interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

export interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ authorId, answerId, content }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const Answer = await this.answersRepository.findById(answerId);

    if (!Answer) throw new Error("Answer not found.");
    if (authorId !== Answer.authorId.toString()) throw new Error("Not allowed.");

    Answer.content = content;

    await this.answersRepository.save(Answer);

    return {};
  }
}
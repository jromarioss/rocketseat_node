import { AnswersRepository } from "../repositories/answers-repository";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

export interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({ answerId, authorId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);
    if (!answer) throw new Error("Answer not found.");

    const question = await this.questionsRepository.findById(answer.questionId.toValue());
    if (!question) throw new Error("Question not found.");

    if (authorId !== question.authorId.toString()) throw new Error("Not allowed.");

    question.bestAnswerId = answer.id;
    await this.questionsRepository.save(question);

    return { question };
  }
}
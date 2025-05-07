import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerCommentProps, AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(override: Partial<AnswerCommentProps> = {}, id?: UniqueEntityId) {
  const questionComment = AnswerComment.create({
    authorId: new UniqueEntityId(),
    answerId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override,
  }, id);

  return questionComment;
}
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityId) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    slug: Slug.createFromText("example-question"),
    title: "Example question",
    content: "Example content",
    ...override
  });

  return question;
}
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { faker } from "@faker-js/faker";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityId) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    slug: Slug.createFromText("example-question"),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    ...override
  }, id);

  return question;
}
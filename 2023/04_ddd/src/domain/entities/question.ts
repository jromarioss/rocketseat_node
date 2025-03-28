import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  attachments: any;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {

}
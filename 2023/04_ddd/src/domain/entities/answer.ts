import { Entity } from "../../core/entities/entity";

interface AnswerProps {
  content: string;
  authorId: string;
  questionid: string;
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }
}
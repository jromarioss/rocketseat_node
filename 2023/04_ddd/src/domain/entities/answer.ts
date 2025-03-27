import { randomUUID } from "node:crypto";

interface AnswerProps {
  content: string;
  authorId: string;
  questionid: string;
}

export class Answer {
  public id: string;
  public content: string;
  public authorId: string;
  public questionid: string;

  constructor(props: AnswerProps, id?: string) {
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionid = props.questionid;
    this.id = id ?? randomUUID();
  }
}
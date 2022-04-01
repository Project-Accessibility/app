import { QuestionOption } from './QuestionOption';

export class Question {
  id: number;
  title: string;
  question: string;
  questionOptions?: [QuestionOption];

  constructor(id: number, title: string, question: string, questionOptions?: [QuestionOption]) {
    this.id = id;
    this.title = title;
    this.question = question;
    this.questionOptions = questionOptions;
  }
}

import { QuestionOption } from './QuestionOption';

export class Question {
  id: number;
  uuid: string;
  version: number;
  section_id: number;
  title: string;
  question: string;
  questionOptions?: [QuestionOption];

  constructor(id: number, uuid: string, version: number, section_id: number, title: string, question: string, questionOptions?: [QuestionOption]) {
    this.id = id;
    this.uuid = uuid;
    this.version = version;
    this.section_id = section_id;
    this.title = title;
    this.question = question;
    this.questionOptions = questionOptions;
  }
}

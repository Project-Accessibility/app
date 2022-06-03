import { QuestionOption } from './QuestionOption';

export class Question {
  id: number;
  uuid: string;
  version: number;
  section_id: number;
  title: string;
  question: string;
  options?: QuestionOption[];

  constructor(
    id: number,
    uuid: string,
    version: number,
    section_id: number,
    title: string,
    question: string,
    options?: QuestionOption[]
  ) {
    this.id = id;
    this.uuid = uuid;
    this.version = version;
    this.section_id = section_id;
    this.title = title;
    this.question = question;
    this.options = options;
  }
}

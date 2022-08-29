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

  static isAnswered(question: Question): boolean {
    return question.options !== null && question.options?.length
      ? question.options.filter((option: QuestionOption) => {
          return QuestionOption.isAnswered(option);
        }).length > 0
      : false;
  }
}

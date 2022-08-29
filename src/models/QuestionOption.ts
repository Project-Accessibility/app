import { QuestionOptionType } from '../enums/QuestionOptionType';
import Answer from './Answer';

export class QuestionOption {
  id: number;
  type: QuestionOptionType;
  extra_data: any;
  answer?: Answer;

  constructor(id: number, type: QuestionOptionType, extra_data: any, answer?: Answer) {
    this.id = id;
    this.type = type;
    this.extra_data = extra_data;
    this.answer = answer;
  }

  static isAnswered(option: QuestionOption): boolean {
    return (option.answer && Answer.hasValue(option.answer)) ?? false;
  }
}

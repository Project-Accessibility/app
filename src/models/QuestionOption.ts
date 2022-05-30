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
}

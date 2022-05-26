import { QuestionOptionType } from '../enums/QuestionOptionType';
import Answer from './Answer';

export class QuestionOption {
  id: number;
  type: QuestionOptionType;
  extraData: any;
  answer?: Answer;

  constructor(id: number, type: QuestionOptionType, extraData: any, answer?: Answer) {
    this.id = id;
    this.type = type;
    this.extraData = extraData;
    this.answer = answer;
  }
}

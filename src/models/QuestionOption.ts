import { QuestionOptionType } from '../enums/QuestionOptionType';
import { Question } from './Question';

export class QuestionOption {
  id: number;
  question: Question;
  type: QuestionOptionType;
  extraData?: JSON;

  constructor(id: number, question: Question, type: QuestionOptionType, extraData?: JSON) {
    this.id = id;
    this.question = question;
    this.type = type;
    this.extraData = extraData;
  }
}

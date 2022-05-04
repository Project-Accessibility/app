import { QuestionOptionType } from '../enums/QuestionOptionType';
import { Answer } from './Answer';

export class QuestionOption {
  id: number;
  type: QuestionOptionType;
  extraData?: object;
  answers?: [Answer];

  constructor(id: number, type: QuestionOptionType, extraData?: object, answers?: [Answer]) {
    this.id = id;
    this.type = type;
    this.extraData = extraData;
    this.answers = answers;
  }
}

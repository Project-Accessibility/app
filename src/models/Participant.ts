import { Questionnaire } from './Questionnaire';

export class Participant {
  id: number;
  questionaire: Questionnaire;
  code: string;
  finished: boolean;

  constructor(id: number, questionaire: Questionnaire, code: string, finished: boolean) {
    this.id = id;
    this.questionaire = questionaire;
    this.code = code;
    this.finished = finished;
  }
}

import { Participant } from './Participant';
import { QuestionOption } from './QuestionOption';

export class Answer {
  id: number;
  participant: Participant;
  questionOption: QuestionOption;
  answer?: JSON;
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    id: number,
    participant: Participant,
    questionOption: QuestionOption,
    createdAt: Date,
    answer?: JSON,
    updatedAt?: Date
  ) {
    this.id = id;
    this.participant = participant;
    this.questionOption = questionOption;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class Answer {
  id: number;
  answer?: [string];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(id: number, answer?: [string], createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // hasAnswer() {
  //   return this.answer !== undefined && this.answer !== "";
  // }
}

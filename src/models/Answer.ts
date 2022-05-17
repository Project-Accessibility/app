export default class Answer {
  id: number;
  answer?: object;
  createdAt: Date;
  updatedAt?: Date;

  constructor(id: number, createdAt: Date, answer?: object, updatedAt?: Date) {
    this.id = id;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

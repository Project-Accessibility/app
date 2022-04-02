export class Answer {
  id: number;
  answer?: JSON;
  createdAt: Date;
  updatedAt?: Date;

  constructor(id: number, createdAt: Date, answer?: JSON, updatedAt?: Date) {
    this.id = id;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

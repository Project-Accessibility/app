export class Answer {
  id: number;
  answer?: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(id: number, createdAt: Date, answer?: string, updatedAt?: Date) {
    this.id = id;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

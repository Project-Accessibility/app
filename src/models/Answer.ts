export default class Answer {
  id: number;
  values?: any[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(id: number, values?: any[], createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.values = values;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

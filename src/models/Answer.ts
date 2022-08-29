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

  static hasValue(answer: Answer): boolean {
    return (
      answer.values !== undefined &&
      answer.values!.length > 0 &&
      answer.values!.filter((value) => value !== null && value !== '').length > 0
    );
  }
}

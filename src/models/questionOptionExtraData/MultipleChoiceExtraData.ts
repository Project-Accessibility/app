export class MultipleChoiceExtraData {
  multiple: boolean;
  values: string[];

  constructor(multiple: boolean, values: string[]) {
    this.multiple = multiple;
    this.values = values;
  }
}

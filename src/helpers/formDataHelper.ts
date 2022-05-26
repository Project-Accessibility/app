import { QuestionOptionType } from '../enums/QuestionOptionType';
import { Question } from '../models/Question';

export function generateFormDataByQuestion(question: Question): FormData {
  const formData = new FormData();
  question.options?.forEach((option) => {
    if (option.answer) {
      formData.append(
        getFormDataKey(option.type),
        getFormDataValue(option.type, option.answer.values)
      );
    }
  });
  return formData;
}

function getFormDataKey(type: QuestionOptionType): string {
  switch (type) {
    case QuestionOptionType.IMAGE || QuestionOptionType.VIDEO || QuestionOptionType.VOICE:
      return `${type.toUpperCase()}[]`;
    default:
      return type.toUpperCase();
  }
}

function getFormDataValue(
  type: QuestionOptionType,
  values: any[] = []
): string[] | number[] | string | number {
  switch (type) {
    case QuestionOptionType.MULTIPLE_CHOICE:
      return JSON.stringify(values);
    default:
      return values[0];
  }
}

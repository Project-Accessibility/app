import { QuestionOptionType } from '../enums/QuestionOptionType';
import { Question } from '../models/Question';

export function generateFormDataByQuestion(question: Question): FormData {
  const formData = new FormData();
  formData.append('question', question);
  question.questionOptions?.forEach((questionOption) => {
    if (questionOption.answer) {
      formData.append(getFormDataKey(questionOption.type), questionOption.answer.values);
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

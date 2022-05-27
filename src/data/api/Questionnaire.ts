import { Question } from '../../models/Question';
import { Questionnaire } from '../../models/Questionnaire';
import { apiEndpoints } from '../routes.json';
import * as ApiRequest from './ApiRequest';
import { generateFormDataByQuestion } from '../../helpers/formDataHelper';

async function getAllQuestionnaireDataByCode(code: string): Promise<Questionnaire | null> {
  let response = await ApiRequest.getRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getAllQuestionnaireDataByCode,
    { code: code }
  );

  return response ? (response.data as Questionnaire) : null;
}

async function saveQuestionnaireByCode(code: string, questionnaire: Questionnaire) {
  const formData = new FormData();
  formData.append('questionnaire', questionnaire);
  const response = await ApiRequest.postRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.saveQuestionnaireByCode,
    { code: code },
    formData
  );

  return response ? response.json() : null;
}

async function saveQuestionByIdAndCode(code: string, question: Question) {
  const response = await ApiRequest.postRequest(
    apiEndpoints.questions.base_endpoint,
    apiEndpoints.questions.saveQuestionByIdAndCode,
    { code: code, questionId: question.id },
    generateFormDataByQuestion(question)
  );

  return response ? response.json() : null;
}

export { getAllQuestionnaireDataByCode, saveQuestionByIdAndCode, saveQuestionnaireByCode };

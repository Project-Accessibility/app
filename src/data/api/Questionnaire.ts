import { Question } from '../../models/Question';
import { Questionnaire } from '../../models/Questionnaire';
import { apiEndpoints } from '../routes.json';
import * as ApiRequest from './ApiRequest';
import { generateFormDataByQuestion } from '../../helpers/formDataHelper';

async function getQuestionnairesByCodes(codes: string[]): Promise<Questionnaire[]> {
  const response = await ApiRequest.postRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getQuestionnaireById,
    {},
    { codes: codes }
  );
  return response.data;
}

async function getAllQuestionnaireDataByCode(code: string): Promise<Questionnaire> {
  const response = await ApiRequest.getRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getAllQuestionnaireDataByCode,
    { code: code }
  );
  return response.data;
}

async function saveQuestionnaireByCode(code: string, questionnaire: Questionnaire) {
  const response = await ApiRequest.postRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.saveQuestionnaireByCode,
    { code: code },
    questionnaire
  );
  return response.data;
}

async function getQuestionByIdAndCode(code: string, questionId: number): Promise<Question> {
  const response = await ApiRequest.getRequest(
    apiEndpoints.questions.base_endpoint,
    apiEndpoints.questions.getQuestionByIdAndCode,
    { code: code, questionId: questionId }
  );
  const data = response.data;
  data.participantCode = code;
  return data;
}

async function saveQuestionByIdAndCode(code: string, question: Question) {
  const response = await ApiRequest.postRequest(
    apiEndpoints.questions.base_endpoint,
    apiEndpoints.questions.saveQuestionByIdAndCode,
    { code: code, questionId: question.id },
    generateFormDataByQuestion(question)
  );
  return response.data;
}

export {
  getQuestionnairesByCodes,
  getAllQuestionnaireDataByCode,
  saveQuestionByIdAndCode,
  saveQuestionnaireByCode,
  getQuestionByIdAndCode,
};

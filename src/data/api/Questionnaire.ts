import { Questionnaire } from '../../models/Questionnaire';
import { apiEndpoints } from '../routes.json';
import * as ApiRequest from './ApiRequest';

async function getQuestionnairesByCodes(codes: string[]): Promise<Questionnaire[]> {
  const response = await ApiRequest.getRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getQuestionnaireById,
    {},
    { codes: codes }
  );
  return response.data;
}

async function getAllQuestionnaireDataByCode(code: string) {
  const response = await ApiRequest.getRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getAllQuestionnaireDataByCode,
    { code: code }
  );
  return response.data;
}

export { getQuestionnairesByCodes, getAllQuestionnaireDataByCode };

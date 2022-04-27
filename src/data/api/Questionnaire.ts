import { Questionnaire } from '../../models/Questionnaire';
import { apiEndpoints } from '../routes.json';
import * as ApiRequest from './ApiRequest';

async function getQuestionnairesByCodes(codes: string[]): Promise<Questionnaire[]> {
  const response = await ApiRequest.getRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getQuestionnaireById,
    { codes: codes }
  );
  return response.data;
}

export { getQuestionnairesByCodes };

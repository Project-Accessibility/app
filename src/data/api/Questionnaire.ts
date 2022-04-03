import { Questionnaire } from '../../models/Questionnaire';
import { apiEndpoints } from '../routes.json';
import * as ApiRequest from './ApiRequest';

async function getQuestionnaireById(id: String): Promise<Questionnaire> {
  const response = await ApiRequest.getRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getQuestionnaireById,
    { id: id }
  );
  return response.data;
}

export { getQuestionnaireById };

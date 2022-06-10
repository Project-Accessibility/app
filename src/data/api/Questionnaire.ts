import { Question } from '../../models/Question';
import { Questionnaire } from '../../models/Questionnaire';
import { apiEndpoints } from '../routes.json';
import * as ApiRequest from './ApiRequest';
import { generateFormDataByQuestion } from '../../helpers/formDataHelper';

async function getAllQuestionnaireDataByCode(code: string): Promise<Questionnaire | string> {
  let response = await ApiRequest.getRequest(
    apiEndpoints.questionnaire.base_endpoint,
    apiEndpoints.questionnaire.getAllQuestionnaireDataByCode,
    { code: code }
  );

  // noinspection SuspiciousTypeOfGuard
  if (typeof response == "number" && response == 404){
    return `${response}`;
  }

  return response ? (response.data as Questionnaire) : "";
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
  if (response) {
    response
      .json()
      .catch((e) => {
        console.log('Error while trying to decode json', e);
        return null;
      })
      .then((data) => {
        return data;
      });
  }
  return null;
}

export { getAllQuestionnaireDataByCode, saveQuestionByIdAndCode, saveQuestionnaireByCode };

import axios from 'axios';
import Mustache from 'mustache';
import ActiveApiEndpoint from '../activeApiEndpoint';
import { apiEndpoints } from '../routes.json';
import { api } from '../consts.json';

async function getSurveyById(id: String): Promise<any> {
  const formattedEndpoint = Mustache.render(apiEndpoints.survey.getSurveyById, { id: id });
  const response = await axios.get(
    `${ActiveApiEndpoint()}/${apiEndpoints.survey.base_endpoint}/${formattedEndpoint}`,
    { headers: { [api.headers.authKey.key]: api.headers.authKey.value } }
  );
  return response.data;
}

export { getSurveyById };

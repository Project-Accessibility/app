import axios, { AxiosResponse } from 'axios';
import Mustache from 'mustache';
import ActiveApiEndpoint from '../ActiveApiEndpoint';
import Config from 'react-native-config';
import { api } from '../consts.json';
import { IApiResponse } from './IApiResponse';

async function getRequest(
  baseEndpoint: string,
  endpoint: string,
  endpointParams: Object = {},
  body: Object | undefined = undefined
): Promise<AxiosResponse> {
  const formattedEndpoint = Mustache.render(endpoint, endpointParams);
  return axios
    .get(`${ActiveApiEndpoint()}/${baseEndpoint}/${formattedEndpoint}`, {
      headers: {
        [api.headers.authKey.key]: Config.API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 30000,
      data: body,
    })
    .then((response) => {
      console.log(`getRequest: ${response}`);
      return response;
    })
    .catch((error) => {
      throw JSON.stringify(error, null, 2);
    });
}

async function postRequest(
  baseEndpoint: string,
  endpoint: string,
  endpointParams: Object = {},
  postData: FormData
): Promise<Response | null> {
  const formattedEndpoint = Mustache.render(endpoint, endpointParams);
  const headers = {
    [api.headers.authKey.key]: Config.API_KEY,
    'Content-Type': `multipart/form-data`,
    Accept: 'application/json',
  };

  return await fetch(`${ActiveApiEndpoint()}/${baseEndpoint}/${formattedEndpoint}`, {
    method: 'post',
    headers,
    body: postData,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log('Error with posting data: ' + error);
      return null;
    });
}

export { getRequest, postRequest };

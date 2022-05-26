import axios, { AxiosResponse } from 'axios';
import Mustache from 'mustache';
import ActiveApiEndpoint from '../ActiveApiEndpoint';
import Config from 'react-native-config';
import { api } from '../consts.json';

function getRequest(
  baseEndpoint: string,
  endpoint: string,
  endpointParams: Object = {},
  body: Object = {}
): Promise<AxiosResponse> {
  const formattedEndpoint = Mustache.render(endpoint, endpointParams);
  return axios.get(`${ActiveApiEndpoint()}/${baseEndpoint}/${formattedEndpoint}`, {
    headers: {
      [api.headers.authKey.key]: Config.API_KEY,
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

async function postRequest(
  baseEndpoint: string,
  endpoint: string,
  endpointParams: Object = {},
  postData: FormData
): Promise<Response> {
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
  });
}

export { getRequest, postRequest };

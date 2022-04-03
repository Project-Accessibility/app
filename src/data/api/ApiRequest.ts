import axios, { AxiosResponse } from 'axios';
import Mustache from 'mustache';
import ActiveApiEndpoint from '../ActiveApiEndpoint';
import Config from 'react-native-config';
import { api } from '../consts.json';

function getRequest(
  baseEndpoint: string,
  endpoint: string,
  endpointParams: Object = {}
): Promise<AxiosResponse> {
  const formattedEndpoint = Mustache.render(endpoint, endpointParams);
  return axios.get(`${ActiveApiEndpoint()}/${baseEndpoint}/${formattedEndpoint}`, {
    headers: { [api.headers.authKey.key]: Config.API_KEY },
  });
}

function postRequest(
  baseEndpoint: string,
  endpoint: string,
  endpointParams: Object = {},
  postData: Object
): Promise<AxiosResponse> {
  const formattedEndpoint = Mustache.render(endpoint, endpointParams);
  return axios.post(`${ActiveApiEndpoint()}/${baseEndpoint}/${formattedEndpoint}`, postData, {
    headers: { [api.headers.authKey.key]: Config.API_KEY },
  });
}

export { getRequest, postRequest };

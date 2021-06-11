import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import {ApiConfigs} from './apis';

export const instanceApiService: AxiosInstance = axios.create(ApiConfigs);

instanceApiService.interceptors.request.use(function (config) {
  axios.defaults.headers.common.Authorization = '';
  return config;
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.log('=================================');
  console.log(`Call API Request: ${config.url}`, config);
  console.log('================================= ');
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log('=================================');
  console.log(`Call API Response: ${response.config.url}`, response);
  console.log('================================= ');
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

instanceApiService.interceptors.request.use(onRequest, onRequestError);
instanceApiService.interceptors.response.use(onResponse, onResponseError);

import {API_URL, instanceApiService} from '@config';

export const getPost = async () => {
  return await instanceApiService.get(API_URL.APP.GET_POST);
};

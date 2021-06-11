export const ApiConfigs = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    timeout: 15000,
  },
  timeout: 15000,
};

export const API_URL = {
  AUTHEN: {
    REGISTER: '/api/app/accounts/register',
    LOGIN: '/api/token-auth/authenticate',
    REFRESH_TOKEN: '/api/token-auth/refresh-token',
    LOGOUT: '/api​/token-auth​/log-out',
  },
  APP: {
    GET_POST: '/posts/1',
  },
};

export const API_CODE = {
  SUCCESS: {
    CODE: 200,
    MESSAGE: 'Oke',
  },
};
export const API_ERROR_CODE = {
  UPLOAD_EXCEED: {
    CODE: 413,
    MESSAGE: 'The file is too big !',
  },
  REQUEST_ERROR: {
    CODE: 400,
    MESSAGE: 'api_request_error',
  },
  INTENER_SERVER_ERROR: {
    CODE: 500,
    MESSAGE: 'Cannot connect to server. Try Again later!',
  },
  AUTHENTICATE: {
    CODE: 401,
    MESSAGE: 'Your session has expired please login again',
  },
  VAILDATE: {
    CODE: 422,
    MESSAGE: 'Something went wrong. Try Again later!', //"api_request_validate"
  },
  VAILDATE_LOGIN: {
    CODE: 409,
    MESSAGE: 'Something went wrong. Try Again later!', // "api_request_validate"
  },
  SERVER_DATA_ERROR: {
    CODE: 404,
    MESSAGE: 'Something went wrong. Try Again later!',
  },
};

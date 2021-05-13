export enum APP_SCREEN {
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',

  AUTHORIZE = 'AUTHORIZE',
  HOME = 'HOME',
}

export type UnAuthorizeParamsList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
};
export type AuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined;
};
export type RootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: UnAuthorizeParamsList;

  [APP_SCREEN.AUTHORIZE]: UnAuthorizeParamsList;
};

import {combineReducers} from '@reduxjs/toolkit';

import {loginReducer} from '../features/unAuthentication/Login/redux/reducer';

import {appReducer} from './app_redux/reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  loginReducer: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

import {combineReducers} from '@reduxjs/toolkit';

import {appReducer} from './app_redux/reducer';

export const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

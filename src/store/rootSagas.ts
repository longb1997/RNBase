import {loginSaga} from '@features';
import {all} from 'redux-saga/effects';

// import {appSaga} from './app_saga/index';

export const rootSaga = function* rootSaga() {
  yield all([loginSaga()]);
};

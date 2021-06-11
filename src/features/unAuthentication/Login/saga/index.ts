import {takeLatest} from 'redux-saga/effects';

import {actions} from '../redux/reducer';

import * as Saga from './saga';
export function* loginSaga() {
  console.log('actions.onLogin.type', actions.onLogin.type);
  yield takeLatest(actions.onLogin.type, Saga.onLogin);
}

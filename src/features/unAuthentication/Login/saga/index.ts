import {takeEvery, takeLatest} from 'redux-saga/effects';

import {actions} from '../redux/reducer';

import * as Saga from './saga';
export function* loginSaga() {
  yield takeLatest(actions.onLogin.type, Saga.onLogin);
}

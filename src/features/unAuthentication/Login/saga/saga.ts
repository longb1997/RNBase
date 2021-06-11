import {call, put} from 'redux-saga/effects';
import {Action} from 'redux';
import {getPost} from '@services';

import {actions} from '../redux/reducer';

export function* onLogin(action: Action): any {
  const res: any = yield call(getPost);
  yield put(actions.onLogin(res));
  console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*onLogin ~ res', res);
}

import {call, put} from 'redux-saga/effects';
import {Action} from 'redux';
import {getPost} from '@services';

import {actions} from '../redux/reducer';

export function* onLogin(action: Action): any {
  // const res: any = yield call(getPost);
  // yield put(actions.onLogin({a: 'login'}));
  yield console.log('on Login');
}

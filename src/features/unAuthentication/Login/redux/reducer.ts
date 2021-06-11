import {SLICE_NAME} from '@config';
import {createAction, createSlice} from '@reduxjs/toolkit';

import * as Action from './actionTypes';

export interface ILoginState {
  loading: boolean;
  count: number;
}

const initialState: ILoginState = {
  loading: false,
  count: 0,
};

const loginSlice = createSlice({
  name: SLICE_NAME.AUTH,
  initialState: initialState,
  reducers: {
    reset: () => {
      return {...initialState};
    },
    onStart: () => {
      ///TODO
    },
  },
});
const onLogin = createAction(Action.LOGIN, (data: any) => {
  console.log('🚀 ~ file: reducer.ts ~ line 29 ~ onLogin ~ data', data);
  return {
    payload: data,
  };
});

export const actions = {...loginSlice.actions, onLogin};
export const loginReducer = loginSlice.reducer;

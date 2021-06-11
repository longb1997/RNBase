import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppState} from './type';
export enum SLICE_NAME {
  APP = 'APP',
  AUTH = 'AUTH',
}

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: null,
  /**
   * default true to load app
   */
  loading: false,
  showDialog: false,
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    onSetInternet: (state, {payload}: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    onSetToken: (state, {payload}: PayloadAction<string>) => {
      state.token = payload;
    },
    onSetAppProfile: (state, {payload}: PayloadAction<any>) => {
      state.profile = payload;
    },
    onLoadApp: state => {
      state.loading = true;
    },
    onLoadAppEnd: state => {
      state.loading = false;
    },
    onStartProcess: state => {
      state.showDialog = true;
    },
    onEndProcess: state => {
      state.showDialog = false;
    },
    onLogout: state => {
      state.token = null;
      state.profile = {};
    },
  },
});
export const appReducer = appSlice.reducer;
export const {
  onLogout,
  onStartProcess,
  onEndProcess,
  onLoadApp,
  onLoadAppEnd,
  onSetAppProfile,
  onSetInternet,
  onSetToken,
} = appSlice.actions;

import createSagaMiddleware from 'redux-saga';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {rootReducer} from './rootReducer';
import {rootSaga} from './rootSagas';

const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading'], // navigation will not be persisted
};

const middleware = [
  ...getDefaultMiddleware({serializableCheck: false}),
  sagaMiddleware,
];
if (devMode) {
  middleware.push(logger);
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeConfig = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: devMode,
    middleware,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
// Redux persist

export const store = storeConfig();
export const persistor = persistStore(store);

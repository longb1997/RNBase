/* eslint-disable @typescript-eslint/no-empty-function */
import {AppContainer} from '@navigations';
import {persistor, store} from '@store';
import React, {Suspense} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
// eslint-disable-next-line import/order
import {PersistGate} from 'redux-persist/integration/react';

// console.disableYellowBox = true;

import i18next, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('es'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: true,
    resources: {
      es: {
        translation: require('./src/assets/locales/es/string.json'),
      },
    },
  });

export const MyApp = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<View />}>
            <AppContainer />
          </Suspense>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

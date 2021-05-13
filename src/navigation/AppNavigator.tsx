// import { ModalLoading } from '@components';
// import {showLoading, stopLoad} from '@loading/actions';
import {NavigationContainer} from '@react-navigation/native';
import {RootState} from '@store';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {useSelector} from 'react-redux';

import {navigationRef} from './refNavigator';
import {RootNavigation} from './RootNavigator';

function App() {
  const {token} = useSelector((x: RootState) => x.app);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigation token={token} />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export const AppContainer = React.memo(App);

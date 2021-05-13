import {Login, SignUp} from '@features';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';

import {APP_SCREEN} from '../screenTypes';

const Stack = createStackNavigator();
export const UnAuthentication = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name={APP_SCREEN.LOGIN} component={Login} />
      <Stack.Screen
        name={APP_SCREEN.REGISTER}
        component={SignUp}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
    </Stack.Navigator>
  );
};

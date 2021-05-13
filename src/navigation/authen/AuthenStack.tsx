import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '@features';

import {APP_SCREEN} from '../screenTypes';

const MainDrawer = createStackNavigator();

export const MainDrawerScreen = () => (
  <MainDrawer.Navigator>
    <MainDrawer.Screen name={APP_SCREEN.HOME} component={Home} />
  </MainDrawer.Navigator>
);

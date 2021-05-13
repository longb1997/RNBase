/* eslint-disable react-hooks/rules-of-hooks */
import {
  NavigationContainerRef,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.useRef<NavigationContainerRef>(null);

function navigate(name: any, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function push(name: any, params: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

function goBack() {
  navigationRef.current?.goBack();
}

function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

function replace(name: any, params: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

function jumpTo(name: any, params: any) {
  navigationRef.current?.dispatch(TabActions.jumpTo(name, params));
}

export const NavigationService = {
  navigate,
  push,
  replace,
  goBack,
  jumpTo,
  popToTop,
};

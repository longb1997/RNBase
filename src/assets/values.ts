import {Dimensions, Platform, NativeModules} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Device = {
  width,
  height: height,
  isIos: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};

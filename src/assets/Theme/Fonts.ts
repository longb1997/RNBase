/* eslint-disable camelcase */
import {StyleSheet} from 'react-native';

import {Device} from '../values';

export const FontWithBold = StyleSheet.create({
  Bold_300: {
    fontWeight: '300',
    fontFamily: Device.isIos ? 'Nunito' : 'Nunito-Light',
  },
  Bold_400: {
    fontWeight: '400',
    fontFamily: Device.isIos ? 'Nunito' : 'Nunito-Medium',
  },
  Bold_500: {
    fontWeight: '500',
    fontFamily: Device.isIos ? 'Nunito' : 'Nunito-Medium',
  },
  Bold_600: {
    fontWeight: '600',
    fontFamily: Device.isIos ? 'Nunito' : 'Nunito-Bold',
  },
  Bold_700: {
    fontWeight: '700',
    fontFamily: Device.isIos ? 'Nunito' : 'Nunito-Bold',
  },
  Bold_800: {
    fontWeight: '800',
    fontFamily: Device.isIos ? 'Nunito' : 'Nunito-Black',
  },
  Bold_900: {
    fontWeight: '900',
    fontFamily: Device.isIos ? 'Nunito' : 'Nunito-Black',
  },
});

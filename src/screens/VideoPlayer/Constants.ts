import {Device} from '@src/utils';
import {moderateScale} from 'react-native-size-matters';

//padding orientation LANDSCAPE
export const PADDING_O_L = Device.statusBar();
//padding orientation PORTRAIT
export const PADDING_O_P = moderateScale(16);

export const PIP_WIDTH = Device.S_WIDTH * 0.6;
export const PIP_HEIGHT = Device.S_HEIGHT * 0.2;

export type SliderEvents = 'onStartSliding' | 'onUpdateValue' | 'onEndSliding';
export type UIEvents = 'onChromecastDevices';

export type AllEvents = SliderEvents | UIEvents;

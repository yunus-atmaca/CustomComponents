import {Device} from '@src/utils';
import {moderateScale} from 'react-native-size-matters';

//padding orientation LANDSCAPE
export const PADDING_O_L = Device.statusBar();
//padding orientation PORTRAIT
export const PADDING_O_P = moderateScale(16);

export const PIP_WIDTH = Device.S_WIDTH * 0.55;
export const PIP_HEIGHT = Device.S_HEIGHT * 0.3;

export type EventTypes = 'inAppPIPMode';

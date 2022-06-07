import {Device} from '@src/utils';
import {moderateScale} from 'react-native-size-matters';

//padding orientation LANDSCAPE
const PADDING_O_L = Device.statusBar();
//padding orientation PORTRAIT
const PADDING_O_P = moderateScale(16);

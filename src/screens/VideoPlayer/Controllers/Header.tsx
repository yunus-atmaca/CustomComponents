import React, {FC, useCallback} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';

import {Colors} from '@src/res';
import {Device} from '@src/utils';
import {useAppDispatch} from '@src/hooks/store';
import {
  setVideoPlayer,
  defaultValues,
} from '@src/store/controllers/videoPlayer';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
};

const Header: FC<Props> = ({orientation}) => {
  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    Orientation.lockToPortrait();
    dispatch(setVideoPlayer(defaultValues));
    Device.fullScreen(false);
  }, [dispatch]);

  const onInAppPipMode = useCallback(() => {
    Orientation.lockToPortrait();
    Device.fullScreen(false);

    setTimeout(() => {
      dispatch(setVideoPlayer({appPipMode: true, orientation: 'PORTRAIT'}));
    }, 50);
  }, [dispatch]);

  return (
    <View
      style={[
        styles.container,
        {
          marginHorizontal:
            orientation === 'LANDSCAPE'
              ? Device.statusBar()
              : moderateScale(16),
          marginTop:
            orientation === 'LANDSCAPE'
              ? moderateScale(16)
              : Device.statusBar(),
        },
      ]}>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.7}
        style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/imgs/close.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onInAppPipMode}
        activeOpacity={0.7}
        style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/imgs/pip.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconContainer: {
    width: '48@ms',
    height: '48@ms',
    backgroundColor: Colors.white06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  icon: {
    width: '24@ms',
    height: '24@ms',
  },
});

export default Header;

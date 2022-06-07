import React, {FC, useCallback} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';

import {Colors} from '@src/res';
import {Device} from '@src/utils';
import {useAppDispatch} from '@src/hooks/store';
import {setVideoPlayer} from '@src/store/controllers/videoPlayer';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
};

const Buttons: FC<Props> = ({orientation}) => {
  const dispatch = useAppDispatch();

  const _onScreenRotate = useCallback(() => {
    if (orientation === 'LANDSCAPE') {
      Orientation.lockToPortrait();
      dispatch(setVideoPlayer({orientation: 'PORTRAIT'}));
    } else {
      Orientation.lockToLandscape();
      dispatch(setVideoPlayer({orientation: 'LANDSCAPE'}));
    }
  }, [orientation]);

  return (
    <View
      style={[
        styles.container,
        {
          marginHorizontal:
            orientation === 'LANDSCAPE'
              ? Device.statusBar()
              : moderateScale(16),
          marginBottom:
            orientation === 'LANDSCAPE'
              ? moderateScale(16)
              : Device.statusBar(),
        },
      ]}>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/imgs/chromecast.png')}
        />
      </View>

      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/imgs/play.png')}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={_onScreenRotate}
        style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/imgs/rotateScreen.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '16@ms',
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

export default Buttons;

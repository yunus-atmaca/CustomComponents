import React, {FC, useCallback} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';

import {Colors} from '@src/res';
import {useAppDispatch} from '@src/hooks/store';
import {
  setVideoPlayer,
  defaultValues,
} from '@src/store/controllers/videoPlayer';
import {Device} from '@src/utils';

type Props = {
  paused: boolean;
};

const Pip: FC<Props> = ({paused}) => {
  const dispatch = useAppDispatch();

  const onPlayToggled = useCallback(() => {
    dispatch(setVideoPlayer({paused: !paused}));
  }, [paused]);

  const onClose = useCallback(() => {
    Orientation.lockToPortrait();
    dispatch(setVideoPlayer(defaultValues));
    Device.fullScreen(false);
  }, [dispatch]);

  const onExtend = useCallback(() => {
    //Orientation.lockToPortrait();
    Device.fullScreen(true);
    setTimeout(() => {
      dispatch(setVideoPlayer({appPipMode: false}));
    }, 50);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
          onPress={onExtend}
          activeOpacity={0.7}
          style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../../../../assets/imgs/extend.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onPlayToggled}
        activeOpacity={0.7}
        style={[styles.iconContainer, {alignSelf: 'center'}]}>
        <Image
          style={styles.icon}
          source={
            paused
              ? require('../../../../assets/imgs/play.png')
              : require('../../../../assets/imgs/pause.png')
          }
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
    bottom: 0,
    top: 0,
    padding: '12@ms',
    //backgroundColor: 'red',
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '32@ms',
    height: '32@ms',
    backgroundColor: Colors.white06,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '16@ms',
    height: '16@ms',
  },
});

export default Pip;

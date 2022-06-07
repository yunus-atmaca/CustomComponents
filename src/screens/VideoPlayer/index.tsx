import React, {FC, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';

import {useAppDispatch, useAppSelector} from '@src/hooks/store';
import {
  setVideoPlayer,
  defaultValues,
} from '@src/store/controllers/videoPlayer';
import {Ic_Close} from '@src/res';
import {Device} from '@src/utils';

import PlayerContainer from './PlayerContainer';
import Video from './Video';

type Props = {};

const VideoPlayer: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const orientation = useAppSelector(
    state => state.videoPlayerController.orientation,
  );

  useEffect(() => {
    Orientation.addOrientationListener(orientation => {
      console.debug('onOrientationChange: ', orientation);

      if (orientation.includes('PORTRAIT')) {
        dispatch(setVideoPlayer({orientation: 'PORTRAIT'}));
      } else if (orientation.includes('LANDSCAPE')) {
        dispatch(setVideoPlayer({orientation: 'LANDSCAPE'}));
      }
    });

    return () => {
      Orientation.removeAllListeners();
    };
  }, [dispatch]);

  const _onClose = () => {
    Device.fullScreen(false);
    dispatch(setVideoPlayer(defaultValues));
  };

  return (
    <PlayerContainer>
      <Video orientation={orientation} />

      <TouchableOpacity
        onPress={_onClose}
        activeOpacity={0.7}
        style={styles.closeContainer}>
        <Ic_Close color={'white'} />
      </TouchableOpacity>
    </PlayerContainer>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  draggable: {
    width: '144@ms',
    height: '72@ms',
    backgroundColor: 'red',
    borderRadius: '8@ms',
    marginStart: '24@ms',
    marginTop: '60@ms',
  },
  closeContainer: {
    position: 'absolute',
    right: '24@ms',
    top: '24@ms',
    width: '40@ms',
    height: '40@ms',
    backgroundColor: 'blue',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VideoPlayer;

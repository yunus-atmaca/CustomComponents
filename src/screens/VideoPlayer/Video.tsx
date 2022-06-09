import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import RNVideo, {OnLoadData, OnProgressData} from 'react-native-video';

import {Device} from '@src/utils';
import {useAppDispatch, useAppSelector} from '@src/hooks/store';
import {setVideoPlayer} from '@src/store/controllers/videoPlayer';

import Controllers from './Controllers';
import {EventTypes, PIP_HEIGHT, PIP_WIDTH} from './Constants';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  inAppPipMode: boolean;
  eventHandlers: (event: EventTypes, props?: any) => void;
};

const Video: FC<Props> = ({orientation, inAppPipMode, eventHandlers}) => {
  const videoPlayer = useRef<RNVideo | null>(null);

  const dispatch = useAppDispatch();
  const paused = useAppSelector(state => state.videoPlayerController.paused);

  const [visible, setVisible] = useState(true);

  const V_WIDTH = useMemo(() => {
    if (inAppPipMode) {
      return PIP_WIDTH;
    } else {
      return orientation === 'PORTRAIT' ? Device.S_WIDTH : Device.S_HEIGHT;
    }
  }, [orientation, inAppPipMode]);

  const V_HEIGHT = useMemo(() => {
    if (inAppPipMode) {
      return PIP_HEIGHT;
    } else {
      return orientation === 'PORTRAIT' ? Device.S_HEIGHT : Device.S_WIDTH;
    }
  }, [orientation, inAppPipMode]);

  const _onLoad = useCallback((data: OnLoadData) => {
    //console.debug('_onLoad: ', data);
    dispatch(setVideoPlayer({duration: data.duration}));
  }, []);

  const _onProgress = useCallback((data: OnProgressData) => {
    if (data) {
      dispatch(setVideoPlayer({currentTime: Math.floor(data.currentTime)}));
    }
  }, []);

  const _onScreen = useCallback(() => setVisible(prev => !prev), [visible]);

  const _eventHandlers = useCallback(
    (event: EventTypes, props?: any) => {
      switch (event) {
        case 'onEndSliding':
          videoPlayer.current?.seek(props);
          dispatch(setVideoPlayer({paused: false}));
          break;

        default:
          eventHandlers(event, props);
          break;
      }
    },
    [eventHandlers, videoPlayer.current],
  );

  console.debug('--Video--');
  return (
    <TouchableOpacity
      onPress={_onScreen}
      activeOpacity={1}
      style={[styles.container, {width: V_WIDTH, height: V_HEIGHT}]}>
      <RNVideo
        ref={(ref: RNVideo) => (videoPlayer.current = ref)}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={[styles.video, {width: V_WIDTH, height: V_HEIGHT}]}
        onLoad={_onLoad}
        onProgress={_onProgress}
        resizeMode={'contain'}
        paused={paused}
      />

      <Controllers
        visible={visible}
        inAppPipMode={inAppPipMode}
        orientation={orientation}
        paused={paused}
        eventHandlers={_eventHandlers}
      />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});

export default Video;

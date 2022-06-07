import React, {FC, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import RNVideo, {OnLoadData} from 'react-native-video';

import {Device} from '@src/utils';
import {useAppDispatch} from '@src/hooks/store';
import {setVideoPlayer} from '@src/store/controllers/videoPlayer';

import Controllers from './Controllers';
import {EventTypes, PIP_HEIGHT, PIP_WIDTH} from './Constants';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  inAppPipMode: boolean;
  eventHandlers: (event: EventTypes, props?: any) => void;
};

const Video: FC<Props> = ({orientation, inAppPipMode}) => {
  const dispatch = useAppDispatch();

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
    console.debug('_onLoad: ', data);
    dispatch(setVideoPlayer({duration: data.duration}));
  }, []);

  console.debug('11---Video---11');
  return (
    <View style={[styles.container, {width: V_WIDTH, height: V_HEIGHT}]}>
      <RNVideo
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={[styles.video, {width: V_WIDTH, height: V_HEIGHT}]}
        onLoad={_onLoad}
        resizeMode={'contain'}
      />
      {!inAppPipMode && <Controllers orientation={orientation} />}
    </View>
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
  },
});

export default Video;

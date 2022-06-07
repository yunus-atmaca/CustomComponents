import React, {FC, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import RNVideo, {OnLoadData} from 'react-native-video';

import {Device} from '@src/utils';

import Controllers from './Controllers';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
};

const Video: FC<Props> = ({orientation}) => {
  const V_WIDTH = useMemo(() => {
    return orientation === 'PORTRAIT' ? Device.S_WIDTH : Device.S_HEIGHT;
  }, [orientation]);

  const V_HEIGHT = useMemo(() => {
    return orientation === 'PORTRAIT' ? Device.S_HEIGHT : Device.S_WIDTH;
  }, [orientation]);

  const _onLoad = useCallback((data: OnLoadData) => {
    //console.debug(data);
  }, []);

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
      <Controllers orientation={orientation} />
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

import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {useAppSelector} from '@src/hooks/store';
import {VideoPlayer} from '@src/screens';

const AppOverlayHolder: FC = ({}) => {
  const data = useAppSelector(state => state.videoPlayerController.data);

  if (!data) return null;

  return <View style={styles.container}>{data && <VideoPlayer />}</View>;
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default AppOverlayHolder;

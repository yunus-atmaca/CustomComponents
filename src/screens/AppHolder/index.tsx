import React, {FC, useEffect} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';

import {RootTabNav} from '@src/navigation';
import {Header} from '@src/components';
import {AppOverlayHolder} from '@src/screens';
import {useAppDispatch} from '@src/hooks/store';
import {
  setVideoPlayer,
  defaultValues,
} from '@src/store/controllers/videoPlayer';
import {Device} from '@src/utils';

type Props = {};

const AppHolder: FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    Orientation.lockToPortrait();
    dispatch(setVideoPlayer(defaultValues));
    Device.fullScreen(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <RootTabNav />
      <Header />
      <AppOverlayHolder />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});

export default AppHolder;

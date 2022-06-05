import React, {FC, useEffect} from 'react';
import {} from 'react-native';
import {} from 'react-native-size-matters';

import {useAppSelector} from '@src/hooks/store';
import {VideoPlayer} from '@src/screens';

const AppOverlayHolder: FC = ({}) => {
  const data = useAppSelector(state => state.videoPlayerController.data);

  if (!data) return null;

  return <>{data && <VideoPlayer />}</>;
};

export default AppOverlayHolder;

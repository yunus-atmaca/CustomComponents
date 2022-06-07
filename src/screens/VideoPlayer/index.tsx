import React, {FC} from 'react';
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

  return (
    <PlayerContainer>
      <Video orientation={orientation} />
    </PlayerContainer>
  );
};

const styles = ScaledSheet.create({});

export default VideoPlayer;

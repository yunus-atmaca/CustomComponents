import React, {FC, useCallback} from 'react';
import {ScaledSheet} from 'react-native-size-matters';

import {useAppSelector} from '@src/hooks/store';

import PlayerContainer from './PlayerContainer';
import Video from './Video';
import {EventTypes} from './Constants';

type Props = {};

const VideoPlayer: FC<Props> = ({}) => {
  const orientation = useAppSelector(
    state => state.videoPlayerController.orientation,
  );
  const inAppPIPMode = useAppSelector(
    state => state.videoPlayerController.appPipMode,
  );

  const _eventHandlers = useCallback((event: EventTypes) => {
    switch (event) {
      case 'inAppPIPMode':
        break;

      default:
        break;
    }
  }, []);

  return (
    <PlayerContainer inAppPipMode={inAppPIPMode}>
      <Video
        inAppPipMode={inAppPIPMode}
        eventHandlers={_eventHandlers}
        orientation={orientation}
      />
    </PlayerContainer>
  );
};

const styles = ScaledSheet.create({});

export default VideoPlayer;

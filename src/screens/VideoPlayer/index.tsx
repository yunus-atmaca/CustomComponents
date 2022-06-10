import React, {FC, useCallback, useState} from 'react';

import {useAppSelector} from '@src/hooks/store';

import PlayerContainer from './PlayerContainer';
import Video from './Video';
import ChromecastDevices from './ChromecastDevices';
import {AllEvents} from './Constants';

type Props = {};

const VideoPlayer: FC<Props> = ({}) => {
  const orientation = useAppSelector(
    state => state.videoPlayerController.orientation,
  );
  const appPipMode = useAppSelector(
    state => state.videoPlayerController.appPipMode,
  );

  const [deviceList, setDeviceList] = useState(false);

  const _eventHandlers = useCallback((event: AllEvents) => {
    switch (event) {
      case 'onChromecastDevices':
        setDeviceList(true);
        break;

      default:
        break;
    }
  }, []);

  const onCloseDeviceList = useCallback(() => {
    setDeviceList(false);
  }, [setDeviceList]);

  console.debug('--VideoPlayer--');
  return (
    <PlayerContainer inAppPipMode={appPipMode}>
      <Video
        inAppPipMode={appPipMode}
        eventHandlers={_eventHandlers}
        orientation={orientation}
      />
      {!appPipMode && deviceList && (
        <ChromecastDevices onClose={onCloseDeviceList} />
      )}
    </PlayerContainer>
  );
};

export default VideoPlayer;

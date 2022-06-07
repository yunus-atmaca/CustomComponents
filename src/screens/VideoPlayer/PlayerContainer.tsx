import React, {FC, useEffect} from 'react';
import {} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {DraggableContainer} from '@src/components';
import {useAppSelector} from '@src/hooks/store';
import {Constants, Device} from '@src/utils';

const PlayerContainer: FC = ({children}) => {
  /*const orientation = useAppSelector(
    state => state.videoPlayerController.orientation,
  );*/

  return (
    <DraggableContainer
      containerStyle={styles.container}
      enabled={false}
      orientation={'PORTRAIT'}>
      {children}
    </DraggableContainer>
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
  appPipModeContainer: {
    position: 'absolute',
    right: Constants.APP_PIP_OFF,
    bottom: Constants.APP_PIP_OFF,
    width: Device.W_WIDTH * 0.55,
    height: Device.W_HEIGHT * 0.2,
  },
});

export default PlayerContainer;

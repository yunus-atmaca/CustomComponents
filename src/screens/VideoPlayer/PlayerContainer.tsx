import React, {FC, useEffect} from 'react';
import {} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {DraggableContainer} from '@src/components';
import {Device} from '@src/utils';
import {PIP_HEIGHT, PIP_WIDTH} from './Constants';

type Props = {
  inAppPipMode: boolean;
};

const PlayerContainer: FC<Props> = ({children, inAppPipMode}) => {
  return (
    <DraggableContainer
      containerStyle={
        inAppPipMode ? styles.appPipModeContainer : styles.container
      }
      enabled={inAppPipMode}
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
    right: '24@ms',
    bottom: 0,
    width: PIP_WIDTH,
    height: PIP_HEIGHT,
  },
});

export default PlayerContainer;

import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import Footer from './Footer';
import Header from './Header';
import Pip from './Pip';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  paused: boolean;
  inAppPipMode: boolean;
};

const Controllers: FC<Props> = ({orientation, paused, inAppPipMode}) => {
  return (
    <View style={styles.container}>
      {inAppPipMode ? (
        <Pip paused={paused} />
      ) : (
        <>
          <Header orientation={orientation} />
          <Footer orientation={orientation} paused={paused} />
        </>
      )}
    </View>
  );
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

export default Controllers;

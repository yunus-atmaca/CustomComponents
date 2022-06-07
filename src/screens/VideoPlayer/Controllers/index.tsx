import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import Footer from './Footer';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
};

const Controllers: FC<Props> = ({orientation}) => {
  return (
    <View style={styles.container}>
      <Footer orientation={orientation} />
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

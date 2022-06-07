import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {Colors} from '@src/res';

type Props = {
  sWidth: number;
};

const Slider: FC<Props> = ({sWidth}) => {
  return (
    <View style={[styles.sBack, {width: sWidth}]}>
      <View style={styles.sFront} />
    </View>
  );
};

const styles = ScaledSheet.create({
  sBack: {
    backgroundColor: Colors.white,
    height: '4@ms',
    borderRadius: 20,
  },
  sFront: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 144,
    backgroundColor: Colors.red,
    height: '4@ms',
    borderRadius: 20,
  },
});

export default Slider;

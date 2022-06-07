import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
};

import Buttons from './Buttons';
import Scrubber from './Scrubber';

const Footer: FC<Props> = ({orientation}) => {
  return (
    <View style={styles.container}>
      <Scrubber orientation={orientation} />
      <Buttons orientation={orientation} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Footer;

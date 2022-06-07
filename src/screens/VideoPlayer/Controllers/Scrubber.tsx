import React, {FC, useMemo} from 'react';
import {View, Text} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

import {Colors} from '@src/res';
import {Device} from '@src/utils';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
};

import Slider from './Slider';

const Scrubber: FC<Props> = ({orientation}) => {
  const Scrubber_WIDTH = useMemo(() => {
    return orientation === 'LANDSCAPE'
      ? Device.S_HEIGHT - 2 * Device.statusBar()
      : Device.S_WIDTH - 2 * moderateScale(16);
  }, [orientation]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.timeContainer,
          {
            marginEnd:
              orientation === 'LANDSCAPE'
                ? Device.statusBar()
                : moderateScale(16),
          },
        ]}>
        <Text style={styles.time}>01:28:23</Text>
      </View>

      <View style={styles.sContainer}>
        <Slider sWidth={Scrubber_WIDTH} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  sContainer: {
    width: '100%',
    height: '24@ms',
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    paddingHorizontal: '12@ms',
    paddingVertical: 2,
    backgroundColor: Colors.white06,
    borderRadius: 50,
  },
  time: {
    fontSize: 12,
    color: Colors.black,
  },
});

export default Scrubber;

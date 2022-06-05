import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {RootTabNav} from '@src/navigation';

type Props = {};

const AppHolder: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <RootTabNav />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});

export default AppHolder;

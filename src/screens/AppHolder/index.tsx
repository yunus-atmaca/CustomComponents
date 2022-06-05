import React, {FC} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootTabNav} from '@src/navigation';
import {Header} from '@src/components';

type Props = {};

const AppHolder: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RootTabNav />
      <Header />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});

export default AppHolder;

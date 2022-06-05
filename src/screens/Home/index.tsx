import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {RootTabProps} from '@src/types/navigation';

const HomeScreen: FC<RootTabProps<'HomeScreen'>> = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>Home-Home</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {RootTabProps} from '@src/types/navigation';

const ProfileScreen: FC<RootTabProps<'ProfileScreen'>> = () => {
  return (
    <View style={styles.container}>
      <Text>Profile-Profile</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;

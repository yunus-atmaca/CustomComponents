import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const HomeScreen: FC = () => {
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

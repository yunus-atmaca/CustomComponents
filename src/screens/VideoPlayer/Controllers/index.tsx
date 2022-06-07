import React, {FC} from 'react';
import {Dimensions, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import Footer from './Footer';

type Props = {};

const Controllers: FC<Props> = ({}) => {
  //console.debug(dim);
  return (
    <View style={styles.container}>
      <Footer />
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
    //backgroundColor: 'green',
  },
});

export default Controllers;

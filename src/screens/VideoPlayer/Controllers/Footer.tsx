import {Colors} from '@src/res';
import {Device} from '@src/utils';
import React, {FC} from 'react';
import {View, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {};

const Footer: FC<Props> = ({}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.buttonsContainer}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../../../../assets/imgs/chromecast.png')}
          />
        </View>

        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../../../../assets/imgs/play.png')}
          />
        </View>

        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../../../../assets/imgs/rotateScreen.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    bottom: Device.statusBar(),
    left: 0,
    right: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16@ms',
  },
  iconContainer: {
    width: '48@ms',
    height: '48@ms',
    backgroundColor: Colors.white04,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  icon: {
    width: '24@ms',
    height: '24@ms',
  },
});

export default Footer;

import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

import {Constants} from '@src/utils';
import {useAppSelector} from '@src/hooks/store';
import {Colors} from '@src/res';

const Header: FC = () => {
  const props = useAppSelector(state => state.headerController.props);

  if (!props) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.prefixIc && (
        <View style={[styles.iconContainer, {left: moderateScale(16)}]}>
          {props.prefixIc}
        </View>
      )}
      {props.postfixIc && (
        <View style={[styles.iconContainer, {right: moderateScale(16)}]}>
          <props.postfixIc color={Colors.black} />
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: Constants.HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;

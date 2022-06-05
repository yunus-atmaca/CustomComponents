import React, {FC, useCallback} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';

import {RootTabProps} from '@src/types/navigation';
import {PageContainer} from '@src/components';
import {useAppDispatch} from '@src/hooks/store';
import {createHeaderProps} from '@src/types/header';
import {setHeader} from '@src/store/controllers/header';
import {Colors} from '@src/res';

const ProfileScreen: FC<RootTabProps<'Profile'>> = () => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      //console.debug('onFocus:ProfileScreen');
      dispatch(setHeader(createHeaderProps('ProfileScreen')));
    }, [dispatch]),
  );

  return (
    <PageContainer hasTabBar style={styles.container}>
      <Text>Profile-Profile</Text>
    </PageContainer>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sand,
  },
});

export default ProfileScreen;

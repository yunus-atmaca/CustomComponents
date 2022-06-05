import React, {FC, useCallback} from 'react';
import {Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';

import {RootTabProps} from '@src/types/navigation';
import {PageContainer} from '@src/components';
import {useAppDispatch} from '@src/hooks/store';
import {createHeaderProps} from '@src/types/header';
import {setHeader} from '@src/store/controllers/header';
import {Colors} from '@src/res';

const HomeScreen: FC<RootTabProps<'Home'>> = ({}) => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      //console.debug('onFocus:HomeScreen');
      dispatch(setHeader(createHeaderProps('HomeScreen')));
    }, [dispatch]),
  );

  return (
    <PageContainer hasHeader hasTabBar style={styles.container}>
      <Text>Home-Home</Text>
    </PageContainer>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sand,
  },
});

export default HomeScreen;

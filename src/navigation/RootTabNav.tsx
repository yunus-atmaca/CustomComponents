import React, {FC, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {RootTabNav, getNavContainerRef} from '@src/types/navigation';

const Tab = createBottomTabNavigator<RootTabNav>();

import {HomeScreen, ProfileScreen} from '@src/screens';
import {AppTabBar} from '@src/components';

const RootTabNavigation: FC = () => {
  const navigationRef = getNavContainerRef();
  const _onStateChange = useCallback(() => {
    console.debug('onStateChange: ', navigationRef.getCurrentRoute()?.name);
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={_onStateChange}>
      <Tab.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{headerShown: false}}
        tabBar={props => <AppTabBar {...props} />}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigation;

import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import {HomeScreen, ProfileScreen} from '@src/screens';
import {AppTabBar} from '@src/components';

const RootTabNav: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <AppTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNav;

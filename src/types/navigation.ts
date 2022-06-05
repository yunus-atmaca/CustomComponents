import type {StackScreenProps} from '@react-navigation/stack';
import type {
  NavigationProp,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/core';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createNavigationContainerRef} from '@react-navigation/native';

export type RootTabNav = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

export type RootTabProps<K extends keyof RootTabNav> = BottomTabScreenProps<
  RootTabNav,
  K
>;

const _navReference = createNavigationContainerRef<RootTabNav>();
export const getNavContainerRef =
  (): NavigationContainerRefWithCurrent<RootTabNav> => {
    return _navReference;
  };

/*export type RootTabScreenProps<K extends keyof RootTabNavigationProp> =
  BottomTabBarProps<RootTabNavigation, K>;*/

/*export type AllRoutes = RootTabNavigation;

export type CreatorNavigationProp = NavigationProp<AllRoutes>;
export type CreatorScreenProps<K extends keyof AllRoutes> = StackScreenProps<
  AllRoutes,
  K
>;

export type AnalyticsScreen = keyof RootTabNavigation;*/

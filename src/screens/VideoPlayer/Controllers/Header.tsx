import React, {FC, useCallback, useRef, useEffect} from 'react';
import {Image, TouchableOpacity, LayoutChangeEvent} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Orientation from 'react-native-orientation-locker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {Colors} from '@src/res';
import {Device} from '@src/utils';
import {useAppDispatch} from '@src/hooks/store';
import {
  setVideoPlayer,
  defaultValues,
} from '@src/store/controllers/videoPlayer';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  visible: boolean;
};

const Header: FC<Props> = ({orientation, visible}) => {
  const dispatch = useAppDispatch();

  const layoutHeight = useRef<number>();

  const translateY = useSharedValue(0);
  const animatedY = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    animation(visible);
  }, [visible]);

  const animation = useCallback(
    (visible: boolean) => {
      if (!layoutHeight.current) return;

      if (visible && translateY.value === 0) return;

      translateY.value = withTiming(visible ? 0 : -(layoutHeight.current + 1), {
        duration: 300,
        easing: Easing.linear,
      });
    },
    [layoutHeight.current, translateY],
  );

  const onClose = useCallback(() => {
    Orientation.lockToPortrait();
    dispatch(setVideoPlayer(defaultValues));
    Device.fullScreen(false);
  }, [dispatch]);

  const onInAppPipMode = useCallback(() => {
    Orientation.lockToPortrait();
    Device.fullScreen(false);

    setTimeout(() => {
      dispatch(setVideoPlayer({appPipMode: true, orientation: 'PORTRAIT'}));
    }, 50);
  }, [dispatch]);

  const _onLayout = (event: LayoutChangeEvent) => {
    layoutHeight.current = event.nativeEvent.layout.height;
  };

  return (
    <Animated.View
      onLayout={_onLayout}
      style={[
        styles.container,
        animatedY,
        {
          paddingHorizontal:
            orientation === 'LANDSCAPE'
              ? Device.statusBar()
              : moderateScale(16),
          paddingTop:
            orientation === 'LANDSCAPE'
              ? moderateScale(16)
              : Device.statusBar(),
        },
      ]}>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.7}
        style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/imgs/close.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onInAppPipMode}
        activeOpacity={0.7}
        style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/imgs/pip.png')}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    //backgroundColor: 'red',
  },
  iconContainer: {
    width: '48@ms',
    height: '48@ms',
    backgroundColor: Colors.white06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  icon: {
    width: '24@ms',
    height: '24@ms',
  },
});

export default Header;

import React, {FC, useEffect, useRef, useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  paused: boolean;
  visible: boolean;
};

import Buttons from './Buttons';
import Scrubber from './Scrubber';

const Footer: FC<Props> = ({orientation, paused, visible}) => {
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

      translateY.value = withTiming(visible ? 0 : layoutHeight.current + 1, {
        duration: 300,
        easing: Easing.linear,
      });
    },
    [layoutHeight.current, translateY],
  );

  const _onLayout = (event: LayoutChangeEvent) => {
    layoutHeight.current = event.nativeEvent.layout.height;
  };

  return (
    <Animated.View onLayout={_onLayout} style={[styles.container, animatedY]}>
      <Scrubber orientation={orientation} />
      <Buttons orientation={orientation} paused={paused} />
    </Animated.View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Footer;

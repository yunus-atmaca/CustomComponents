import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text as RNText,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Rect} from 'react-native-svg';

import {Colors} from '@src/res';
import {Device} from '@src/utils';

type Props = {
  text: string;
  textColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  rotation?: number;
  background?: string;
  paused?: boolean;
  positionX?: number;
  contentContainer?: StyleProp<ViewStyle>;
};

const CONTAINER_WIDTH = 2 * Device.W_WIDTH;
const NUMBER_OF_TEXT = 8;
const ANIM_DURATION = 21000;

const TEXT_HEIGHT = moderateScale(48);

const Marquee: FC<Props> = ({
  text,
  textColor = Colors.black,
  strokeWidth = 1,
  strokeColor = Colors.black,
  rotation = 2,
  background = Colors.transparent,
  contentContainer,
}) => {
  const [contentWidth, setContentWidth] = useState<null | number>(null);

  const C_HEIGHT = useMemo(() => {
    return (
      moderateScale(48) +
      moderateScale(7 * Math.abs(rotation)) +
      moderateScale(Math.abs(strokeWidth))
    );
  }, [rotation, strokeWidth]);

  const translateX = useSharedValue(0);
  const animatedX = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  useEffect(() => {
    if (contentWidth) animateScroll();
  }, [contentWidth]);

  const animateScroll = () => {
    translateX.value = 0;
    translateX.value = withDelay(
      250,
      withRepeat(
        withTiming(
          -contentWidth!,
          {
            duration: ANIM_DURATION,
            easing: Easing.linear,
          },
          () => {},
        ),
        -1,
        true,
      ),
    );
  };

  const _onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    setContentWidth(nativeEvent.layout.width * NUMBER_OF_TEXT - Device.W_WIDTH);
  };

  return (
    <View style={[styles.container, contentContainer, {height: C_HEIGHT}]}>
      <Svg width={CONTAINER_WIDTH} height={C_HEIGHT}>
        <Rect
          x={0}
          y={(C_HEIGHT - TEXT_HEIGHT) / 2}
          rotation={rotation}
          width={CONTAINER_WIDTH}
          height={TEXT_HEIGHT}
          fill={background}
          strokeWidth={strokeWidth}
          stroke={strokeColor}
          origin={[CONTAINER_WIDTH / 2, C_HEIGHT / 2]}
        />
      </Svg>

      <View
        style={[
          styles.contentContainer,
          {
            top: (C_HEIGHT - TEXT_HEIGHT) / 2,
            height: TEXT_HEIGHT,
            transform: [{rotate: `${moderateScale(rotation)}deg`}],
          },
        ]}>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              //backgroundColor: 'green',
            },
            animatedX,
          ]}>
          {new Array(NUMBER_OF_TEXT).fill(0).map((_, i) => {
            return (
              <View
                key={'m-' + i}
                onLayout={i === NUMBER_OF_TEXT - 1 ? _onLayout : undefined}
                style={[styles.textContainer]}>
                <RNText style={[styles.marqueeText, {color: textColor}]}>
                  {text}
                </RNText>
              </View>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  textContainer: {
    paddingStart: '16@ms',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeText: {
    color: Colors.black,
    fontSize: 20,
    marginEnd: '16@ms',
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
});

export default Marquee;

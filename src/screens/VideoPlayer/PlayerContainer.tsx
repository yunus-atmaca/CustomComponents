import React, {FC, useEffect, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  TouchableOpacity,
} from 'react-native';
import {
  PanGestureHandler,
  State,
  HandlerStateChangeEvent,
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import {DraggableProps} from '@src/components/DraggableContainer';
import {Device} from '@src/utils';
import {PIP_HEIGHT, PIP_WIDTH} from './Constants';

type Props = {
  inAppPipMode: boolean;
};

const PlayerContainer: FC<Props> = ({children, inAppPipMode}) => {
  const [containerMeasure, setContainerMeasure] =
    useState<DraggableProps | null>(null);

  const cRef = useRef(null) as any;

  const offset = useRef({x: 0, y: 0});
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
  }, [inAppPipMode]);

  const _onHandlerStateChange = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>,
  ) => {
    const {state} = event.nativeEvent;

    if (state === State.BEGAN) {
      offset.current.x = translateX.value;
      offset.current.y = translateY.value;
    }
  };

  const _onGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>,
  ) => {
    const {nativeEvent} = event;

    const posX = offset.current.x + nativeEvent.translationX;
    const posY = offset.current.y + nativeEvent.translationY;

    const {x, y} = withOffset(posX, posY);
    translateX.value = x;
    translateY.value = y;
  };

  const withOffset = (x: number, y: number) => {
    let tempX = 0;
    let tempY = 0;

    const {offLeft, offRight, offBottom, offTop} = containerMeasure!;

    if (x < 0) {
      tempX = Math.abs(x) > offLeft ? -offLeft : x;
    } else {
      tempX = x > offRight ? offRight : x;
    }

    if (y > 0) {
      tempY = y > offBottom ? offBottom : y;
    } else {
      tempY = Math.abs(y) > offTop ? -offTop : y;
    }

    return {x: tempX, y: tempY};
  };

  const setLayout = (layout: LayoutRectangle) => {
    const {x, y, height, width} = layout;
    const offH = moderateScale(24);

    const offLeft = x - offH;
    const offRight = Device.W_WIDTH - x - width - offH;
    const offTop = y - offH;
    const offBottom = Device.W_HEIGHT - y - height - offH;

    setContainerMeasure({
      x,
      y,
      width,
      height,
      offLeft,
      offRight,
      offTop,
      offBottom,
    });
  };

  const _onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  return (
    <PanGestureHandler
      enabled={inAppPipMode && containerMeasure !== null}
      onHandlerStateChange={_onHandlerStateChange}
      onGestureEvent={_onGestureEvent}>
      <Animated.View
        ref={cRef}
        onLayout={_onLayout}
        style={[
          inAppPipMode ? styles.appPipModeContainer : styles.container,
          style,
        ]}>
        <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  appPipModeContainer: {
    position: 'absolute',
    right: '24@ms',
    bottom: 0,
    width: PIP_WIDTH,
    height: PIP_HEIGHT,
  },
});

export default PlayerContainer;

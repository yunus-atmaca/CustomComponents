import React, {useRef, useEffect, useState} from 'react';
import {
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  LayoutRectangle,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  PanGestureHandler,
  State,
  HandlerStateChangeEvent,
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';

import {Device} from '@src/utils';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  enabled: boolean;
  orientation: 'Landscape' | 'Portrait';
};

type DraggableProps = {
  x: number;
  y: number;
  height: number;
  width: number;
  offLeft: number;
  offRight: number;
  offTop: number;
  offBottom: number;
};

const DraggableContainer: React.FC<Props> = ({
  children,
  containerStyle,
  enabled,
  orientation,
}) => {
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
  }, [enabled]);

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

  /*const measuring = async () => {
    cRef.current?.measure(
      (x: number, y: number, width: number, height: number) => {
        console.debug(x, y, width, height)
        setLayout({ x, y, width, height })
      },
    )
  }*/

  const setLayout = (layout: LayoutRectangle) => {
    const {x, y, height, width} = layout;
    console.debug(layout);

    const paddingOff = moderateScale(24);
    const VerticalSize =
      orientation === 'Portrait' ? Device.W_HEIGHT : Device.W_WIDTH;
    const HorizontalSize =
      orientation === 'Portrait' ? Device.W_WIDTH : Device.W_HEIGHT;

    let offLeft = x - paddingOff;
    let offRight = HorizontalSize - x - width - paddingOff;
    let offTop = y - paddingOff;
    let offBottom = VerticalSize - y - height - paddingOff;

    console.debug(offLeft, offRight, offTop, offBottom);

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
      enabled={enabled && containerMeasure !== null}
      onHandlerStateChange={_onHandlerStateChange}
      onGestureEvent={_onGestureEvent}>
      <Animated.View
        ref={cRef}
        onLayout={_onLayout}
        style={[containerStyle, style]}>
        <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DraggableContainer;

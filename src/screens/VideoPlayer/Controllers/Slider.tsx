import React, {FC, useCallback, useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
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

import {Colors} from '@src/res';
import {useAppDispatch} from '@src/hooks/store';
import {setVideoPlayer} from '@src/store/controllers/videoPlayer';
import {SliderEvents} from '../Constants';

type Props = {
  sWidth: number;
  videoDuration: number;
  currentTime: number;
  onSliderEventHandler?: (eventType: SliderEvents, props?: any) => void;
};

const THUMB_SIZE = moderateScale(16);

const Slider: FC<Props> = ({
  sWidth,
  videoDuration,
  currentTime,
  onSliderEventHandler,
}) => {
  const sliding = useRef(false);
  const dispatch = useAppDispatch();

  const maxXMove = useMemo(() => {
    return sWidth - THUMB_SIZE;
  }, [THUMB_SIZE, sWidth]);

  const offsetX = useRef(0);
  const width = useSharedValue(0);
  const translateX = useSharedValue(0);

  const styleThumb = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });
  const styleSFront = useAnimatedStyle(() => {
    return {width: width.value};
  });

  useEffect(() => {
    if (videoDuration > 0 && !sliding.current) {
      calculateX(currentTime, videoDuration);
    }
  }, [currentTime, videoDuration]);

  const calculateX = useCallback(
    (c: number, v: number) => {
      const currentX = (c * maxXMove) / v;
      translateX.value = currentX;
      width.value = currentX;

      //console.debug('calculateX: ', currentX, c, v, maxXMove);
    },
    [maxXMove],
  );

  const _onHandlerStateChange = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>,
  ) => {
    const {state} = event.nativeEvent;

    if (state === State.BEGAN) {
      dispatch(setVideoPlayer({paused: true}));
      sliding.current = true;
      //onSliderEventHandler && onSliderEventHandler('onStartSliding');
      offsetX.current = translateX.value;
    }

    if (state === State.END || state === State.CANCELLED) {
      //dispatch(setVideoPlayer({paused: false}));
      sliding.current = false;
      onSliderEventHandler && onSliderEventHandler('onEndSliding', currentTime);
    }
  };

  const _onGestureEvent = (
    event: GestureEvent<PanGestureHandlerEventPayload>,
  ) => {
    const {nativeEvent} = event;

    const posX = offsetX.current + nativeEvent.translationX;
    const x = withOffset(posX);
    //console.debug('x: ', x);
    translateX.value = x;
    width.value = x;
    calculateTime(posX, videoDuration);
  };

  const calculateTime = useCallback(
    (x: number, v: number) => {
      const time = (x * v) / maxXMove;
      //console.debug('time: ', time);
      dispatch(setVideoPlayer({currentTime: time}));
    },
    [maxXMove, dispatch],
  );

  const withOffset = (x: number) => {
    let tempX = 0;

    if (x >= 0) tempX = Math.min(maxXMove, x);

    return tempX;
  };

  return (
    <PanGestureHandler
      enabled={true}
      onHandlerStateChange={_onHandlerStateChange}
      onGestureEvent={_onGestureEvent}>
      <View style={[styles.container, {width: sWidth}]}>
        <View style={[styles.sBack, {width: sWidth - THUMB_SIZE}]}>
          <Animated.View style={[styles.sFront, styleSFront]} />
        </View>
        <Animated.View style={[styles.thumb, styleThumb]} />
      </View>
    </PanGestureHandler>
  );
};

const styles = ScaledSheet.create({
  container: {
    //width: '100%',
    height: THUMB_SIZE,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sBack: {
    backgroundColor: Colors.white,
    height: '4@ms',
    borderRadius: 20,
  },
  sFront: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 0,
    backgroundColor: Colors.red,
    height: '4@ms',
    borderRadius: 20,
  },
  thumb: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    borderRadius: THUMB_SIZE,
    backgroundColor: Colors.red,
  },
});

export default Slider;

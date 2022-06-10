import React, {FC, useCallback, useMemo} from 'react';
import {View, Text} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

import {Colors} from '@src/res';
import {Device} from '@src/utils';
import {SliderEvents} from '../Constants';

type Props = {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  onSliderEventHandler?: (eventType: SliderEvents, props?: any) => void;
};

import Slider from './Slider';
import {useAppSelector} from '@src/hooks/store';

const Scrubber: FC<Props> = ({orientation, onSliderEventHandler}) => {
  const videoDuration = useAppSelector(
    state => state.videoPlayerController.duration,
  );
  const currentTime = useAppSelector(
    state => state.videoPlayerController.currentTime,
  );

  const Scrubber_WIDTH = useMemo(() => {
    return orientation === 'LANDSCAPE'
      ? Device.S_HEIGHT - 2 * Device.statusBar()
      : Device.S_WIDTH - 2 * moderateScale(16);
  }, [orientation]);

  const getTime = useCallback(time => {
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    let ret = '';

    //if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    //}

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.timeContainer,
          {
            marginEnd:
              orientation === 'LANDSCAPE'
                ? Device.statusBar()
                : moderateScale(16),
          },
          {opacity: videoDuration > 0 ? 1 : 0},
        ]}>
        <Text style={[styles.time]}>
          {/*getTime(videoDuration - currentTime)*/}
          {getTime(currentTime)}
        </Text>
      </View>

      <View style={styles.sContainer}>
        <Slider
          videoDuration={videoDuration}
          currentTime={currentTime}
          sWidth={Scrubber_WIDTH}
          onSliderEventHandler={onSliderEventHandler}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  sContainer: {
    width: '100%',
    height: '24@ms',
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    paddingHorizontal: '12@ms',
    paddingVertical: 2,
    backgroundColor: Colors.white06,
    borderRadius: 50,
  },
  time: {
    fontSize: 12,
    color: Colors.black,
  },
});

export default Scrubber;

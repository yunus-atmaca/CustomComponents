import React, {FC, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {DraggableContainer} from '@src/components';
import {useAppDispatch} from '@src/hooks/store';
import {setVideoPlayer} from '@src/store/controllers/videoPlayer';
import {Ic_Close} from '@src/res';
import Orientation from 'react-native-orientation-locker';

type Props = {};

const VideoPlayer: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //Orientation.lockToPortrait();
  }, []);

  const _onClose = () => {
    dispatch(setVideoPlayer({data: undefined}));
  };

  return (
    <View style={styles.container}>
      <DraggableContainer
        orientation={'Portrait'}
        containerStyle={styles.draggable}
        enabled></DraggableContainer>

      <TouchableOpacity
        onPress={_onClose}
        activeOpacity={0.7}
        style={styles.closeContainer}>
        <Ic_Close color={'white'} />
      </TouchableOpacity>
    </View>
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
  draggable: {
    width: '144@ms',
    height: '72@ms',
    backgroundColor: 'red',
    borderRadius: '8@ms',
    marginStart: '24@ms',
    marginTop: '60@ms',
  },
  closeContainer: {
    position: 'absolute',
    right: '24@ms',
    top: '24@ms',
    width: '40@ms',
    height: '40@ms',
    backgroundColor: 'blue',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VideoPlayer;

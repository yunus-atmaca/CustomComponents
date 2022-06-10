import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  EmitterSubscription,
  View,
  FlatList,
  FlatListProps,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import GoogleCast, {CastButton, Device} from 'react-native-google-cast';

import {Colors} from '@src/res';

type Props = {
  onClose: () => void;
};

const ChromecastDevices: FC<Props> = ({onClose}) => {
  const dUpdates = useRef<EmitterSubscription>();
  const [devices, setDevices] = useState<Device[] | null>(null);

  useEffect(() => {
    searchDevices();
    return () => {
      dUpdates.current?.remove();
    };
  }, []);

  const searchDevices = useCallback(async () => {
    const dManager = GoogleCast.getDiscoveryManager();
    dUpdates.current = dManager.onDevicesUpdated(d => {
      //console.debug('devices: ', d);
      setDevices(d);
    });

    dManager.startDiscovery();

    const d = await dManager.getDevices();
    setDevices(d);
  }, []);

  const renderDevice: FlatListProps<Device>['renderItem'] = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.friendlyName}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onClose}
      activeOpacity={1}
      style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.text}>Chromecast Devices</Text>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={styles.close}>
            <Image
              style={styles.icon}
              source={require('../../../assets/imgs/close.png')}
            />
          </TouchableOpacity>
        </View>
        {devices !== null && (
          <>
            {devices.length === 0 ? (
              <Text style={styles.itemText}>There is no available devices</Text>
            ) : (
              <FlatList<Device>
                data={devices}
                renderItem={renderDevice}
                keyExtractor={(_, i) => 'key-' + i}
                showsVerticalScrollIndicator={false}
                bounces={false}
              />
            )}
          </>
        )}
      </TouchableOpacity>

      <View pointerEvents="none" style={styles.realCastButtonContainer}>
        <CastButton style={{width: 24, height: 24}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: Colors.black04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    maxHeight: '80%',
    minHeight: '40%',
    backgroundColor: Colors.white,
    borderRadius: '16@ms',
  },
  header: {
    alignItems: 'center',
    height: '48@ms',
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
  },
  text: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: 15,
  },
  close: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    width: '48@ms',
    height: '48@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '24@ms',
    height: '24@ms',
  },
  realCastButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
  },
  item: {
    width: '100%',
    height: '40@ms',
    //backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: Colors.black,
    fontWeight: '400',
    fontSize: 14,
  },
});

export default ChromecastDevices;

import React, {FC, useEffect} from 'react';
//import {Platform, NativeModules} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import {useAppSession} from './hooks/appSession';
import {store} from './store';
import {AppHolder} from './screens';

/*if (Platform.OS === 'android') {
  NativeModules.FullScreen.onFullScreen();
}*/

const Root: FC = () => {
  const loading = useAppSession();

  useEffect(() => {
    if (loading) {
      SplashScreen.hide();
    } else {
      console.debug('Loading...');
    }
  }, [loading]);

  return (
    <SafeAreaProvider>
      <AppHolder />
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Root />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

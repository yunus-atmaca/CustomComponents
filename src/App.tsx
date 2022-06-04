import React, {FC, useEffect} from 'react';
import {Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import {useAppSession} from './hooks/appSession';
import {store} from './store';

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
      <Text>Root App</Text>
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

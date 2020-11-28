/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import { navigationRef } from './utils/RootNavigation';
import DrawerNavigator from './navigation/DrawerNavigator';


const App = () => {
  return (
    <Root>
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigator />
      </NavigationContainer>
    </Root>
  );
};

export default App;

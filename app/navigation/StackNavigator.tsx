import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Icon, Spinner, Button, Row, Col } from 'native-base';
import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import DashboardScreen from '../screens/Dashboard';
import Logout from '../screens/Logout';
import HistoryScreen from '../screens/History';
import DetectScreen from '../screens/Detect';

const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    console.log("Toggle Drawer called");
    props.toggleSideBar();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const StackNavigator = () => {

  const options = ({ navigation }) => ({
    headerTitleStyle: {
      alignSelf: 'center',
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: '#3AA964',
    },
    headerLeft: (props) => {
      return <NavigationDrawerStructure toggleSideBar={() => navigation.openDrawer()} />
    },
    headerRight: (props) => (<View></View>),
  })

  return (
    <Stack.Navigator animation='slideLeft'>
      <Stack.Screen name='Splash'
        component={SplashScreen}
        options={options}>
      </Stack.Screen>
      <Stack.Screen name='Dashboard'
        component={DashboardScreen}
        options={options}>
      </Stack.Screen>
      <Stack.Screen name='History'
        component={HistoryScreen}
        options={options}>
      </Stack.Screen>
      <Stack.Screen name='Detect'
        component={DetectScreen}
        options={options}>
      </Stack.Screen>
      <Stack.Screen name='Login'
        component={LoginScreen}
        options={options}>
      </Stack.Screen>
      <Stack.Screen name='Logout'
        component={Logout}
        options={options}>
      </Stack.Screen>
    </Stack.Navigator>
  );

}

export default StackNavigator;

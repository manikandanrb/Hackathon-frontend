import React from 'react';

import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from './StackNavigator';
import SideBar from '../components/Sidebar';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName='StackNav' drawerContent={(props) => <SideBar {...props} />} >
            <Drawer.Screen name="StackNav" component={StackNavigator} />
        </Drawer.Navigator>
    )

}

export default DrawerNavigator;

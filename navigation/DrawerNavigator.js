import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from './StackNavigator'
import NewPlant from '../screens/NewPlant'
import Calendar from '../screens/Calendar'
import Settings from '../screens/Settings'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="My Plants" component={StackNavigator} />
        <Drawer.Screen name="Add New Plant" component={NewPlant} />
        <Drawer.Screen name="Calendar" component={Calendar} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
  );
}

export default DrawerNavigator;

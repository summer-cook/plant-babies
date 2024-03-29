import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from './StackNavigator'
import NewPlant from '../screens/NewPlant'
import Calendar from '../screens/Calendar'
import Settings from '../screens/Settings'
import Auth from '../screens/Auth'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#AAC9CF',
          overlayColor: '#C4C4C4',
          drawerItemStyle: {
            borderRadius: 4,
            margin: 0,
            padding: 10
          },
        }}
        >
        {/* TO DO: Add make it say log out when logged in, and log in when logged out */}
        <Drawer.Screen name="Log In" component={Auth} />
        <Drawer.Screen name="My Plants" component={StackNavigator} />
        <Drawer.Screen name="Create a New Plant" component={NewPlant} />
        <Drawer.Screen name="Calendar" component={Calendar} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
  );
}

export default DrawerNavigator;

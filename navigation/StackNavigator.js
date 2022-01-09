import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPlants from '../screens/MyPlants'
import Plant from '../screens/Plant'

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="All Plants" component={MyPlants} />
      <Stack.Screen name="Plant" component={Plant} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
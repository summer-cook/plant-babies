import React from "react";
import { StyleSheet } from 'react-native'
import { app, database, storage } from './firebaseConfig';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './navigation/DrawerNavigator'
import { setCustomText, setCustomTouchableOpacity } from 'react-native-global-props';
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa';

const customTextProps = {
  style: {
    fontFamily: 'Comfortaa_700Bold',
    color: '#6D6D6D'
  }
};

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Comfortaa_700Bold,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    setCustomText(customTextProps);
    return (
      <NavigationContainer>
        <Stack.Navigator
          options={{ headerStyle: {
            backgroundColor: '#E4F6E9'
          }}}
        >
          <Stack.Screen
            name="Plant Babies 🌿"
            component={DrawerNavigator}
            options={{ headerStyle: {
              backgroundColor: '#E4F6E9'
            }}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
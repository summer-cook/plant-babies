import React from "react"
import { StyleSheet, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, ThemeProvider } from "@react-navigation/native"
import DrawerNavigator from './navigation/DrawerNavigator'
import { AuthProvider } from './context/AuthContext'
import { ThemeContext } from './context/ThemeContext';
import AppLoading from "expo-app-loading"
import setDefaultProps from 'react-native-simple-default-props'

import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa'

const Stack = createStackNavigator()

function App() {
  let [fontsLoaded] = useFonts({
    Comfortaa_700Bold,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold
  })

  const defaultTextProps = {
    style: {
      fontFamily: 'Comfortaa_700Bold',
      color: '#6D6D6D',
    },
  }

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    setDefaultProps(Text, defaultTextProps)
    return (
      <AuthProvider>
        <ThemeProvider>

          <NavigationContainer>
            <Stack.Navigator
              options={{
                headerStyle: {
                  backgroundColor: '#E4F6E9'
                }
              }}
            >
              <Stack.Screen
                name="Plant Babies 🌿"
                component={DrawerNavigator}
                options={{
                  headerStyle: {
                    backgroundColor: '#E4F6E9'
                  }
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default App
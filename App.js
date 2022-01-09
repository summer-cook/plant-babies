import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './navigation/DrawerNavigator'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Plant Babies"
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


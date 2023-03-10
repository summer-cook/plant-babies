import React from "react"
import { View, Text } from "react-native";
import CustomButton from "../components/CustomButton";

function Calendar({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Coming soon!</Text>
      <CustomButton 
        onPress={() => navigation.goBack()}
        title="Go back home"
      />
    </View>
  );
}

export default Calendar
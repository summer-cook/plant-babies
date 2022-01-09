import React from "react"
import { Button, View, Text } from "react-native";

function MyPlants({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
      <Button
        onPress={() => navigation.navigate("Plant")}
        title="Go to plant"
      />
      <Text>HELLO</Text>
    </View>
  );
}

export default MyPlants
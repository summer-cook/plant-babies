import React from "react"
import { View, TouchableOpacity, StyleSheet, } from "react-native";
import CustomButton from "../components/Button";

function MyPlants({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CustomButton 
        onPress={navigation.openDrawer}
        title="Open navigation drawer"
      />
      <CustomButton 
        onPress={() => navigation.navigate("Plant")}
        title="Go to plant"
      />
    </View>
  );
}

export default MyPlants

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#AAC9CF',
    borderRadius: 4
  },
  text: {
    textTransform: 'uppercase',
    color: '#fff',
    letterSpacing: 1,
    padding: 10
  },
});
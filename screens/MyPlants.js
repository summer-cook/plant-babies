import React, {useState, useEffect} from "react"
import { View, StyleSheet, Text} from "react-native";
import CustomButton from "../components/CustomButton";
import Axios from 'axios'

function MyPlants({ navigation }) {

  const [plants, setPlants] = useState([])

  useEffect(()=>{
    Axios.get('http://localhost:3000/plant/index')
      .then(res => {
        setPlants(res.data)
      })
      .catch(e => setPlants(e.message))
  }, [])

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
      <Text>
      {plants.map((plant) => {
        return(
          plant.name
        )
      })}
      </Text>
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
import React, {useState, useEffect} from "react"
import Axios from 'axios'
import { View } from "react-native";

useEffect = () => {
  Axios.post(
    'http://localhost:3000/api/plants',
    { plant:
      {
        name: '',
        watering_frequency: '',
        weekly_or_monthly: '',
        last_time_watered: '',
        description: ''
      }
    }
  )
  .then(response => {
    console.log(response)
  })
  .catch(error => console.log(error))
}

function NewPlant({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

    </View>
  );
}

export default NewPlant
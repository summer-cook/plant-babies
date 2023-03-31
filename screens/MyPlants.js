import React, { useState, useEffect } from 'react'
import { ScrollView } from "react-native"
import PlantListItem from "../components/PlantListItem"
import { getDatabase, ref, onValue } from 'firebase/database'

const MyPlants = () => {
  const [isLoading, setLoading] = useState(true)
  const [plants, setPlants] = useState([])
  useEffect(() => {
    const dbRef = ref(getDatabase(), 'plants')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const plantList = Object.entries(data).map(([key, value]) => ({id: key, ...value}))
      setPlants(plantList)
      setLoading(false)
    });
  }, []);

  return (
    <ScrollView>
      {plants.map((plant, index) => {
        return(
          <PlantListItem
            key={index}
            id={plant.id}
            plant={plant}
            style={{
              backgroundColor: index % 2 === 0 ? '#000' : '#ccc'
            }}
          />
        )
      })}

    </ScrollView>
  )
}

export default MyPlants

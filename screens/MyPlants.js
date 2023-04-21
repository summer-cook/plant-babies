import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ScrollView, StyleSheet, Text, View } from "react-native"
import PlantListItem from "../components/PlantListItem"
import { getDatabase, ref, onValue } from 'firebase/database'
//import { getAuth } from 'firebase/auth'

const MyPlants = () => {
  const [isLoading, setLoading] = useState(true)
  const [plants, setPlants] = useState([])
  const { user } = useContext(AuthContext);
  //const auth = getAuth()
  console.log(user)

  useEffect(() => {
    if (user) {
      const dbRef = ref(getDatabase(), `users/${user.uid}/plants`)
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const plantList = Object.entries(data).map(([key, value]) => ({id: key, ...value}))
          setPlants(plantList)
          setLoading(false)
        }
      })
    }
  }, [])

  return (
    <ScrollView contentContainerStyle={!user && styles.container}>
      {user ? (plants.map((plant, index) => {
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
      })) : (
        <Text style={styles.text}>Sign in or sign up to add plant babies here!</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 50,
    textAlign: 'center'
  }
})

export default MyPlants

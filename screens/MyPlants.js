import React, {useState, useEffect} from "react"
import {ScrollView} from "react-native";
import PlantListItem from "../components/PlantListItem";
import Axios from 'axios'

function MyPlants() {

  const [isLoading, setLoading] = useState(true);
  const [plants, setPlants] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3000/api/plants')
      .then(({ data }) => {
        if (data){
          let plantArray = data
          setPlants(plantArray)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView>
      {plants.map((plant, index) => {
        return(
          <PlantListItem 
            key={index}
            id={plant.id}
            plant={plant}
            style={{backgroundColor: index % 2 === 0 ? '#000' : '#ccc'
            }} 
          />
        )
      })}

    </ScrollView>
  );
}

export default MyPlants
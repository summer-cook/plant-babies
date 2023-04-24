import { useContext } from 'react'
import { View, Text } from 'react-native'
import { getAuth } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'
//import PlantForm from "../components/PlantForm"

const UpdatePlant = ({ route, navigation }) => {
  const plant = route.params.plant;
  const theme = useContext(ThemeContext)
  return (
    <View style={[{flex: 1}, theme.center]}>
      <Text>
        plant
      </Text>
      {/* <PlantForm
        name={name}
        description={description}
        lastTimeWatered={lastTimeWatered}
        wateringFrequency={wateringFrequency}
        weeklyOrMonthly={weeklyOrMonthly}
      /> */}
    </View>
  )
}

export default UpdatePlant
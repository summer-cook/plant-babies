import React, { useContext } from "react"
import CustomButton from '../components/CustomButton'
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Button,
  View
} from "react-native";
import { ThemeContext } from '../context/ThemeContext'
import { TouchableOpacity } from "react-native-gesture-handler";

function Plant({ route, navigation }) {
  const plant = route.params.plant;
  const theme = useContext(ThemeContext)
  return (
    <ScrollView>
    <View style={styles.plantContainer}>
      <View style={styles.plantInfo}>
        <Image
          style={styles.plantImage}
          source={{
            uri: plant.image
          }}
        />
        <View>
          <Text style={styles.plantName}>
            {plant.name[0].toUpperCase()}{plant.name.slice(1)}
          </Text>
        </View>
        <View>
          <Text style={styles.lastWateredText}>
              Last watered: {plant.last_time_watered}
          </Text>
          <Text style={styles.wateringText}>
            Needs watering today 💚
          </Text>
          <Text style={styles.description}>
            {plant.description}
          </Text>
        </View>
      </View>
      <CustomButton
        title='Water Now'
        onPress={() => navigation.goBack()}
        fontSize={20}
      />
      <CustomButton
        title='Update Plant'
        onPress={() => navigation.navigate('UpdatePlant', {plant: plant})}
        backgroundColor={theme.colors.periwinkle}
      />
      <CustomButton
        title='Delete Plant'
        onPress={() => navigation.goBack()}
        backgroundColor={theme.colors.red}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackLink}>
          Go back to my plants
        </Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Plant

const styles = StyleSheet.create({
  plantContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    paddingVertical: 0,
    flex:1
  },
  plantInfo: {
    textAlign: 'center',
    width: 300,
  },
  plantName: {
    paddingTop: 20,
    fontSize: 30,
    color: '#333432',
    textAlign: 'center',
  },
  plantImage: {
    width: 300,
    height: 300,
    borderRadius: 5,
    borderColor: '#E5E5E5',
    borderWidth: 2,
  },
  lastWateredText: {
    paddingTop: 10,
    fontFamily: 'Comfortaa_300Light',
    fontSize: 16,
    textAlign: 'center'
  },
  wateringText: {
    color: '#333432',
    fontSize: 14,
    textAlign: 'center'
  },
  waterPlantButton: {
    fontSize: 20
  },
  goBackLink: {
    fontSize: 14
  },
  description: {
    textAlign: 'center',
    paddingVertical: 10
  }
});
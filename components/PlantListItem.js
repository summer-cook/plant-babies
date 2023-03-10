import React from "react"
import CustomButton from './CustomButton'
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { useFonts, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';
import AppLoading from 'expo-app-loading';

// gets the date today to use to find out whether a plant needs to be watered
function getDateToday() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return today = mm + '/' + dd + '/' + yyyy;
}

// tells you whether or not the plant needs to get watered
function getWateringText(plant) {
  if (plant.last_time_watered = getDateToday())
  return 'Hydrated & happy 🌞'
}

function PlantListItem({ plant, id}) {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ Comfortaa_300Light });
  if (!fontsLoaded) {
    return <AppLoading />;}
  else
  return (
    <View 
      style={{
        backgroundColor: Number(id) % 2 ? '#fff' : '#FAFAFA',
        flexDirection: "row",
        padding: 10
      }}
    >
      <TouchableOpacity 
        onPress={() => navigation.navigate('Plant', {plant: plant})}>
        <Image
          style={styles.plantImage}
          source={{
            uri: `http://localhost:3000/${plant.image_url}`
          }}
        />
      </TouchableOpacity>
      <View style={styles.plantInfo}>
        <View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Plant', {plant: plant})}>
            <Text style={styles.plantName}>
              {plant.name[0].toUpperCase()}{plant.name.slice(1)}
            </Text>
          </TouchableOpacity>
          <Text style={styles.lastWateredText}>
            Last watered: {plant.last_time_watered}
          </Text>
        </View>
        <Text style={styles.wateringText}>
          Needs watering today 💚
        </Text>
      </View>
      <View style={styles.waterPlantButton}>
        <CustomButton 
          title='Water Now'
          onPress={() => navigation.navigate('Plant', {plant: plant})}
          fontSize={10} 
        />
      </View>
    </View>
  );
}

export default PlantListItem

const styles = StyleSheet.create({
  plantName: {
    fontSize: 15,
    color: '#333432'
  },
  plantImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    flex:  1
  },
  plantInfo: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  waterPlantButton: {
    flex: 1,
    alignSelf: 'center',
  },
  lastWateredText: {
    fontFamily: 'Comfortaa_300Light',
    fontSize: 13,
  },
  wateringText: {
    color: '#333432',
    alignSelf: 'stretch',
    fontSize: 13,
  }
});
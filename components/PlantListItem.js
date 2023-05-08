import React, { useContext } from "react"
import CustomButton from './CustomButton'
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { useFonts, Comfortaa_300Light } from '@expo-google-fonts/comfortaa';
import AppLoading from 'expo-app-loading';
import { today, getWateringText, timeSince } from '../utils/utilityFunctions'
import { ThemeContext } from '../context/ThemeContext';

function PlantListItem({ plant, index}) {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  let [fontsLoaded] = useFonts({ Comfortaa_300Light });
  if (!fontsLoaded) {
    return <AppLoading />;}
  else
  return (
    <View
      style={{
        backgroundColor: index % 2 ? theme.colors.white : theme.colors.backgroundGrey,
        flexDirection: "row",
        padding: 10
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Plant', {plant: plant}
        )}>
        <Image
          style={styles.plantImage}
          source={{
            uri: plant.image
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
            Last watered: {timeSince(plant.lastTimeWatered)} ago
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
    marginRight: 10,
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
import React, { useContext, useState, useEffect } from "react"
import CustomButton from '../components/CustomButton'
import DatePicker from 'react-native-datepicker'
import { ThemeContext } from '../context/ThemeContext'
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from '@expo/vector-icons';
import { app } from '../firebaseConfig';
import { getDatabase, ref, update, remove } from "firebase/database";
import { today } from '../utils/utilityFunctions'
import { AuthContext } from '../context/AuthContext'
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Button,
  View,
  TextInput
} from "react-native";

function Plant({ route, navigation, refreshPlants }) {
  const plant = route.params.plant;
  const db = getDatabase(app);
  const { user } = useContext(AuthContext)
  const theme = useContext(ThemeContext)

  const [isPlantDeleted, setIsPlantDeleted] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingLastTimeWatered, setEditingLastTimeWatered] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editedName, setEditedName] = useState(plant.name);
  const [editedLastTimeWatered, setEditedLastTimeWatered] = useState(plant.lastTimeWatered);
  const [editedDescription, setEditedDescription] = useState(plant.description);

  const handleEdit = (field) => {
    switch(field) {
      case 'name':
        setEditingName(true);
        break;
      case 'lastTimeWatered':
        setEditingLastTimeWatered(true);
        break;
      case 'description':
        setEditingDescription(true);
        break;
      default:
        break;
    }
  };

  const handleSave = (field) => {
    switch(field) {
      case 'name':
        plant.name = editedName;
        setEditingName(false);
        update(ref(db, `users/${user.uid}/plants/${plant.id}`), { name: editedName });
        break;
      case 'lastTimeWatered':
        plant.lastTimeWatered = editedLastTimeWatered;
        setEditingLastTimeWatered(false);
        update(ref(db, `users/${user.uid}/plants/${plant.id}`), { lastTimeWatered: editedLastTimeWatered });
        break;
      case 'description':
        plant.description = editedDescription;
        setEditingDescription(false);
        update(ref(db, `users/${user.uid}/plants/${plant.id}`), { description: editedDescription });
        break;
      default:
        break;
    }
  }

  const deletePlant = async (plantId) => {
    const plantRef = ref(db, `users/${user.uid}/plants/${plantId}`);
    try {
      await remove(plantRef)
      // to do - navigate back to MyPlants
      console.log(route.params)
      //route.params.refreshPlants
      navigation.goBack()
      console.log(`Plant with ID ${plantId} has been deleted.`)
    } catch (error) {
      console.error(`Error deleting plant with ID ${plantId}: `, error);
    }
  }

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
          <View style={styles.spacing}>
            {editingName ? (
              <TextInput
                style={[styles.plantName, styles.text]}
                value={editedName}
                onChangeText={(text) => setEditedName(text)}
                onSubmitEditing={() => handleSave('name')}
              />
            ) : (
              <>
                <Text style={[styles.plantName, styles.text]}>
                  {plant.name[0].toUpperCase()}{plant.name.slice(1)}
                  <TouchableOpacity onPress={() => handleEdit('name')}>
                    <FontAwesome
                      name="pencil"
                      size={14}
                      color={theme.colors.mediumGrey}
                      style={styles.pencilIcon}
                    />
                  </TouchableOpacity>
                </Text>
              </>
            )}
          </View>
          <View style={styles.spacing}>
            <Text style={[styles.lastWateredText, styles.text]}>
              Last watered:
            </Text>
            <DatePicker
              useNativeDriver={true}
              date={editedLastTimeWatered}
              mode="date"
              placeholder="Last time you watered this plant?"
              format="YYYY-MM-DD"
              minDate="2020-01-01"
              maxDate={today()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={[{width: '80%'}, styles.lastWateredText, styles.text]}
              customStyles={{
                dateIcon: {
                  display: 'none'
                },
                dateInput: {
                  borderColor: 'transparent',
                  textAlign: 'center'
                },
              }}
              onDateChange={(date) => {
                setEditedLastTimeWatered(date)
                handleSave('lastTimeWatered')
              }}
            />
            <FontAwesome
              name="pencil"
              size={14}
              color={theme.colors.mediumGrey}
              style={styles.pencilIcon}
            />
            {/* {!editingLastTimeWatered &&
                                <FontAwesome
                                name="pencil"
                                size={14}
                                color={theme.colors.mediumGrey}
                                style={styles.pencilIcon}
                              />
             } */}
                {/* <Text style={[styles.lastWateredText, styles.text]}>
                    Last watered: {plant.lastTimeWatered}
                  <TouchableOpacity onPress={() => handleEdit('lastTimeWatered')}>
                    <FontAwesome
                      name="pencil"
                      size={14}
                      color={theme.colors.mediumGrey}
                      style={styles.pencilIcon}
                    />
                  </TouchableOpacity>
                </Text>
              </> */}
          </View>
          <Text style={[styles.wateringText, styles.text, styles.spacing]}>
            Needs watering today 💚
          </Text>
          <View style={styles.spacing}>
          {editingDescription ? (
              <TextInput
                style={styles.text}
                value={editedDescription}
                onChangeText={(text) => setEditedDescription(text)}
                onSubmitEditing={() => handleSave('description')}
              />
            ) : (
              <>
                <Text style={styles.text}>
                  {plant.description}
                  <TouchableOpacity onPress={() => handleEdit('description')}>
                    <FontAwesome
                      name="pencil"
                      size={14}
                      color={theme.colors.mediumGrey}
                      style={styles.pencilIcon}
                    />
                  </TouchableOpacity>
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
      <View>
        <View style={styles.spacing}>
          <CustomButton
            title='Water Now'
            onPress={() => navigation.goBack()}
            fontSize={20}
          />
            <CustomButton
              title='Delete Plant'
              onPress={() => deletePlant(plant.id)}
              backgroundColor={theme.colors.red}
            />
        </View>
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
    paddingVertical: 0,
    flex:1
  },
  plantInfo: {
    width: 300,
  },
  plantName: {
    paddingTop: 20,
    fontSize: 30,
    color: '#333432',
  },
  plantImage: {
    width: 300,
    height: 300,
    borderRadius: 5,
    borderColor: '#E5E5E5',
    borderWidth: 2,
  },
  lastWateredText: {
    fontFamily: 'Comfortaa_300Light',
    fontSize: 16,
  },
  wateringText: {
    color: '#333432',
    fontSize: 14,
  },
  waterPlantButton: {
    fontSize: 20
  },
  goBackLink: {
    fontSize: 14
  },
  text: {
    textAlign: 'center',
  },
  pencilIcon: {
    marginTop: 6,
    marginLeft: 8
  },
  spacing: {
    paddingTop: 5
  }
});
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

function Plant({ route, navigation }) {
  const plant = route.params.plant;
  const db = getDatabase(app);
  const { user } = useContext(AuthContext)
  const theme = useContext(ThemeContext)

  const [plantDeleted, setPlantDeleted] = useState(false);
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
      //route.params.refreshPlants
      await setPlantDeleted(true)
      await navigation.navigate(
        'MyPlants', {plantDeleted: plantDeleted})
      console.log(`Plant with ID ${plantId} has been deleted. ${plantDeleted}`)
    } catch (error) {
      console.error(`Error deleting plant with ID ${plantId}: `, error);
    }
  }

  return (
    <ScrollView>

      <View style={styles.plantContainer}>
        <View style={styles.plantImage}>
          <Image
            style={theme.fullWidth}
            source={{
              uri: plant.image
            }}
          />
        </View>
        <View style={styles.plantInfo}>
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
                <TouchableOpacity onPress={() => handleEdit('name')}>
                  <View style={theme.flexForm}>
                    <Text style={[styles.plantName, styles.text]}>
                    {plant.name[0].toUpperCase()}{plant.name.slice(1)}
                    </Text>
                    <FontAwesome
                      name="pencil"
                      size={14}
                      color={theme.colors.mediumGrey}
                      style={styles.pencilIconLargeText}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={[styles.spacing, theme.flexForm]}>
            <Text style={styles.text}>
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
              style={[{width: '27%'}, styles.text]}
              customStyles={{
                dateIcon: {
                  display: 'none'
                },
                dateInput: {
                  borderColor: 'transparent',
                  alignItems: 'flex-start',
                  marginLeft: 4
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
                <TouchableOpacity onPress={() => handleEdit('description')}>
                  <View style={theme.flexForm}>
                    <Text style={styles.text}>
                      {plant.description}
                    </Text>
                    <FontAwesome
                      name="pencil"
                      size={14}
                      color={theme.colors.mediumGrey}
                      style={styles.pencilIcon}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
      </View>
      <View>
        <View style={[styles.spacingLarge, theme.flexForm, {justifyContent: 'space-around'}]}>
          <CustomButton
            title='Water Now'
            onPress={() => navigation.goBack()}
            />
          <CustomButton
            title='Delete Plant'
            onPress={() => deletePlant(plant.id)}
            backgroundColor={theme.colors.red}
            />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.goBackLink, styles.text, styles.spacingLarge]}>
            Go back to my plants
          </Text>
        </TouchableOpacity>
      </View>
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
    width: '100%',
    height: 250,
    borderColor: '#E5E5E5',
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  lastWateredText: {
    fontFamily: 'Comfortaa_300Light',
    fontSize: 16,
    marginRight: 5
  },
  wateringText: {
    color: '#333432',
    fontSize: 14,
  },
  goBackLink: {
    fontSize: 14
  },
  text: {
    textAlign: 'center',
  },
  pencilIconLargeText: {
    marginTop: 6,
    marginLeft: 8,
  },
  pencilIcon: {
    marginBottom: 18,
    marginLeft: 8,
  },
  spacing: {
    paddingTop: 5
  },
  spacingLarge: {
    paddingTop: 20
  },
});
import { useState, useContext } from 'react'
import { StyleSheet, TextInput, View, Button, Image, ActivityIndicator, Text } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import DatePicker from 'react-native-datepicker'
import * as ImagePicker from "expo-image-picker"
import { getDatabase } from 'firebase/database'
import { firebase } from '../firebaseConfig'
import { getAuth } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'
import { today, resetForm } from '../utils/utilityFunctions'
//import NewPlantForm from "../components/NewPlantForm"
import FormButtonGroup from "../components/FormButtonGroup"

const NewPlant = () => {
  const [image, setImage] = useState(null)
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null)
  const [name, setName] = useState(null)
  const [wateringFrequency, setWateringFrequency] = useState(null)
  const [weeklyOrMonthly, setWeeklyOrMonthly] = useState(null)
  const [lastTimeWatered, setLastTimeWatered] = useState()
  const [description, setDescription] = useState(null)
  const [uploading, setUploading] = useState(false)
  const { user } = useContext(AuthContext)
  const auth = getAuth()
  const theme = useContext(ThemeContext)

  const numbers = [
    { key: 0, section: true, label: `How many times do you water this plant${weeklyOrMonthly ? ' ' + weeklyOrMonthly.toLowerCase() : ''}?` },
    { key: 1, label: '1' },
    { key: 2, label: '2' },
    { key: 3, label: '3' },
    { key: 4, label: '4' },
    { key: 5, label: '5' },
    { key: 6, label: '6' },
    { key: 7, label: '7' }
  ]

  const weeklyMonthlyOptions = [
    { key: 0, section: true, label: 'Does this plant need watering weekly or monthly?' },
    { key: 1, label: 'Weekly' },
    { key: 2, label: 'Monthly' }
  ]

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // 0 means compress for small size, 1 means compress for maximum quality
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const resetNewPlantForm = () => {
    resetForm([
      setName,
      setDescription,
      setLastTimeWatered,
      setWateringFrequency,
      setWeeklyOrMonthly,
      setImage
    ])
  }

  const createPlantInFirebaseDb = (name, description, imageDownloadUrl, lastTimeWatered, wateringFrequency, weeklyOrMonthly) => {
    const newPlantRef = firebase.database().ref(`users/${user.uid}/plants`).push()
    const newPlant = {
      id: newPlantRef.key,
      name,
      description,
      image: imageDownloadUrl,
      lastTimeWatered,
      wateringFrequency,
      weeklyOrMonthly
    }
    newPlantRef.set(newPlant)
      .then(() => {
        console.log(newPlant)
        alert('Plant saved!!')
        resetNewPlantForm()
      })
      .catch(error => console.error(error))
  }

  const uploadImageAndSavePlant = async () => {
    try {
      setUploading(true)
      const response = await fetch(image)
      const blob = await response.blob()
      const imageId = Math.random().toString(36).substring(7)
      const ref = firebase.storage().ref().child(`plant-pics/${imageId}`)
      await ref.put(blob)
      const downloadUrl = await ref.getDownloadURL()
      await setImageDownloadUrl(downloadUrl)
      await createPlantInFirebaseDb(name, description, imageDownloadUrl, lastTimeWatered, wateringFrequency, weeklyOrMonthly)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  function handleSubmit() {
    uploadImageAndSavePlant();
  }

  // TODO add the rest of the new plant form.
  // also, fix the flow here for uploading images.. add option to take an image as well as upload. change the Upload image button to an icon.
  // TODO maybe use a step wizard to step through creating the plant? (do this last)
  return (
    <View style={[{flex: 1}, theme.center]}>
      {/* TODO: refactor and put in separate components */}
      {/* <NewPlantForm
        name={name}
        description={description}
        lastTimeWatered={lastTimeWatered}
        wateringFrequency={wateringFrequency}
        weeklyOrMonthly={weeklyOrMonthly}
      /> */}
        <TextInput
        style={[theme.input, theme.formItemSpacing]}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName}
        />
        <TextInput
          style={[theme.input, theme.formItemSpacing]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View style={theme.formItemSpacing}>
          <Text style={styles.labelText}>How much watering does this plant need?</Text>
        </View>
        <View style={theme.flexForm}>
          <ModalSelector
            data={numbers}
            initValue="1"
            onChange={(option)=>{
              setWateringFrequency(option.label)
              alert(`you selected ${option.label}`)
            }}
          >
          <TextInput
            style={[
              theme.input,
              theme.formItemSpacing,
              {width: '100%'}
            ]}
            editable={false}
            placeholder="1"
            value={wateringFrequency}
          />
          </ModalSelector>
          <Text> x </Text>
          <ModalSelector
            data={weeklyMonthlyOptions}
            initValue="Weekly"
            onChange={(option)=>{
              setWeeklyOrMonthly(option.label)
              alert(`you selected ${option.label}`)
            }}
          >
            <TextInput
              style={[
                theme.input,
                theme.formItemSpacing,
                {width: '100%'}
              ]}
              editable={false}
              placeholder="Weekly"
              value={weeklyOrMonthly}
            />
          </ModalSelector>
        </View>
        <DatePicker
          useNativeDriver={true}
          date={lastTimeWatered}
          mode="date"
          placeholder="Last time you watered this plant?"
          format="YYYY-MM-DD"
          minDate="2020-01-01"
          maxDate={today()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          style={[theme.input, {width: '80%'}]}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 32,
              borderColor: 'transparent'
            },
          }}
          onDateChange={(date) => {setLastTimeWatered(date)}}
        />
        {image &&
          <Image
            source={{uri: image}}
            style={{width: 170 , height: 200}}
          />
        }
        <Button title='Select Image' onPress={pickImage} />
        {uploading &&
          <ActivityIndicator size={'small'} color='black' />
        }
      <FormButtonGroup
        resetForm={() => resetNewPlantForm()}
        handleSubmit={handleSubmit}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  labelText: {
    textAlign: 'center'
  }
})

export default NewPlant
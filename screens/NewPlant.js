import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator} from 'react-native';
import * as ImagePicker from "expo-image-picker"
import { firebase } from '../firebaseConfig'
import { getDatabase } from 'firebase/database';
import { randstr } from '../utils/utilityFunctions';



function NewPlant({ navigation }) {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // We can specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // 0 means compress for small size, 1 means compress for maximum quality
    });

    // note that logging the full result throws a warning about Cancelled being deprecated
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      console.log(image, 'image')
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    // TODO make this work, need some way to generate an ID
    // Need to check firebase docs to see if there is a way to generate IDs, create date & create time automatically.
    const imageId = randstr('plant')
    // TODO: Link the current user here. users should be linked to their plants
    const ref = firebase.storage().ref().child(`plant-pics/${imageId}`);
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      async () => {
        try {
          const url = await snapshot.snapshot.ref.getDownloadURL();
          setUploading(false);
          console.log("Download URL: ", url);
          // TODO fix this- currently we are not ending up with the url in the DB, but we are able to get them in storage.
          // Save the download URL to the Firebase Realtime Database
          // const databaseRef = getDatabase();
          // databaseRef.ref('images').push({ url: url });
          setImage(url);
          blob.close();
          return url;
        } catch (error) {
          setUploading(false);
          console.log(error);
          blob.close();
          return;
        }
      }
    )
  }

  // TODO add the rest of the new plant form.
  // also, fix the flow here for uploading images.. add option to take an image as well as upload. change the Upload image button to an icon.
  // TODO maybe use a step wizard to step through creating the plant? (do this last)
  return (
    <View style={styles.container}>
    {image && <Image source={{uri: image}} style={{width: 170 , height: 200}}/>}
    <Button title='Select Image' onPress={pickImage} />
    {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewPlant
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { firebase } from '../firebaseConfig'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user)
    })
  }, [])

  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Get the newly created user's ID
        const userId = userCredential.user.uid
        // Add the user's email to the database
        firebase.database().ref(`users/${userId}`).set({
          email: email,
        }, (error) => {
          if (error) {
            console.log('Error adding user to database:', error)
          } else {
            console.log('User added to database')
          }
        })
      console.log('User account created')
    })
    .catch((err) => setError(err.message))
  }

  const handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      console.log('User signed in')
    })
    .catch((err) => setError(err.message))
  }

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('User signed out')
    })
    .catch((err) => setError(err.message))
  }

  // TODO styling and make this 2 separate screens (or tabs? sign in and sign up should be separate)
  return (
    <View style={styles.container}>
      {!isSignedIn && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Sign up" onPress={handleSignUp} />
          <Button title="Sign in" onPress={handleSignIn} />
        </>
      )}
      {isSignedIn && <Button title="Sign out" onPress={handleSignOut} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
})
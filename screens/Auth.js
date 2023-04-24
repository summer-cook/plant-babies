import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { ThemeContext } from '../context/ThemeContext';
import { firebase } from '../firebaseConfig'

export default function LoginScreen() {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser)
      } else {
        // User is signed out
        setUser(null)
      }
    })

    // Clean up the listener
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Get the newly created user's ID
        const userId = userCredential.user.uid
        // Add the user's email to the database
        firebase
          .database()
          .ref(`users/${userId}`)
          .set(
            {
              email: email,
            },
            (error) => {
              if (error) {
                console.log('Error adding user to database:', error)
              } else {
                console.log('User added to database')
              }
            }
          )
        console.log('User account created')
      })
      .catch((err) => setError(err.message))
  }

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in')
      })
      .catch((err) => setError(err.message))
  }

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('User signed out')
      })
      .catch((err) => setError(err.message))
  }

  // Show the sign in/sign up form if there is no user signed in
  // TODO styling and make this 2 separate screens (or tabs? sign in and sign up should be separate)
  if (!user) {
    return (
      <View style={[{flex: 1}, theme.center]}>
        <TextInput
          style={[theme.input, theme.formItemSpacing]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[theme.input, theme.formItemSpacing]}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign up" onPress={handleSignUp} />
        <Button title="Sign in" onPress={handleSignIn} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    )
  }

  // Show the sign out button if there is a user signed in
  return (
    <View style={[{flex: 1}, theme.center]}>
      <Text style={styles.text}>You are signed in as {user.email}</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginTop: 10,
  },
  text: {
    marginHorizontal: 50,
    textAlign: 'center'
  }
})

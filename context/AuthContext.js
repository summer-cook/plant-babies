import React, { createContext, useState } from 'react'
import { firebase } from '../firebaseConfig'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    setUser(firebaseUser)
  })

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
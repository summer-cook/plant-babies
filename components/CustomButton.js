import React from "react"
import { TouchableOpacity, StyleSheet, Text } from "react-native";

function CustomButton({ title, onPress, fontSize }) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#AAC9CF',
      borderRadius: 4
    },
    text: {
      textTransform: 'uppercase',
      color: '#fff',
      letterSpacing: 1,
      padding: 10,
      textAlign: 'center',
      fontSize: fontSize
    },
  });

    return (
      <TouchableOpacity 
        style={styles.button}
        onPress={onPress}
        color='#fff'
        activeOpacity={0.8}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }

export default CustomButton
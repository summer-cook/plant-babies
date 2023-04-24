import React, { useContext } from "react"
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { ThemeContext } from '../context/ThemeContext';


function CustomButton({ title, onPress, fontSize, backgroundColor }) {
  const theme = useContext(ThemeContext)
  const styles = StyleSheet.create({
    button: {
      backgroundColor: backgroundColor || theme.colors.blue,
      borderRadius: 4
    },
    text: {
      textTransform: 'uppercase',
      color: theme.colors.white,
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
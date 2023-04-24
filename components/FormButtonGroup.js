import React, { useContext } from "react"
import { View } from "react-native";
import { ThemeContext } from '../context/ThemeContext'
import CustomButton from './CustomButton'

const FormButtonGroup = ({ resetForm, handleSubmit }) => {
  const theme = useContext(ThemeContext)
  return (
    <View style={[theme.flexForm, theme.formItemSpacing]}>
      <CustomButton
        onPress={resetForm}
        title="Reset Form"
      />
      <CustomButton
        backgroundColor={theme.colors.periwinkle}
        onPress={handleSubmit}
        title="Create Plant"
      />
    </View>
  )
}

export default FormButtonGroup
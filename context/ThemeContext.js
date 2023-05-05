import { createContext } from 'react';

// TODO: use colors everywhere
const colors = {
  green: '#007AFF',
  blue: '#AAC9CF',
  red: '#d99eb3',
  periwinkle: '#a1a7c9',
  backgroundGrey: '#F5F5F5',
  borderGrey: '#E2E2E2',
  darkGrey: '#6D6D6D',
  mediumGrey: '#a6a7ab',
  white: '#ffffff'
}
const theme = {
  colors: colors,
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: colors.borderGrey,
    backgroundColor: colors.white
  },
  formItemSpacing: {
    width: '80%',
    marginVertical: 4,
  },
  flexForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const ThemeContext = createContext(theme);
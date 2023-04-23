import { createContext } from 'react';

const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#6D6D6D',
    background: '#F5F5F5',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#E2E2E2',
    backgroundColor: '#ffffff'
  },
  formItemSpacing: {
    width: '80%',
    marginVertical: 4,
  },
};

export const ThemeContext = createContext(theme);
import { DefaultTheme } from 'react-native-paper'

const CustomTheme = {
  ...DefaultTheme,
  roundness: 3,
  fonts: {
    ...DefaultTheme.fonts
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#006494',
    secondary: '#bee9e8',
    error: '#F72E2E',
    success: '#22C66A',
    warning: '#f1c40f',
    info: '#24AFEC',
    white: '#FFFFFF',
    onSurface: '#061A27',
    background: '#ffffff',
    outline: '#ced4da'
  }
}

export type CustomThemeProps = typeof CustomTheme

export default CustomTheme

import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { DefaultTheme as RNDefaultTheme, DarkTheme as RNDarkTheme } from '@react-navigation/native';
import { colors } from '../styles/colors';

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
};

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationLight: RNDefaultTheme,
  reactNavigationDark: RNDarkTheme,
  materialDark: MD3DarkTheme,
  materialLight: MD3LightTheme,
});

export { LightTheme as navigationLightTheme, DarkTheme as navigationDarkTheme, lightTheme };

import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { colors } from './styles/colors';
import AppBar from './Components/AppBar';
import JobListScreen from './Screens/JobListScreen';
import JobScreen from './Screens/JobScreen';
import { JobAdvertisementProvider } from './hooks/usejobadvertisements';
import JobFilterScreen from './Screens/JobFilterScreen';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import OrganizationScreen from './Screens/OrganizationScreen';
// eslint-disable-next-line no-unused-vars
import fi from 'dayjs/locale/fi';

dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.locale('fi');
dayjs.tz.setDefault('Europe/Helsinki');

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <JobAdvertisementProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: (props) => <AppBar {...props} />,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Jobs" component={JobListScreen} />
            <Stack.Screen name="Job" component={JobScreen} />
            <Stack.Screen name="Filter" component={JobFilterScreen} />
            <Stack.Screen name="Organization" component={OrganizationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </JobAdvertisementProvider>
  );
}

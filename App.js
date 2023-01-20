import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { colors } from './styles/colors';
import AppBar from './Components/AppBar';
import JobListScreen from './Screens/JobListScreen';
import JobScreen from './Screens/JobScreen';
import { JobAdvertisementProvider } from './hooks/usejobadvertisements';
import OrganizationsListScreen from './Screens/OrganizationsListScreen';

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
            <Stack.Screen name="Organizations" component={OrganizationsListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </JobAdvertisementProvider>
  );
}

import { useCallback } from 'react';
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
// eslint-disable-next-line no-unused-vars
import fi from 'dayjs/locale/fi';
import OrganizationScreen from './Screens/OrganizationScreen';
import { OnboardingProvider, useOnboarding } from './hooks/useonboarding';
import WelcomeScreen from './Screens/onboarding/WelcomeScreen';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import PersonalisationScreen from './Screens/onboarding/PersonalisationScreen';
import { JobLocationProvider } from './hooks/usejoblocations';
import { JobTaskProvider } from './hooks/usejobtasks';
import FavoritesScreen from './Screens/FavoritesScreen';

SplashScreen.preventAutoHideAsync();

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

export default function App() {
  return (
    <OnboardingProvider>
      <AppWrapper />
    </OnboardingProvider>
  );
}

const Stack = createStackNavigator();

function AppWrapper() {
  const { onboardingDone } = useOnboarding();

  const onReady = useCallback(() => {
    if (onboardingDone !== undefined) {
      SplashScreen.hideAsync();
    }
  }, [onboardingDone]);

  if (onboardingDone === undefined) {
    return <></>;
  }

  return (
    <JobAdvertisementProvider>
      <JobLocationProvider>
        <JobTaskProvider>
          <PaperProvider theme={theme}>
            <StatusBar style="inverted" />
            <NavigationContainer onReady={onReady}>
              <Stack.Navigator
                screenOptions={{
                  header: (props) => <AppBar {...props} />,
                  headerShown: onboardingDone,
                }}
              >
                {onboardingDone === true ? (
                  <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Jobs" component={JobListScreen} />
                    <Stack.Screen name="Job" component={JobScreen} />
                    <Stack.Screen name="Filter" component={JobFilterScreen} />
                    <Stack.Screen name="Organization" component={OrganizationScreen} />
                    <Stack.Screen name="Favorites" component={FavoritesScreen} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Personalisation" component={PersonalisationScreen} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </JobTaskProvider>
      </JobLocationProvider>
    </JobAdvertisementProvider>
  );
}

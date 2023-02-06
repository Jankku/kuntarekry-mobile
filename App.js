import 'react-native-gesture-handler';
import { useCallback } from 'react';
import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
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
import { lightTheme, navigationLightTheme } from './styles/theme';
import { FavoriteListProvider } from './hooks/usefavoritelist';
SplashScreen.preventAutoHideAsync().catch(console.warn);

dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.locale('fi');
dayjs.tz.setDefault('Europe/Helsinki');

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <OnboardingProvider>
      <AppWrapper />
    </OnboardingProvider>
  );
}

const Stack = createStackNavigator();

function StackScreen() {
  return (
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
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

function AppWrapper() {
  const { onboardingDone } = useOnboarding();

  const onReady = useCallback(async () => {
    if (onboardingDone !== undefined) {
      await SplashScreen.hideAsync();
    }
  }, [onboardingDone]);

  if (onboardingDone === undefined) {
    return null;
  }

  return (
    <JobAdvertisementProvider>
      <JobLocationProvider>
        <JobTaskProvider>
          <FavoriteListProvider>
            <PaperProvider theme={lightTheme}>
              <StatusBar style="inverted" />
              <NavigationContainer theme={navigationLightTheme} onReady={onReady}>
                <Drawer.Navigator
                  useLegacyImplementation
                  drawerContent={(props) => <CustomDrawerContent {...props} />}
                  screenOptions={{
                    header: (props) => <AppBar {...props} />,
                    headerShown: onboardingDone,
                  }}
                >
                  {onboardingDone === true ? (
                    <>
                      <Drawer.Screen
                        name="Stack"
                        component={StackScreen}
                        options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
                      />
                      <Drawer.Screen name="Työpaikat" component={JobListScreen} />
                      <Drawer.Screen name="Työpaikat sijainnin mukaan" component={JobListScreen} />
                      <Drawer.Screen name="Työpaikat tehtävän mukaan" component={JobListScreen} />
                    </>
                  ) : (
                    <>
                      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
                      <Drawer.Screen name="Personalisation" component={PersonalisationScreen} />
                    </>
                  )}
                </Drawer.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </FavoriteListProvider>
        </JobTaskProvider>
      </JobLocationProvider>
    </JobAdvertisementProvider>
  );
}

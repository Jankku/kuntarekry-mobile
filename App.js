import 'react-native-gesture-handler';
import { useCallback, useEffect } from 'react';
import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
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
import { lightTheme, navigationLightTheme } from './styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { PersonalisationProvider, usePersonalisation } from './hooks/usepersonalisation';
import 'intl-pluralrules';
import './i18n/config';
import { FavoriteListProvider } from './hooks/usefavoritelist';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './Components/LanguageSelector';
import FavoritesScreen from './Screens/FavoritesScreen';
import { useState } from 'react';
import ResetOnboardingModal from './Components/ResetOnboardingModal';

SplashScreen.preventAutoHideAsync().catch(console.warn);

dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.locale('fi');
dayjs.tz.setDefault('Europe/Helsinki');

function CustomDrawerContent(props) {
  const { t } = useTranslation();
  const { resetOnboarding } = useOnboarding();

  const handleResetOnboarding = useCallback(() => {
    resetOnboarding();
    props.navigation.closeDrawer();
  }, [props.navigation, resetOnboarding]);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);

  const handleChangeLocationTaskArea = () => {
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmationModalYes = () => {
    handleResetOnboarding();
    setIsConfirmationModalVisible(false);
  };

  const handleConfirmationModalNo = () => {
    setIsConfirmationModalVisible(false);
  };

  return (
    <>
      <ResetOnboardingModal
        visible={isConfirmationModalVisible}
        onYesPress={handleConfirmationModalYes}
        onNoPress={handleConfirmationModalNo}
      />
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#0a8bc2', '#33cc80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.0, y: 1.9 }}
      >
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <DrawerItem
          label={t('drawer.changeLocationTaskArea')}
          onPress={handleChangeLocationTaskArea}
          labelStyle={{ color: 'white' }}
        />
        <LanguageSelector />
      </LinearGradient>
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <OnboardingProvider>
      <PersonalisationProvider>
        <AppWrapper />
      </PersonalisationProvider>
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
  const { t } = useTranslation();
  const { onboardingDone } = useOnboarding();
  const { i18n } = useTranslation();
  const { lang } = usePersonalisation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

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
                    drawerContentContainerStyle: {
                      backgroundColor: '#c6cbef',
                    },
                    drawerActiveTintColor: 'white',
                    drawerInactiveTintColor: 'white',
                  }}
                >
                  {onboardingDone === true ? (
                    <>
                      <Drawer.Screen
                        name="Stack"
                        component={StackScreen}
                        options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
                      />
                      <Drawer.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ drawerLabel: t('drawer.home') }}
                      />
                      <Drawer.Screen
                        name="Jobs"
                        component={JobListScreen}
                        options={{ drawerLabel: t('drawer.jobs') }}
                      />
                      <Drawer.Screen
                        name="Employers"
                        component={JobFilterScreen}
                        options={{ drawerLabel: t('drawer.employers') }}
                        initialParams={{ list: 'organizations' }}
                      />
                      <Drawer.Screen
                        name="regions"
                        component={JobFilterScreen}
                        options={{ drawerLabel: t('drawer.regions') }}
                        initialParams={{ list: 'regions' }}
                      />
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

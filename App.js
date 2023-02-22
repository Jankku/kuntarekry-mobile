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
import { List, Chip, Provider as PaperProvider } from 'react-native-paper';
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
import { LinearGradient } from 'expo-linear-gradient';
import { PersonalisationProvider, usePersonalisation } from './hooks/usepersonalisation';
import 'intl-pluralrules';
import './i18n/config';
import { FavoriteListProvider } from './hooks/usefavoritelist';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './Components/LanguageSelector';
import { Modal, View, Text } from 'react-native';
import { useState } from 'react';

SplashScreen.preventAutoHideAsync().catch(console.warn);

dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.locale('fi');
dayjs.tz.setDefault('Europe/Helsinki');

function CustomDrawerContent(props) {
  const { resetOnboarding } = useOnboarding();

  const handleResetOnboarding = useCallback(() => {
    resetOnboarding();
    props.navigation.closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetOnboarding]);

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
      <Modal visible={isConfirmationModalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>
              Oletko varma että haluat muuttaa toimialaa/sijaintia? (Sovellus unohtaa tämänhetkiset
              valintasi)
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10, padding: 5 }}>
              <Chip onPress={handleConfirmationModalYes} style={{ padding: 5 }}>
                Yes
              </Chip>
              <Chip onPress={handleConfirmationModalNo} style={{ marginLeft: 15, padding: 5 }}>
                No
              </Chip>
            </View>
          </View>
        </View>
      </Modal>
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#0a8bc2', '#33cc80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.0, y: 1.9 }}
      >
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <List.Section>
            <List.Accordion
              theme={{
                colors: {
                  background: 'transparent',
                },
              }}
              right={(props) =>
                props.isExpanded === false ? (
                  <List.Icon {...props} color={'white'} icon="plus" />
                ) : (
                  <List.Icon {...props} color={'white'} icon="minus" />
                )
              }
              titleStyle={{ color: 'white' }}
              title="Työpaikat sijainnin mukaan"
            >
              <List.Item titleStyle={{ color: 'white' }} title="Ahvenanmaa" />
              <List.Item titleStyle={{ color: 'white' }} title="Etelä-Karjala" />
              <List.Item titleStyle={{ color: 'white' }} title="Etelä-Pohjanmaa" />
              <List.Item titleStyle={{ color: 'white' }} title="Etelä-Savo" />
              <List.Item titleStyle={{ color: 'white' }} title="Kainuu" />
              <List.Item titleStyle={{ color: 'white' }} title="Kanta-Häme" />
              <List.Item titleStyle={{ color: 'white' }} title="Keski-Pohjanmaa" />
              <List.Item titleStyle={{ color: 'white' }} title="Keski-Suomi" />
              <List.Item titleStyle={{ color: 'white' }} title="Kymenlaakso" />
              <List.Item titleStyle={{ color: 'white' }} title="Lappi" />
              <List.Item titleStyle={{ color: 'white' }} title="Pirkanmaa" />
              <List.Item titleStyle={{ color: 'white' }} title="Pohjanmaa" />
              <List.Item titleStyle={{ color: 'white' }} title="Pohjois-Karjala" />
              <List.Item titleStyle={{ color: 'white' }} title="Pohjois-Pohjanmaa" />
              <List.Item titleStyle={{ color: 'white' }} title="Pohjois-Savo" />
              <List.Item titleStyle={{ color: 'white' }} title="Päijät-Häme" />
              <List.Item titleStyle={{ color: 'white' }} title="Satakunta" />
              <List.Item titleStyle={{ color: 'white' }} title="Uusimaa" />
              <List.Item titleStyle={{ color: 'white' }} title="Varsinais-Suomi" />
              <List.Item titleStyle={{ color: 'white' }} title="Ulkomaat" />
            </List.Accordion>

            <List.Accordion
              theme={{ colors: { background: 'transparent' } }}
              right={(props) =>
                props.isExpanded === false ? (
                  <List.Icon {...props} color={'white'} icon="plus" />
                ) : (
                  <List.Icon {...props} color={'white'} icon="minus" />
                )
              }
              titleStyle={{ color: 'white' }}
              title="Työpaikat tehtävän mukaan"
            >
              <List.Item titleStyle={{ color: 'white' }} title="Hallinto- ja toimistotyö" />
              <List.Item titleStyle={{ color: 'white' }} title="Opetus- ja kulttuuriala" />
              <List.Item titleStyle={{ color: 'white' }} title="Sosiaaliala" />
              <List.Item titleStyle={{ color: 'white' }} title="Tekninen ala" />
              <List.Item titleStyle={{ color: 'white' }} title="Terveydenhuoltoala" />
              <List.Item titleStyle={{ color: 'white' }} title="Vapaaehtoistyö" />
            </List.Accordion>
          </List.Section>
        </DrawerContentScrollView>
        <DrawerItem
          label="Vaihda toimiala/sijainti"
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
                      <Drawer.Screen name="Työpaikat" component={JobListScreen} />
                      <Drawer.Screen name="Uusimmat työpaikat" component={JobListScreen} />
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

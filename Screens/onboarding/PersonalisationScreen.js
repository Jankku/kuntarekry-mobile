import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../Components/onboarding/BackButton';
import ForwardButton from '../../Components/onboarding/ForwardButton';
import LanguageDropdown from '../../Components/onboarding/LanguageDropdown';
import LocationDropdown from '../../Components/onboarding/LocationDropdown';
import TaskDropdown from '../../Components/onboarding/TaskDropdown';
import { useOnboarding } from '../../hooks/useonboarding';
import { LANGUAGE_KEY, LOCATION_KEY, TASK_KEY } from '../../hooks/usepersonalisation';

export default function PersonalisationScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { finishOnboarding } = useOnboarding();

  const onChangeLanguage = useCallback(
    async (value) => {
      try {
        await AsyncStorage.setItem(LANGUAGE_KEY, String(value));
        await i18n.changeLanguage(value);
      } catch (error) {
        console.error(error);
      }
    },
    [i18n]
  );

  const onChangeLocation = useCallback(async (value) => {
    try {
      await AsyncStorage.setItem(LOCATION_KEY, String(value));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onChangeTask = useCallback(async (value) => {
    try {
      await AsyncStorage.setItem(TASK_KEY, String(value));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <LinearGradient colors={['#0a8bc2', '#33cc80']} style={styles.gradient}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../../assets/logo.png')}
            resizeMode="center"
            style={styles.image}
          />

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">{t('personalisation.title')}</Text>

              <View style={styles.section}>
                <Text variant="titleMedium">{t('personalisation.language.title')}</Text>
                <LanguageDropdown onChange={onChangeLanguage} />
              </View>

              <View style={styles.section}>
                <Text variant="titleMedium">{t('personalisation.location.title')}</Text>
                <LocationDropdown onChange={onChangeLocation} />
              </View>
              <Divider />
              <View style={styles.section}>
                <Text variant="titleMedium">{t('personalisation.taskArea.title')}</Text>
                <TaskDropdown onChange={onChangeTask} />
              </View>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <BackButton onPress={() => navigation.navigate('Welcome')} />
            <ForwardButton onPress={() => finishOnboarding()} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  card: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  container: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  gradient: {
    flex: 1,
  },
  image: { width: '50%' },
  section: {
    paddingTop: 16,
  },
});

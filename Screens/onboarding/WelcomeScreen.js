import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForwardButton from '../../Components/onboarding/ForwardButton';
import SocialMediaButton from '../../Components/onboarding/SocialMediaButton';

export default function WelcomeScreen({ navigation }) {
  const { t } = useTranslation();

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
              <Text variant="titleMedium">{t('welcome.title')}</Text>

              <View style={styles.infoContainer}>
                <Text variant="bodyMedium" style={styles.infoText}>
                  {t('welcome.forJobSeeker.text', {
                    title: (
                      <Text style={styles.infoTextBold}>{t('welcome.forJobSeeker.title')}</Text>
                    ),
                  })}
                </Text>

                <Text variant="bodyMedium" style={styles.infoText}>
                  {t('welcome.forEmployer.text', {
                    title: (
                      <Text style={styles.infoTextBold}>{t('welcome.forEmployer.title')}</Text>
                    ),
                  })}
                </Text>
              </View>
              <Divider />
              <View style={styles.socialContainer}>
                <Text variant="titleMedium"> {t('welcome.findOnSocialMedia')}</Text>
                <View style={styles.socialList}>
                  <SocialMediaButton icon="facebook" link="https://www.facebook.com/kuntarekry" />
                  <SocialMediaButton icon="twitter" link="https://twitter.com/kuntarekry" />
                  <SocialMediaButton
                    icon="instagram"
                    link="https://www.instagram.com/kuntarekry/"
                  />
                  <SocialMediaButton
                    icon="linkedin"
                    link="https://www.linkedin.com/company/kl-kuntarekry-oy"
                  />
                </View>
              </View>
            </Card.Content>
          </Card>

          <ForwardButton onPress={() => navigation.navigate('Personalisation')} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
  infoContainer: {
    paddingVertical: 12,
  },
  infoText: {
    lineHeight: 20,
    paddingVertical: 4,
  },
  infoTextBold: { fontWeight: 'bold' },
  socialContainer: {
    paddingTop: 8,
  },
  socialList: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
});

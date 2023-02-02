import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForwardButton from '../../Components/onboarding/ForwardButton';
import SocialMediaButton from '../../Components/onboarding/SocialMediaButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={['#0a8bc2', '#33cc80']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/logo.png')} resizeMode="center" style={styles.image} />
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">
              Kuntarekrystä löytyy tuhansia avoimia työpaikkoja kaikkialta Suomesta.
            </Text>

            <View style={styles.infoContainer}>
              <Text variant="bodyMedium" style={styles.infoText}>
                <Text style={styles.infoTextBold}>Työnhakijoille</Text> tarjoamme työvälineet
                työpaikkojen, sijaisuuksien ja keikkatöiden hakemiseen sekä tietoa työskentelystä
                kuntaorganisaatioissa ja hyvinvointialueilla.
              </Text>

              <Text variant="bodyMedium" style={styles.infoText}>
                <Text style={styles.infoTextBold}>Työnantajille</Text> - kunnille, kaupungeille,
                hyvinvointialueille, kuntayhtymille ja kuntien omistamille yrityksille - tarjoamme
                rekrytoinnin ohjelmisto- ja asiantuntijapalveluja, jotka sopivat ulkoiseen ja
                sisäiseen rekrytointiin sekä sijaisuuksien hallintaan.
              </Text>
            </View>
            <Divider />
            <View style={styles.socialContainer}>
              <Text variant="titleMedium">Löydä Kuntarekry somessa</Text>
              <View style={styles.socialList}>
                <SocialMediaButton icon="facebook" link="https://www.facebook.com/kuntarekry" />
                <SocialMediaButton icon="twitter" link="https://twitter.com/kuntarekry" />
                <SocialMediaButton icon="instagram" link="https://www.instagram.com/kuntarekry/" />
                <SocialMediaButton
                  icon="linkedin"
                  link="https://www.linkedin.com/company/kl-kuntarekry-oy"
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        <ForwardButton onPress={() => navigation.navigate('Personalisation')} />
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
    flex: 1,
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

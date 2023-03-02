import { View, Text, StyleSheet, Image } from 'react-native';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import kuvaPng from '../assets/kuva.png';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from './PrimaryButton';

export default function OrganizationIntroduction() {
  const navigation = useNavigation();
  const { jobs } = useJobAdvertisements();
  // filter jobs with jobAdvertisement and profitcenter
  const filteredJobs = jobs.filter(
    (job) => job.jobAdvertisement && job.jobAdvertisement.profitCenter
  );
  // remove duplicates
  const uniqueJobs = Array.from(new Set(filteredJobs));
  // select random job
  const randomJob = uniqueJobs[Math.floor(Math.random() * uniqueJobs.length)];

  return (
    <View style={styles.bgColor}>
      <View style={styles.container}>
        {randomJob ? (
          <View style={{ width: '100%' }}>
            <Image source={kuvaPng} resizeMode="cover" style={{ width: '100%' }} />
            <Text style={styles.intro}>Tutustu työnantajiin</Text>
            <Text style={styles.title}>
              Kuntarekryssä on yli 300 työnantajaa.{' '}
              <Text style={styles.bold}>{randomJob.jobAdvertisement.profitCenter}</Text> on yksi
              heistä
            </Text>
            <Text style={styles.description}>{randomJob.jobAdvertisement.organizationDesc}</Text>
            <PrimaryButton
              onPress={() =>
                navigation.navigate('Organization', {
                  org: randomJob.jobAdvertisement.profitCenter,
                })
              }
            >
              Tutustu työnantajaan
            </PrimaryButton>
          </View>
        ) : (
          <Text>Ei töitä saatavilla tällä hetkellä.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  bold: {
    color: '#35ABE4',
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    fontSize: 15,
    paddingBottom: 16,
    paddingTop: 8,
  },
  intro: {
    color: 'rgba(0, 0, 0, 0.51)',
    fontSize: 14,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#35ABE4',
    fontSize: 21,
    fontWeight: 'normal',
  },
});

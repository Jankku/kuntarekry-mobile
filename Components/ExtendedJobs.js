import { View, Text, StyleSheet, Image } from 'react-native';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import Kuva1 from '../assets/Rectangle69.png';
import Kuva2 from '../assets/Rectangle69(1).png';
import Kuva3 from '../assets/Rectangle96.png';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from './PrimaryButton';

export default function ExtendedJobs() {
  const navigation = useNavigation();
  const { jobs } = useJobAdvertisements();
  // filter jobs with jobAdvertisement and profitcenter
  const filteredJobs = jobs.filter(
    (job) => job.jobAdvertisement && job.jobAdvertisement.profitCenter
  );
  // remove duplicates
  const uniqueJobs = Array.from(new Set(filteredJobs));
  // select 3 random jobs
  const randomJobs = uniqueJobs.sort(() => Math.random() - 0.5).slice(0, 3);

  const images = [Kuva1, Kuva2, Kuva3];
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>LAAJENNETUT TYÖPAIKKAILMOITUKSET</Text>
      <Text style={styles.headerText}>Kiinnostaisiko jokin näistä työpaikoista?</Text>
      {randomJobs.map((job, index) => (
        <View key={index} style={styles.jobContainer}>
          <Image source={images[index]} />
          <View style={{ maxWidth: '90%' }}>
            <Text style={styles.title}>{`${job.jobAdvertisement.profitCenter} työpaikat`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() =>
                navigation.navigate('Organization', {
                  org: job.jobAdvertisement.profitCenter,
                })
              }
            >
              Katso lisää
            </PrimaryButton>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 24,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#EEFAFF',
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 21,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  jobContainer: {
    paddingVertical: 16,
  },
  title: {
    color: '#167FAC',
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
  },
  topText: {
    color: '#727272',
    fontSize: 13,
    marginBottom: 5,
    marginTop: 10,
    textTransform: 'uppercase',
  },
});

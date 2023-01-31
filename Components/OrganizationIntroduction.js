import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import kuvaPng from '../assets/kuva.png';
export default function OrganizationIntroduction({ navigation }) {
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
          <View>
            <Image source={kuvaPng} />
            <Text style={styles.intro}>Tutustu työnantajiin</Text>
            <Text style={styles.title}>
              Kuntarekryssä on yli 300 työnantajaa.{' '}
              <Text style={styles.bold}>{randomJob.jobAdvertisement.profitCenter}</Text> on yksi
              heistä
            </Text>
            <Text>{randomJob.jobAdvertisement.organizationDesc}</Text>
            <Button
              onPress={() =>
                navigation.navigate('Organization', {
                  org: randomJob.jobAdvertisement.profitCenter,
                })
              }
            >
              Työnantajan sivuille
            </Button>
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
    backgroundColor: '#FFFFFF',
  },
  bold: {
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  intro: {
    fontSize: 14,
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: 'normal',
  },
});

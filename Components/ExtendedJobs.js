import { View, Text, StyleSheet, Image} from 'react-native';
import { Button } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import Kuva1 from '../assets/Rectangle69.png';
import Kuva2 from '../assets/Rectangle69(1).png';
import Kuva3 from '../assets/Rectangle96.png';

export default function ExtendedJobs() {
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
        <View key={index}>
          <Image source={images[index]} />
          <View style={{ maxWidth: '90%' }}>
          <Text  style={styles.blueText}>{job.jobAdvertisement.profitCenter + ' työpaikat'}</Text>
          </View>
          <Button style={styles.btn} ><Text style={{color: 'white'}}>KATSO LISÄÄ ></Text></Button>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  blueText: {
    color: '#167FAC',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#167FAC',
    marginHorizontal: 50,
    marginBottom: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',

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
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  topText: {
    color: '#727272',
    fontSize: 13,
    fontStyle: 'normal',
    marginBottom: 5,
    marginTop: 10,
    textTransform: 'uppercase',
  },
});

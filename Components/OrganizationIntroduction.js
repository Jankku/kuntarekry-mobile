import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
export default function OrganizationIntroduction({ navigation }) {
  const { jobs } = useJobAdvertisements();
 // filter jobs with jobAdvertisement and profitcenter
 const filteredJobs = jobs.filter(job => job.jobAdvertisement && job.jobAdvertisement.profitCenter);
 // remove duplicates
 const uniqueJobs = Array.from(new Set(filteredJobs));
 // select random job
 const randomJob = uniqueJobs[Math.floor(Math.random() * uniqueJobs.length)];
 return (
   <View>
     {randomJob ? (
       <View>
         <Text style={styles.title}>Tutustu työnantajiin</Text>
         <Text>
           Kuntarekryssä on yli 300 työnantajaa. {randomJob.jobAdvertisement.profitCenter} on yksi
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
 );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

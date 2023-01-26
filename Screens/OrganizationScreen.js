import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Chip, Button } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { API_URL } from '@env';

export default function OrganizationScreen({ route, navigation }) {
  const { jobs } = useJobAdvertisements();
  const organization = route.params?.org ?? '';
  const filteredJobs = jobs.filter((job) => job.jobAdvertisement.profitCenter === organization);
  const organizationDesc = filteredJobs[0].jobAdvertisement.organizationDesc;
  //how many jobs are there in this organization?
  const jobCount = filteredJobs.length;
  //find logo for this organization
  const logo = filteredJobs[0].jobAdvertisement.logo;

  return (
    <>
      <ScrollView>
        <Title style={styles.Title}>{organization}</Title>
        <Chip
          style={styles.Chip}
          onPress={() =>
            navigation.navigate('Jobs', { buttonJobQuery: organization, filter: 'profitCenter' })
          }
        >
          {jobCount} Avointa työpaikkaa
        </Chip>
        <View style={{ width: '100%', height: 200 }}>
          <Image source={{ uri: API_URL + logo }} style={{ width: '100%', height: '100%' }} />
        </View>
        <Text style={styles.Desc}>{organizationDesc}</Text>
        {filteredJobs.slice(0, 4).map((job, index) => {
          return (
            <View style={styles.bgColor} key={index}>
              <View style={styles.container}>
                <Button style={styles.button} icon="heart-outline"></Button>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Job', { job: job.jobAdvertisement })}
                >
                  <View>
                    <Text style={styles.text}>Sijainti</Text>
                    <Text style={styles.header}>{job.jobAdvertisement.title}</Text>
                    <Text style={styles.text2}>{job.jobAdvertisement.organization}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  Chip: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: 200,
  },
  Desc: {
    marginHorizontal: 10,
    marginLeft: 15,
  },
  Title: {
    fontSize: 24,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  bgColor: {
    backgroundColor: '#f5f5f5',
  },
  button: {
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: '80%',
  },
  header: {
    fontSize: 20,
  },
  text: {
    fontSize: 13,
  },
  text2: {
    fontSize: 14,
  },
});

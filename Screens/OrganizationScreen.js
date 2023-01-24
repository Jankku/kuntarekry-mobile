import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Chip, Button } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default function OrganizationScreen({ route, navigation }) {
  const { jobs } = useJobAdvertisements();
  const organization = route.params?.org ?? '';
  const filteredJobs = jobs.filter((job) => job.jobAdvertisement.profitCenter === organization);
  const organizationDesc = filteredJobs[0].jobAdvertisement.organizationDesc;
  //how many jobs are there in this organization?
  const jobCount = filteredJobs.length;

  return (
    <>
      <ScrollView>
        <Title style={styles.Title}>{organization}</Title>
        <Chip
          style={styles.Chip}
          onPress={() =>
            navigation.navigate('Jobs', { buttonJobQuery: organization, filter: 'organization' })
          }
        >
          {jobCount} Avointa työpaikkaa
        </Chip>
        <Text style={styles.Desc}>{organizationDesc}</Text>
        {filteredJobs.slice(0, 4).map((job, index) => {
          if (job.jobAdvertisement.title && job.jobAdvertisement.title.length > 50) {
            job.jobAdvertisement.title = job.jobAdvertisement.title.substring(0, 50) + '...';
          }
          if (job.jobAdvertisement.organization && job.jobAdvertisement.organization.length > 40) {
            job.jobAdvertisement.organization =
              job.jobAdvertisement.organization.substring(0, 40) + '...';
          }

          return (
            <View style={styles.container} key={index}>
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
  button: {
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 15,
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

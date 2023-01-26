import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Chip } from 'react-native-paper';
import { StyleSheet, View, Image } from 'react-native';
import { API_URL } from '@env';
import OrganizationJobItem from '../Components/OrganizationJobItem';

export default function OrganizationScreen({ route, navigation }) {
  const { jobs } = useJobAdvertisements();
  const organization = route.params?.org ?? '';
  const filteredJobs = jobs.filter((job) => job.jobAdvertisement.profitCenter === organization);
  const organizationDesc = filteredJobs[0].jobAdvertisement.organizationDesc;
  const jobCount = filteredJobs.length;
  //find logo for this organization
  const logo = filteredJobs[0].jobAdvertisement.logo;

  return (
    <>
      <ScrollView>
        <Title style={styles.title}>{organization}</Title>
        <Chip
          style={styles.chip}
          ellipsizeMode="tail"
          onPress={() =>
            navigation.navigate('Jobs', { buttonJobQuery: organization, filter: 'profitCenter' })
          }
        >
          {jobCount} avointa työpaikkaa
        </Chip>

        {logo ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: new URL(logo, API_URL).toString() }} style={styles.image} />
          </View>
        ) : null}

        <Text style={styles.desc}>{organizationDesc}</Text>
        <Title style={styles.jobsOpenTitle}>Avoimet työpaikkamme</Title>
        <View>
          {filteredJobs.slice(0, 4).map((job, index) => (
            <OrganizationJobItem key={index} job={job.jobAdvertisement} style={styles.jobItem} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  chip: {
    margin: 8,
    width: 200,
  },
  desc: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  image: { height: '100%', width: '100%' },
  imageContainer: { height: 200, width: '100%' },
  jobItem: { paddingBottom: 16 },
  jobsOpenTitle: { paddingBottom: 8, paddingHorizontal: 16 },
  title: {
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

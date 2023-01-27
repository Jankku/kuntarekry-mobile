import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text, Chip, Avatar } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
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
      <ScrollView style={styles.body}>
        <View style={styles.introduction}>
          <Title style={styles.title}>{organization}</Title>
          <Chip
            style={styles.chip}
            ellipsizeMode="tail"
            onPress={() =>
              navigation.navigate('Jobs', { buttonJobQuery: organization, filter: 'profitCenter' })
            }
          >
            <View style={styles.button}>
              <Text style={styles.chipText}>{jobCount} avointa työpaikkaa</Text>
              <Avatar.Icon style={styles.icon} size={30} color="#0590c7" icon="chevron-right" />
            </View>
          </Chip>
          {logo ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: new URL(logo, API_URL).toString() }} style={styles.image} />
            </View>
          ) : null}
          <Text style={styles.desc}>{organizationDesc}</Text>
        </View>
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
  body: {
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: '#a9d9eb',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    width: 190,
  },
  chipText: {
    color: '#0590c7',
  },
  desc: {
    fontSize: 18,
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  icon: {
    backgroundColor: '#a9d9eb',
  },
  image: { height: '90%', width: '90%' },
  imageContainer: { alignItems: 'center', height: 200, width: '100%' },
  introduction: {
    backgroundColor: '#f8fafc',
  },
  jobItem: { paddingBottom: 16 },
  jobsOpenTitle: { paddingHorizontal: 16, paddingVertical: 8 },
  title: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text, Chip, useTheme } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { StyleSheet, View, Image } from 'react-native';
import { API_URL } from '@env';
import OrganizationJobItem from '../Components/OrganizationJobItem';

export default function OrganizationScreen({ route, navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { jobs } = useJobAdvertisements();
  const organization = route.params?.org ?? '-';
  const filteredJobs = jobs.filter((job) => job.jobAdvertisement.profitCenter === organization);
  const jobCount = filteredJobs.length;
  //find logo for this organization
  const logo = filteredJobs?.[0]?.jobAdvertisement.logo;

  return (
    <>
      <ScrollView style={styles.body}>
        <View style={styles.introduction}>
          <Title style={styles.title}>{organization}</Title>
          <View style={styles.chipContainer}>
            <Chip
              style={styles.chip}
              ellipsizeMode="tail"
              onPress={() =>
                navigation.navigate('Jobs', {
                  buttonJobQuery: organization,
                  filter: 'profitCenter',
                })
              }
            >
              {jobCount} Avointa työpaikkaa
            </Chip>
          </View>
          {logo ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: new URL(logo, API_URL).toString() }} style={styles.image} />
            </View>
          ) : null}
          <Text style={styles.desc}>
            {filteredJobs?.[0]?.jobAdvertisement.organizationDesc ?? '-'}
          </Text>
        </View>
        <Title style={styles.jobsOpenTitle}>Avoimet työpaikkamme</Title>
        <View>
          {filteredJobs?.slice(0, 4).map((job, index) => (
            <OrganizationJobItem key={index} job={job.jobAdvertisement} style={styles.jobItem} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
const makeStyles = (theme) =>
  StyleSheet.create({
    body: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    chip: {
      backgroundColor: theme.colors.chip,
      borderRadius: 20,
      marginHorizontal: 16,
      marginVertical: 8,
    },
    chipContainer: { alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' },
    desc: {
      fontSize: 18,
      marginBottom: 16,
      marginHorizontal: 16,
      marginTop: 8,
    },
    image: { height: '90%', width: '90%' },
    imageContainer: { alignItems: 'center', height: 200, width: '100%' },
    introduction: {
      backgroundColor: theme.colors.background,
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

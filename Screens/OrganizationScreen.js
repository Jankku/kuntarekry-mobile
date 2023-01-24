import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Card, Chip } from 'react-native-paper';

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
        <Title>{organization}</Title>
        <Card>
          <Card.Content>
            <Text>{organizationDesc}</Text>
            <Chip onPress={() => navigation.navigate('Jobs', { buttonJobQuery: organization, filter: 'organization' })}>
              {jobCount} Avointa työpaikkaa
            </Chip>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}

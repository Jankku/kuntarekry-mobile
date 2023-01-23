import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Card } from 'react-native-paper';

export default function OrganizationScreen({ route, navigation }) {
  const { jobs } = useJobAdvertisements();
  const organization = route.params?.org ?? '';
  const filteredJobs = jobs.filter((job) => job.jobAdvertisement.profitCenter === organization);
  return (
    <>
      <ScrollView>
        <Title>kaikki työpaikat {organization}</Title>
        {filteredJobs.map((job, index) => (
          <Card
            key={index}
            onPress={() => navigation.navigate('Job', { job: job.jobAdvertisement })}
          >
            <Card.Content>
              <Text>{job.jobAdvertisement.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

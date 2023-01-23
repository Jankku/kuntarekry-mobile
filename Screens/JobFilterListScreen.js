import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Card } from 'react-native-paper';

export default function JobFilterListScreen({ route, navigation }) {
  const { jobs } = useJobAdvertisements();
  let filteredJobs = [];
  let headerTitle = '';

  if (route.params?.reg) {
    const region = route.params.reg;
    filteredJobs = jobs.filter((job) => job.jobAdvertisement.region === region);
    headerTitle = `kaikki työpaikat ${region}`;
  } else if (route.params?.org) {
    const organization = route.params.org;
    filteredJobs = jobs.filter((job) => job.jobAdvertisement.profitCenter === organization);
    headerTitle = `kaikki työpaikat ${organization}`;
  }

  return (
    <>
      <ScrollView>
        <Title>{headerTitle}</Title>
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

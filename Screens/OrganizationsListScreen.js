import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Card } from 'react-native-paper';

export default function OrganizationsListScreen() {
  const { jobs } = useJobAdvertisements();
  const organizations = jobs
    .filter((jobAd) => jobAd.jobAdvertisement.organizationDesc)
    .map((jobAd) => jobAd.jobAdvertisement.organization);
  const cleanedOrganizations = organizations
    .filter((org) => org) // remove elements that are undefined or null
    .map((org) => org.split(',')[0].trim());
  const uniqueOrganizations = cleanedOrganizations.filter(
    (item, index, self) => self.indexOf(item) === index
  );

  return (
    <>
      <ScrollView>
        <Title>kaikki työnantajat</Title>
        {uniqueOrganizations.map((org, index) => (
          <Card key={index}>
            <Card.Content>
              <Text>{org}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Card } from 'react-native-paper';

export default function RegionListScreen({ navigation }) {
  const { jobs } = useJobAdvertisements();
  const regions = jobs
    .filter((jobAd) => jobAd.jobAdvertisement.region)
    .map((jobAd) => jobAd.jobAdvertisement.region);
  const cleanedRegions = regions
    .filter((org) => org) // remove elements that are undefined or null
    .map((org) => org.split(',')[0].trim());
  const uniqueRegions = cleanedRegions
    .filter((item, index, self) => self.indexOf(item) === index)
    .sort();

  return (
    <>
      <ScrollView>
        <Title>kaikki maakunnat</Title>
        {uniqueRegions.map((reg, index) => (
          <Card key={index} onPress={() => navigation.navigate('Region', { reg: reg })}>
            <Card.Content>
              <Text>{reg}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

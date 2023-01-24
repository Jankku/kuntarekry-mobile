import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Card } from 'react-native-paper';

export default function JobFilterScreen({ navigation, route }) {
  const { jobs } = useJobAdvertisements();
  let list;

  if (route.params.list === 'regions') {
    list = jobs
      .filter((jobAd) => jobAd.jobAdvertisement.region)
      .map((jobAd) => jobAd.jobAdvertisement.region);
    list = list
      .filter((org) => org) // remove elements that are undefined or null
      .map((org) => org.split(',')[0].trim());
    list = list.filter((item, index, self) => self.indexOf(item) === index).sort();
  } else if (route.params.list === 'organizations') {
    list = jobs
      .filter((jobAd) => jobAd.jobAdvertisement.profitCenter)
      .map((jobAd) => jobAd.jobAdvertisement.profitCenter);
    list = list
      .filter((org) => org) // remove elements that are undefined or null
      .map((org) => org.split(',')[0].trim());
    list = list.filter((item, index, self) => self.indexOf(item) === index).sort();
  }
  return (
    <>
      <ScrollView>
        <Title>{route.params.list === 'regions' ? 'kaikki maakunnat' : 'kaikki työnantajat'}</Title>
        {list.map((item, index) => (
          <Card
            key={index}
            onPress={() => {
              if (route.params.list === 'regions') {
                navigation.navigate('Jobs', { buttonJobQuery: item, filter: 'region' });
              } else {
                navigation.navigate('Organization', { org: item });
              }
            }}
          >
            <Card.Content>
              <Text>{item}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

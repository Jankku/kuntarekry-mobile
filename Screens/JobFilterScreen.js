import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text, Card } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { colors } from '../styles/colors';

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
  } else if (route.params.list === 'locations') {
    list = jobs
      .filter((jobAd) => jobAd.jobAdvertisement.location)
      .map((jobAd) => jobAd.jobAdvertisement.location);
    list = list
      .filter((org) => org) // remove elements that are undefined or null
      .map((org) => org.split(',')[0].trim());
    list = list.filter((item, index, self) => self.indexOf(item) === index).sort();
  } else if (route.params.list === 'taskAreas') {
    list = jobs
      .filter((jobAd) => jobAd.jobAdvertisement.taskArea)
      .map((jobAd) => jobAd.jobAdvertisement.taskArea);
    list = list
      .filter((org) => org) // remove elements that are undefined or null
      .map((org) => org.split(',')[0].trim());
    list = list.filter((item, index, self) => self.indexOf(item) === index).sort();
  }
  return (
    <>
      <ScrollView>
        <Title style={styles.title}>
          {route.params.list === 'regions'
            ? 'Kaikki maakunnat'
            : route.params.list === 'organizations'
            ? 'Kaikki työnantajat'
            : route.params.list === 'taskAreas'
            ? 'Kaikki tehtäväalueet'
            : 'Kaikki kunnat'}
        </Title>
        {list.map((item, index) => (
          <View key={index} style={styles.border}>
            <Card
              style={styles.listItem}
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
                <Text style={styles.listText}>{item}</Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  border: {
    backgroundColor: colors.detail,
    borderRadius: 8,
    marginHorizontal: '2%',
    marginVertical: 2,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 2,
    padding: 0,
  },
  listText: {
    fontSize: 16,
  },
  title: {
    marginHorizontal: '2%',
  },
});

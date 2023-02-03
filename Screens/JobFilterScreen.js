import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text, Card } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { colors } from '../styles/colors';

const routeParamToField = {
  organizations: 'profitCenter',
  regions: 'region',
  locations: 'location',
  taskAreas: 'taskArea',
};

export default function JobFilterScreen({ navigation, route }) {
  const { jobs } = useJobAdvertisements();
  const list = jobs
    .filter((jobAd) => {
      let filterAttribute;
      switch (route.params.list) {
        case 'regions':
          filterAttribute = jobAd.jobAdvertisement.region;
          break;
        case 'organizations':
          filterAttribute = jobAd.jobAdvertisement.profitCenter;
          break;
        case 'locations':
          filterAttribute = jobAd.jobAdvertisement.location;
          break;
        case 'taskAreas':
          filterAttribute = jobAd.jobAdvertisement.taskArea;
          break;
        default:
          break;
      }
      return filterAttribute;
    })
    .map((jobAd) => jobAd.jobAdvertisement[routeParamToField[route.params.list]])
    .filter((org) => org) // remove elements that are undefined or null
    .map((org) => org.split(', ')[0].trim())
    .filter((item, index, self) => self.indexOf(item) === index)
    .sort();

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
                } else if (route.params.list === 'organizations') {
                  navigation.navigate('Organization', { org: item });
                } else if (route.params.list === 'locations') {
                  navigation.navigate('Jobs', { buttonJobQuery: item, filter: 'location' });
                } else if (route.params.list === 'taskAreas') {
                  navigation.navigate('Jobs', { buttonJobQuery: item, filter: 'taskArea' });
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

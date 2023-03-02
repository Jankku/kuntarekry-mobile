import { Title, Text, Divider } from 'react-native-paper';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { colors } from '../styles/colors';
import ListEmpty from '../Components/joblist/ListEmpty';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const routeParamToField = {
  organizations: 'profitCenter',
  regions: 'region',
  locations: 'location',
  taskAreas: 'taskArea',
};

export default function JobFilterScreen({ route }) {
  const { t } = useTranslation();
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
      <Title style={styles.title}>
        {route.params.list === 'regions'
          ? t('jobFilterScreen.regions')
          : route.params.list === 'organizations'
          ? t('jobFilterScreen.organizations')
          : route.params.list === 'taskAreas'
          ? t('jobFilterScreen.taskAreas')
          : t('jobFilterScreen.locations')}
      </Title>
      <FlatList
        data={list}
        ItemSeparatorComponent={<Divider />}
        ListEmptyComponent={<ListEmpty />}
        renderItem={({ item }) => <JobFilterListItem item={item} listParam={route.params.list} />}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
      />
    </>
  );
}

function JobFilterListItem({ item, listParam }) {
  const navigation = useNavigation();

  return (
    <Pressable
      android_ripple={{ borderless: false }}
      style={styles.listItem}
      onPress={() => {
        if (listParam === 'regions') {
          navigation.navigate('Jobs', { buttonJobQuery: item, filter: 'region' });
        } else if (listParam === 'organizations') {
          navigation.navigate('Organization', { org: item });
        } else if (listParam === 'locations') {
          navigation.navigate('Jobs', { buttonJobQuery: item, filter: 'location' });
        } else if (listParam === 'taskAreas') {
          navigation.navigate('Jobs', { buttonJobQuery: item, filter: 'taskArea' });
        }
      }}
    >
      <Text variant="bodyMedium">{item}</Text>
    </Pressable>
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
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  title: {
    marginHorizontal: '2%',
  },
});

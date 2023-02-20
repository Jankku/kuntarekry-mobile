import { Text, StyleSheet, View } from 'react-native';
import { useReducer, useState, useEffect } from 'react';
import { Searchbar, Chip, Button, useTheme } from 'react-native-paper';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import OrganizationIntroduction from '../Components/OrganizationIntroduction';
import ExtendedJobs from '../Components/ExtendedJobs';
import HomeScreenFooter from '../Components/HomeScreenFooter';
import { useTranslation } from 'react-i18next';
import RecommendedJobs from '../Components/home/RecommendedJobs';
import SearchButton from '../Components/home/SearchButton';
import News from '../Components/home/News';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATION_KEY, TASK_KEY } from '../hooks/usepersonalisation';
import { useJobLocations } from '../hooks/usejoblocations';
import { useJobTasks } from '../hooks/usejobtasks';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { jobs } = useJobAdvertisements();
  const jobCount = jobs.length ?? 0;
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersHidden, toggleFilters] = useReducer((prev) => !prev, true);
  const [location, setLocation] = useState(null);
  const [locationNumber, setLocationNumber] = useState(null);
  const [task, setTask] = useState(null);
  const [taskNumber, setTaskNumber] = useState(null);
  const { tasks } = useJobTasks();
  const { locations } = useJobLocations();

  useEffect(() => {
    (async () => {
      const location1 = await AsyncStorage.getItem(LOCATION_KEY);
      const taskArea1 = await AsyncStorage.getItem(TASK_KEY);
      setLocationNumber(location1);
      setTaskNumber(taskArea1);
    })();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && tasks.length > 0) {
      findLocationAndTaskName(locationNumber, taskNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, tasks, locationNumber, taskNumber]);

  const findLocationAndTaskName = (location, task) => {
    if (location !== null) {
      const foundLocation = locations.find((l) => l.id === parseInt(location));
      if (foundLocation !== undefined) {
        const locationName = foundLocation.name;
        console.log(locationName);
        if (locationName) {
          setLocation(locationName);
        }
      }
    }
    if (task !== null) {
      const foundTask = tasks.find((t) => t.id === parseInt(task));
      if (foundTask !== undefined) {
        const taskName = foundTask.name;
        console.log(taskName);
        if (taskName) {
          setTask(taskName);
        }
      }
    }
  };

  const filterChips = [
    { label: t('home.header.chips.fullTime'), query: 'Kokoaikatyö' },
    { label: t('home.header.chips.partTime'), query: 'Osa-aikatyö' },
    { label: t('home.header.chips.summerJob'), query: 'Kesätyö' },
    { label: t('home.header.chips.training'), query: 'Harjoittelu' },
  ];
  const personalizationChips = [];

  if (location) {
    personalizationChips.push({
      label: location,
      query: location,
      filter: 'location',
    });
  }
  if (task) {
    personalizationChips.push({
      label: task,
      query: task,
      filter: 'taskArea',
    });
  }
  if (location && task) {
    personalizationChips.push({
      label: `${location} & ${task}`,
      query: location,
      query2: task,
      filter: 'location',
      filter2: 'taskArea',
    });
  }

  const onJobCountPress = () => navigation.navigate('Jobs');

  const onSubmitSearch = () => navigation.navigate('Jobs', { searchQuery });

  return (
    <ScrollView>
      <LinearGradient
        colors={['#0a8bc2', '#33cc80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.0, y: 1.3 }}
        style={styles.container}
      >
        <Text style={styles.headertext}>{t('home.header.open')}</Text>
        <Text style={styles.headertext2}>{t('home.header.jobs')}</Text>
        <Text style={styles.headerCount} onPress={onJobCountPress}>
          <Text style={{ fontWeight: '700' }}>{jobCount}</Text> {t('home.header.jobsAvailable')}
        </Text>

        <View style={styles.buttonrow}>
          {personalizationChips.map((chip, index) => (
            <Chip
              key={index}
              compact
              style={styles.chipPersonalisation}
              onPress={() =>
                navigation.navigate('Jobs', {
                  buttonJobQuery: chip.query,
                  filter: chip.filter,
                  ...(chip.query2 && { buttonJobQuery2: chip.query2 }),
                  ...(chip.filter2 && { filter2: chip.filter2 }),
                })
              }
            >
              {chip.label}
            </Chip>
          ))}
        </View>
        <View style={styles.buttonrow}>
          {filterChips.map((chip) => (
            <Chip
              key={chip.query}
              compact
              style={styles.chip}
              onPress={() =>
                navigation.navigate('Jobs', { buttonJobQuery: chip.query, filter: 'employment' })
              }
            >
              {chip.label}
            </Chip>
          ))}
          <Button
            textColor="white"
            compact
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon="filter"
            style={styles.chip}
            onPress={toggleFilters}
          >
            {t('home.header.chips.moreFilters')}
          </Button>
        </View>
        {!filtersHidden ? (
          <View style={styles.buttonrow}>
            <Chip
              onPress={() => navigation.navigate('Filter', { list: 'organizations' })}
              compact
              style={styles.chip}
            >
              {t('home.header.chips.employers')}
            </Chip>
            <Chip
              onPress={() => navigation.navigate('Filter', { list: 'regions' })}
              compact
              style={styles.chip}
            >
              {t('home.header.chips.regions')}
            </Chip>
          </View>
        ) : null}
        <Searchbar
          style={styles.searchBar}
          onChangeText={setSearchQuery}
          onSubmitEditing={onSubmitSearch}
          onIconPress={onSubmitSearch}
          value={searchQuery}
          placeholder={t('home.header.searchPlaceholder')}
        />
        <SearchButton onPress={() => onSubmitSearch()} />
      </LinearGradient>

      <RecommendedJobs />

      <News />

      <OrganizationIntroduction />

      <ExtendedJobs />

      <HomeScreenFooter />
    </ScrollView>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    buttonrow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    chip: {
      backgroundColor: theme.colors.chip,
      borderRadius: 8,
      marginHorizontal: '2%',
      margin: 5,
    },
    chipPersonalisation: {
      backgroundColor: theme.colors.chip,
      borderRadius: 8,
      marginBottom: 5,
      marginHorizontal: '2%',
      marginTop: 0,
    },
    container: {
      alignItems: 'center',
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    headerCount: {
      color: 'white',
      fontSize: 20,
      fontWeight: '400',
      marginBottom: 28,
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 9,
    },
    headertext: {
      color: 'white',
      fontSize: 28,
      fontWeight: '400',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 9,
    },
    headertext2: {
      color: 'white',
      fontSize: 36,
      fontWeight: '700',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 9,
      textTransform: 'uppercase',
    },
    imageBackground: {
      height: 200,
      width: '100%',
    },
    searchBar: {
      backgroundColor: 'white',
      marginVertical: 12,
      width: '88%',
    },
  });

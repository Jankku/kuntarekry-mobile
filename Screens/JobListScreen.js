import { useMemo } from 'react';
import { Title, Chip } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useFilterJobs from '../hooks/usefilterjobs';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function JobsListScreen({ navigation, route }) {
  const searchQuery = route.params?.searchQuery ?? '';
  const buttonJobQuery = route.params?.buttonJobQuery ?? '';
  const filter = route.params?.filter ?? '';
  const { jobs } = useJobAdvertisements();
  const filteredJobs = useFilterJobs(jobs, searchQuery);
  const [userFilters, setUserFilters] = useState([]);
  const [newFilterKey, setNewFilterKey] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [newFilterValue, setNewFilterValue] = useState('');
  const [newFilterOptions, setNewFilterOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(true);

  const addFilter = (newFilter) => {
    setUserFilters([...userFilters, newFilter]);
  };

  useMemo(() => {
    if (filter) {
      setUserFilters([{ key: filter, value: buttonJobQuery }]);
    }
  }, [filter, buttonJobQuery]);

  useMemo(() => {
    if (newFilterKey) {
      const options = jobs.reduce((acc, job) => {
        const values = job.jobAdvertisement[newFilterKey]
          ? job.jobAdvertisement[newFilterKey].split(',')
          : [];
        values.forEach((value) => {
          acc.add(value.trim());
        });
        return acc;
      }, new Set());
      let filteredJobs = jobs;

      // Check for existing filters
      if (userFilters.length > 0) {
        filteredJobs = jobs.filter((j) => {
          return userFilters.every((f) => j.jobAdvertisement[f.key] === f.value);
        });
      }

      filteredJobs.forEach((j) => {
        if (j.jobAdvertisement[newFilterKey]) {
          options.add(j.jobAdvertisement[newFilterKey]);
        }
      });

      setNewFilterOptions([...options].filter((o) => !o.includes(',')));
    }
  }, [newFilterKey, jobs, userFilters]);

  const filteredSearchJobs = useMemo(
    () =>
      filteredJobs.filter((j) =>
        userFilters.every(
          (f) => j.jobAdvertisement[f.key] && j.jobAdvertisement[f.key].includes(f.value)
        )
      ),
    [filteredJobs, userFilters]
  );

  const filterKeyInUse = (key) => userFilters.some((f) => f.key === key);

  const submitFilter = (o) => {
    console.log(newFilterKey, o);
    if (newFilterKey && o) {
      addFilter({ key: newFilterKey, value: o });
    }
  };

  const deleteFilter = (index) => {
    setUserFilters(userFilters.filter((f, i) => i !== index));
  };

  return (
    <>
      <Title>
        {searchQuery
          ? `Ilmoitukset hakusanalla: ${searchQuery}`
          : buttonJobQuery
          ? `Ilmoitukset kategorialla: `
          : 'Kaikki ilmoitukset'}{' '}
      </Title>
      <View style={styles.containerFilters}>
        <ScrollView horizontal={true}>
          {userFilters.length > 0 &&
            userFilters.map((f, i) => (
              <Chip key={(f, i)} style={styles.redButton} onPress={() => deleteFilter(i)}>
                {`${f.value} X`}
              </Chip>
            ))}
        </ScrollView>
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.containerOptions}>
          {!filterKeyInUse('employment') && (
            <Chip
              style={styles.chipButton}
              title="employment"
              onPress={() => {
                setShowOptions(true);
                setNewFilterKey('employment');
              }}
            >
              <Text>Työsuhde</Text>
            </Chip>
          )}
          {!filterKeyInUse('profitCenter') && (
            <Chip
              style={styles.chipButton}
              title="profitCenter"
              onPress={() => {
                setShowOptions(true);
                setNewFilterKey('profitCenter');
              }}
            >
              <Text>Työnantaja</Text>
            </Chip>
          )}
          {!filterKeyInUse('region') && (
            <Chip
              style={styles.chipButton}
              // eslint-disable-next-line prettier/prettier
  onPress={() => {
                setShowOptions(true);
                setNewFilterKey('region');
              }}
            >
              <Text>Sijainti</Text>
            </Chip>
          )}
          {!filterKeyInUse('taskArea') && (
            <Chip
              style={styles.chipButton}
              // eslint-disable-next-line prettier/prettier
  onPress={() => {
                setShowOptions(true);
                setNewFilterKey('taskArea');
              }}
            >
              <Text>Tehtäväalueet</Text>
            </Chip>
          )}
        </ScrollView>
      </View>
      <ScrollView>
        {showOptions &&
          newFilterOptions.length > 0 &&
          newFilterOptions.map((o) => (
            <Button
              key={o}
              title={o}
              onPress={() => {
                setNewFilterValue(o);
                setShowOptions(false);
                submitFilter(o);
              }}
            />
          ))}
      </ScrollView>
      <Jobs
        navigation={navigation}
        data={userFilters.length > 0 ? filteredSearchJobs : filteredJobs}
      />
    </>
  );
}
const styles = StyleSheet.create({
  chipButton: {
    backgroundColor: 'green',
    marginHorizontal: 5,
  },
  containerFilters: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  containerOptions: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  redButton: {
    backgroundColor: 'red',
    marginHorizontal: 5,
  },
});

import { useMemo } from 'react';
import { Title } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useFilterJobs from '../hooks/usefilterjobs';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function JobsListScreen({ navigation, route }) {
  const searchQuery = route.params?.searchQuery ?? '';
  const buttonJobQuery = route.params?.buttonJobQuery ?? '';
  const filter = route.params?.filter ?? '';
  const { jobs } = useJobAdvertisements();
  const filteredJobs = useFilterJobs(jobs, searchQuery);
  const [userFilters, setUserFilters] = useState([]);
  const [newFilterKey, setNewFilterKey] = useState('');
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
      const options = new Set();
      jobs.forEach((j) => {
        if (j.jobAdvertisement[newFilterKey]) {
          options.add(j.jobAdvertisement[newFilterKey]);
        }
      });
      setNewFilterOptions([...options]);
    }
  }, [newFilterKey, jobs]);

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
        {userFilters.length > 0 && `(${userFilters.map((f) => `${f.value}`).join(', ')})`}
      </Title>
      {userFilters.length > 0 &&
        userFilters.map((f, i) => (
          <View key={(f, i)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{`${f.key}: ${f.value}`}</Text>
            <Button title="Delete" onPress={() => deleteFilter(i)} />
          </View>
        ))}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {!filterKeyInUse('employment') && (
          <Button
            title="employment"
            onPress={() => {
              setShowOptions(true);
              setNewFilterKey('employment');
            }}
          />
        )}
        {!filterKeyInUse('profitCenter') && (
          <Button
            title="profitCenter"
            onPress={() => {
              setShowOptions(true);
              setNewFilterKey('profitCenter');
            }}
          />
        )}
        {!filterKeyInUse('region') && (
          <Button
            title="region"
            // eslint-disable-next-line prettier/prettier
  onPress={() => {
              setShowOptions(true);
              setNewFilterKey('region');
            }}
          />
        )}
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

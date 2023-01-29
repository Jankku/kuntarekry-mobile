import { useMemo } from 'react';
import { Title } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useFilterJobs from '../hooks/usefilterjobs';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useState } from 'react';
import { View, Button } from 'react-native';
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          title="employment"
          onPress={() => {
            setShowOptions(true);
            setNewFilterKey('employment');
          }}
        />
        <Button
          title="profitCenter"
          onPress={() => {
            setShowOptions(true);
            setNewFilterKey('profitCenter');
          }}
        />
        <Button
          title="region"
          // eslint-disable-next-line prettier/prettier
  onPress={() => {
            setShowOptions(true);
            setNewFilterKey('region');
          }}
        />
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
              }}
            />
          ))}
      </ScrollView>
      <View>
        <Button
          title="Add filter"
          onPress={() => {
            addFilter({ key: newFilterKey, value: newFilterValue });
          }}
        />
      </View>
      <Jobs
        navigation={navigation}
        data={userFilters.length > 0 ? filteredSearchJobs : filteredJobs}
      />
    </>
  );
}

import { useMemo } from 'react';
import { Title, Text, Chip } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useFilterJobs from '../hooks/usefilterjobs';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function JobsListScreen({ route, navigation }) {
  const {
    buttonJobQuery = '',
    filter = '',
    buttonJobQuery2 = '',
    filter2 = '',
    buttonJobQuery3 = '',
    filter3 = '',
    searchQuery = '',
  } = route.params || {};
  const { jobs } = useJobAdvertisements();
  const filteredJobs = useFilterJobs(jobs, searchQuery);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');
  const [organizations, setOrganizations] = useState([]);

  const matchFilter = (job, filter, query) => {
    return job.jobAdvertisement[filter] && job.jobAdvertisement[filter].includes(query);
  };

  const filteredButtonJobs = useMemo(() => {
    return jobs.filter((j) => {
      let match = matchFilter(j, filter, buttonJobQuery);
      if (buttonJobQuery2) match &= j.jobAdvertisement[filter2] === buttonJobQuery2;
      if (buttonJobQuery3) match &= j.jobAdvertisement[filter3] === buttonJobQuery3;
      return match;
    });
  }, [filter, buttonJobQuery, jobs, filter2, buttonJobQuery2, filter3, buttonJobQuery3]);
  const selectFilter = () => {
    const filteredOptions = ['employment', 'profitCenter', 'region'].filter(
      (o) => ![filter, filter2, filter3].includes(o)
    );
    setOptions(filteredOptions);
  };

  const filterAgain = (option) => {
    setOptions([]);
    setOrganizations(
      [
        ...new Set(
          jobs
            .filter((j) => j.jobAdvertisement[option])
            .map((j) => j.jobAdvertisement[option].split(',')[0].trim())
        ),
      ].sort()
    );
  };
  const navigatetoPage = (org) => {
    setOrganizations([]);
    const params = {
      buttonJobQuery: buttonJobQuery || org,
      filter: filter || option,
      buttonJobQuery2,
      filter2,
      buttonJobQuery3,
      filter3,
      searchQuery,
    };
    const filterCount = [buttonJobQuery, buttonJobQuery2, buttonJobQuery3].filter(Boolean).length;
    const [bq, f] = [`buttonJobQuery${filterCount + 1}`, `filter${filterCount + 1}`];
    params[bq] = org;
    params[f] = option;
    navigation.navigate('Jobs', params);
  };

  const filteredSearchJobs = useMemo(() => {
    if (searchQuery && buttonJobQuery3 && filter3) {
      return filteredJobs.filter(
        (j) =>
          j.jobAdvertisement[filter2] &&
          j.jobAdvertisement[filter2].includes(buttonJobQuery2) &&
          j.jobAdvertisement[filter3] &&
          j.jobAdvertisement[filter3].includes(buttonJobQuery3)
      );
    } else if (searchQuery && buttonJobQuery2 && filter2) {
      return filteredJobs.filter(
        (j) => j.jobAdvertisement[filter2] && j.jobAdvertisement[filter2].includes(buttonJobQuery2)
      );
    } else {
      return filteredJobs;
    }
  }, [searchQuery, filteredJobs, filter2, buttonJobQuery2, filter3, buttonJobQuery3]);

  return (
    <>
      <Title>
        {searchQuery
          ? `Ilmoitukset hakusanalla: ${searchQuery} ${buttonJobQuery2} ${buttonJobQuery3}`
          : buttonJobQuery
          ? `Ilmoitukset kategorialla: ${buttonJobQuery} ${buttonJobQuery2} ${buttonJobQuery3}`
          : 'Kaikki ilmoitukset'}
      </Title>
      {options.length > 0 || organizations.length > 0 ? null : (
        <Chip onPress={() => selectFilter()}>Rajaa</Chip>
      )}
      <ScrollView style={options.length > 0 || organizations.length > 0 ? styles.container : null}>
        {options.map((option, index) => (
          <Chip
            style={styles.chip}
            key={index}
            onPress={() => {
              setOption(option);
              filterAgain(option);
            }}
          >
            <Text>{option}</Text>
          </Chip>
        ))}
        {organizations.map((org, index) => (
          <Chip
            style={styles.chip}
            key={index}
            onPress={() => {
              navigatetoPage(org);
            }}
          >
            <Text>{org}</Text>
          </Chip>
        ))}
      </ScrollView>
      <Jobs data={searchQuery ? filteredSearchJobs : buttonJobQuery ? filteredButtonJobs : jobs} />
    </>
  );
}
const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'lightgreen',
    margin: 5,
    padding: 5,
  },
  container: {
    height: 'auto',
    minHeight: 150,
  },
});

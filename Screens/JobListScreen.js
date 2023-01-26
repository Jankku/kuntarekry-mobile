import { useState } from 'react';
import { useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Title, Button, Text } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useFilterJobs from '../hooks/usefilterjobs';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';

export default function JobsListScreen({ route }) {
  const searchQuery = route.params?.searchQuery ?? '';
  const buttonJobQuery = route.params?.buttonJobQuery ?? '';
  const filter = route.params?.filter ?? '';
  const { jobs } = useJobAdvertisements();
  const filteredJobs = useFilterJobs(jobs, searchQuery);
  const [isFilteredAgain, setIsFilteredAgain] = useState(false);
  const [filter2, setFilter2] = useState('');
  const [buttonJobQuery2, setButtonJobQuery2] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const filteredButtonJobs = useMemo(() => {
    if (!isFilteredAgain) {
      return jobs.filter(
        (j) => j.jobAdvertisement[filter] && j.jobAdvertisement[filter].includes(buttonJobQuery)
      );
    } else {
      return jobs.filter(
        (j) =>
          j.jobAdvertisement[filter] &&
          j.jobAdvertisement[filter].includes(buttonJobQuery) &&
          j.jobAdvertisement[filter2] == buttonJobQuery2
      );
    }
  }, [filter, buttonJobQuery, jobs, isFilteredAgain]);

  const filteredSearchJobs = useMemo(() => {
    if (searchQuery && buttonJobQuery2 && filter2) {
      return filteredJobs.filter(
        (j) => j.jobAdvertisement[filter2] && j.jobAdvertisement[filter2].includes(buttonJobQuery2)
      );
    } else {
      return filteredJobs;
    }
  }, [searchQuery, filteredJobs, filter2, buttonJobQuery2]);

  const filterAgain = () => {
    const list = jobs
      .filter((jobAd) => jobAd.jobAdvertisement.profitCenter)
      .map((jobAd) => jobAd.jobAdvertisement.profitCenter);
    const list2 = list
      .filter((org) => org) // remove elements that are undefined or null
      .map((org) => org.split(',')[0].trim());
    const list3 = list2.filter((item, index, self) => self.indexOf(item) === index).sort();
    setOrganizations(list3);
  };

  return (
    <>
      <Title>
        {searchQuery
          ? `Ilmoitukset hakusanalla: ${searchQuery}  ${buttonJobQuery2}`
          : buttonJobQuery && buttonJobQuery2
          ? `Ilmoitukset kategorialla: ${buttonJobQuery} / ${buttonJobQuery2}`
          : buttonJobQuery
          ? `Ilmoitukset kategorialla: ${buttonJobQuery}`
          : 'Kaikki ilmoitukset'}
      </Title>
      <Title onPress={() => filterAgain()}>Rajaa</Title>
      <ScrollView>
        {organizations.map((org, index) => (
          <Button
            key={index}
            onPress={() => {
              setFilter2('profitCenter');
              setButtonJobQuery2(org);
              setIsFilteredAgain(true);
              setOrganizations([]);
            }}
          >
            <Text>{org}</Text>
          </Button>
        ))}
      </ScrollView>

      <Jobs
        data={searchQuery ? filteredSearchJobs : buttonJobQuery ? filteredButtonJobs : jobs}
      />
    </>
  );
}
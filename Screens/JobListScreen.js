import { useMemo } from 'react';
import { Title } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useJobAdvertisements from '../hooks/usejobadvertisements';

export default function JobsListScreen({ navigation, route }) {
  const searchQuery = route.params?.searchQuery ?? '';
  const buttonJobQuery = route.params?.buttonJobQuery ?? '';
  const jobs = useJobAdvertisements();

  const filteredJobs = useMemo(
    () =>
      searchQuery
        ? jobs.filter((j) =>
            j.jobAdvertisement.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
          )
        : [],
    [jobs, searchQuery]
  );
  const filteredButtonJobs = useMemo(
    () =>
      jobs.filter(
        (j) =>
          j.jobAdvertisement.employment && j.jobAdvertisement.employment.includes(buttonJobQuery)
      ),
    [buttonJobQuery, jobs]
  );

  return (
    <>
      <Title>
        {searchQuery
          ? `Ilmoitukset hakusanalla: ${searchQuery}`
          : buttonJobQuery
          ? `Ilmoitukset kategorialla: ${buttonJobQuery}`
          : 'Kaikki ilmoitukset'}
      </Title>
      <Jobs
        navigation={navigation}
        data={searchQuery ? filteredJobs : buttonJobQuery ? filteredButtonJobs : jobs}
      />
    </>
  );
}

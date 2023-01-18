import { useMemo } from 'react';
import { Title } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useJobAdvertisements from '../hooks/usejobadvertisements';

export default function JobsListScreen({ route }) {
  const searchQuery = route.params?.searchQuery ?? '';
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

  return (
    <>
      <Title>
        {searchQuery ? `Ilmoitukset hakusanalla: ${searchQuery}` : 'Kaikki ilmoitukset'}
      </Title>
      <Jobs data={searchQuery ? filteredJobs : jobs} />
    </>
  );
}

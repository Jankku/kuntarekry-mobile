import { useMemo } from 'react';
import { Title } from 'react-native-paper';
import Jobs from '../Components/Jobs';
import useFilterJobs from '../hooks/usefilterjobs';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';

export default function JobsListScreen({ route }) {
  const searchQuery = route.params?.searchQuery ?? '';
  const buttonJobQuery = route.params?.buttonJobQuery ?? '';
  const filter = route.params?.filter ?? '';
  const { jobs } = useJobAdvertisements();
  const filteredJobs = useFilterJobs(jobs, searchQuery);

  const filteredButtonJobs = useMemo(
    () =>
      jobs.filter(
        (j) => j.jobAdvertisement[filter] && j.jobAdvertisement[filter].includes(buttonJobQuery)
      ),
    [filter, buttonJobQuery, jobs]
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
      <Jobs data={searchQuery ? filteredJobs : buttonJobQuery ? filteredButtonJobs : jobs} />
    </>
  );
}

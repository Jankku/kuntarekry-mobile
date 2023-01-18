import { useEffect, useState } from 'react';
import { API_URL, API_CLIENT } from '@env';
import * as FileSystem from 'expo-file-system';

const JOBS_URI = FileSystem.cacheDirectory + 'jobs';

export default function useJobAdvertisements() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      if (jobs.length > 0) return;

      const fetchJobAdvertisements = async () => {
        const url = new URL('/portal-api/recruitment/open-jobs', API_URL);
        url.searchParams.append('client', API_CLIENT);

        const res = await fetch(url.toString());
        console.log(`Response: ${res.status}`);
        const jobsJson = await res.json();
        const jobAds = jobsJson.jobAdvertisements;
        await writeJobsToStorage(JSON.stringify(jobAds));
        setJobs(jobAds);
      };

      try {
        const storedJobs = await readJobsFromStorage();
        if (storedJobs === null) {
          await fetchJobAdvertisements();
        } else {
          setJobs(storedJobs);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return jobs;
}

async function writeJobsToStorage(string) {
  await FileSystem.writeAsStringAsync(JOBS_URI, string);
}

async function readJobsFromStorage() {
  try {
    const jobsString = await FileSystem.readAsStringAsync(JOBS_URI);
    return JSON.parse(jobsString);
  } catch (error) {
    return null;
  }
}

import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REMOVED_JOBS_KEY = 'removedJobs';

const RemovedJobsContext = createContext();

export function RemovedJobsProvider({ children }) {
  const [removedJobs, setRemovedJobs] = useState(new Set());

  useEffect(() => {
    (async () => {
      try {
        const jobs = await AsyncStorage.getItem(REMOVED_JOBS_KEY);
        if (jobs === null) return;

        const parsedJobs = new Set(JSON.parse(jobs));
        setRemovedJobs(parsedJobs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const removeJob = async (id) => {
    try {
      const item = await AsyncStorage.getItem(REMOVED_JOBS_KEY);
      if (item !== null) {
        const currentJobs = JSON.parse(item);
        const newJobs = new Set([...currentJobs, id]);
        await AsyncStorage.setItem(REMOVED_JOBS_KEY, JSON.stringify([...newJobs]));
        setRemovedJobs(newJobs);
      } else {
        await AsyncStorage.setItem(REMOVED_JOBS_KEY, JSON.stringify([id]));
        setRemovedJobs(new Set([id]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearJobs = async () => {
    try {
      await AsyncStorage.removeItem(REMOVED_JOBS_KEY);
      setRemovedJobs(new Set());
    } catch (error) {
      console.error(error);
    }
  };

  const value = { removedJobs, removeJob, clearJobs };
  return <RemovedJobsContext.Provider value={value}>{children}</RemovedJobsContext.Provider>;
}

export function useRemovedJobs() {
  const context = useContext(RemovedJobsContext);
  if (context === undefined) {
    throw new Error('RemovedJobsContext not found');
  }
  return context;
}

import Carousel from 'simple-carousel-react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../styles/colors';
import JobCarouselItem from './JobCarouselItem';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { LOCATION_KEY, TASK_KEY } from '../hooks/usepersonalisation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useJobLocations } from '../hooks/usejoblocations';
import { useJobTasks } from '../hooks/usejobtasks';

export default function JobCarousel() {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width } = useWindowDimensions();
  const { jobs } = useJobAdvertisements();
  const [carouselJobs, setCarouselJobs] = useState(
    jobs ? jobs.slice(0, 3).map((j) => j.jobAdvertisement) : []
  );
  //get location from storage
  const [location, setLocation] = useState(null);
  const [task, setTask] = useState(null);
  const { tasks } = useJobTasks();
  const { locations } = useJobLocations();

  useEffect(() => {
    (async () => {
      const location1 = await AsyncStorage.getItem(LOCATION_KEY);
      const taskArea1 = await AsyncStorage.getItem(TASK_KEY);
      setLocation(location1);
      setTask(taskArea1);
    })();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && tasks.length > 0) {
      findLocationAndTaskName(location, task);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, tasks, location, task]);

  const findLocationAndTaskName = (location, task) => {
    const locationName = location && locations.find((l) => l.id === parseInt(location))?.name;
    const taskName = task && tasks.find((t) => t.id === parseInt(task))?.name;

    const filterJobsByLocation = (jobsToFilter, locationNameToFilter) => {
      return jobsToFilter.filter(
        (j) =>
          j.jobAdvertisement &&
          j.jobAdvertisement.location &&
          j.jobAdvertisement.location.includes(locationNameToFilter.trim())
      );
    };

    const filterJobsByTask = (jobsToFilter, taskNameToFilter) => {
      return jobsToFilter.filter(
        (j) =>
          j.jobAdvertisement &&
          j.jobAdvertisement.taskArea &&
          j.jobAdvertisement.taskArea.includes(taskNameToFilter.trim())
      );
    };

    let jobsToDisplay = [];

    if (location && task) {
      let jobsFromLocationAndTask = filterJobsByLocation(jobs, locationName).filter(
        (j) =>
          j.jobAdvertisement &&
          j.jobAdvertisement.taskArea &&
          j.jobAdvertisement.taskArea.includes(taskName.trim())
      );
      if (jobsFromLocationAndTask.length > 0) {
        jobsToDisplay = jobsFromLocationAndTask;
      } else {
        let jobsFromRegionAndTask = filterJobsByLocation(jobs, locationName.split(' ')[0]).filter(
          (j) =>
            j.jobAdvertisement &&
            j.jobAdvertisement.taskArea &&
            j.jobAdvertisement.taskArea.includes(taskName.trim())
        );
        if (jobsFromRegionAndTask.length > 0) {
          jobsToDisplay = jobsFromRegionAndTask;
        } else {
          let jobsFromTask = filterJobsByTask(jobs, taskName);
          if (jobsFromTask.length > 0) {
            jobsToDisplay = jobsFromTask;
          }
        }
      }
    } else if (location) {
      let jobsFromLocation = filterJobsByLocation(jobs, locationName);
      if (jobsFromLocation.length > 0) {
        jobsToDisplay = jobsFromLocation;
      } else {
        let jobsFromRegion = filterJobsByLocation(jobs, locationName.split(' ')[0]);
        if (jobsFromRegion.length > 0) {
          jobsToDisplay = jobsFromRegion;
        }
      }
    } else if (task) {
      let jobsFromTask = filterJobsByTask(jobs, taskName);
      if (jobsFromTask.length > 0) {
        jobsToDisplay = jobsFromTask;
      }
    } else {
      jobsToDisplay = jobs;
    }

    let jobsToDisplaySlice = jobsToDisplay
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((j) => j.jobAdvertisement);

    setCarouselJobs(jobsToDisplaySlice);
  };

  return carouselJobs.length === 0 ? (
    <Text variant="titleMedium" style={styles.noJobs}>
      {t('noResults')}
    </Text>
  ) : (
    <Carousel
      backgroundColor={colors.background}
      color={colors.detailGreen}
      height={100}
      width={width}
    >
      {carouselJobs.map((job, index) => (
        <JobCarouselItem key={index} job={job} />
      ))}
    </Carousel>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    noJobs: {
      backgroundColor: theme.colors.background,
      paddingBottom: 8,
      textAlign: 'center',
    },
  });

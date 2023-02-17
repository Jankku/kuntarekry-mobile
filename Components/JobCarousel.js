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
  const getLocation = async () => {
    try {
      const value = await AsyncStorage.getItem(LOCATION_KEY);
      if (value !== null) {
        setLocation(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getTask = async () => {
    try {
      const value = await AsyncStorage.getItem(TASK_KEY);
      if (value !== null) {
        setTask(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getLocation();
    getTask();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && tasks.length > 0) {
      findLocationAndTaskName(location, task);
    }
  }, [locations, tasks]);

  const findLocationAndTaskName = (location, task) => {
    if (location && task) {
      const foundLocation = locations.find((l) => l.id === parseInt(location));
      const locationName = foundLocation.name;
      const foundTask = tasks.find((t) => t.id === parseInt(task));
      const taskName = foundTask.name;
      const jobsFromLocationAndTask = jobs.filter(
        (j) =>
          j.jobAdvertisement &&
          j.jobAdvertisement.location &&
          j.jobAdvertisement.location.includes(locationName.trim()) &&
          j.jobAdvertisement.taskArea &&
          j.jobAdvertisement.taskArea.includes(taskName.trim())
      );
      const jobsFromLocationAndTaskSlice = jobsFromLocationAndTask
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((j) => j.jobAdvertisement);
      if (jobsFromLocationAndTaskSlice.length > 0) {
        setCarouselJobs(jobsFromLocationAndTaskSlice);
      } else {
        //jobsfromRegionAndTask
        const jobsFromRegionAndTask = jobs.filter(
          (j) =>
            j.jobAdvertisement &&
            j.jobAdvertisement.location &&
            j.jobAdvertisement.location.includes(locationName.trim().split(' ')[0]) &&
            j.jobAdvertisement.taskArea &&
            j.jobAdvertisement.taskArea.includes(taskName.trim())
        );
        const jobsFromRegionAndTaskSlice = jobsFromRegionAndTask
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((j) => j.jobAdvertisement);
        if (jobsFromRegionAndTaskSlice.length > 0) {
          setCarouselJobs(jobsFromRegionAndTaskSlice);
        }
      }
    } else if (location) {
      const foundLocation = locations.find((l) => l.id === parseInt(location));
      const locationName = foundLocation.name;
      const jobsFromLocation = jobs.filter(
        (j) =>
          j.jobAdvertisement &&
          j.jobAdvertisement.location &&
          j.jobAdvertisement.location.includes(locationName.trim())
      );
      const jobsFromLocationSlice = jobsFromLocation
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((j) => j.jobAdvertisement);
      if (jobsFromLocationSlice.length > 0) {
        setCarouselJobs(jobsFromLocationSlice);
      } else {
        //jobsfromRegion
        const jobsFromRegion = jobs.filter(
          (j) =>
            j.jobAdvertisement &&
            j.jobAdvertisement.location &&
            j.jobAdvertisement.location.includes(locationName.trim().split(' ')[0])
        );
        const jobsFromRegionSlice = jobsFromRegion
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((j) => j.jobAdvertisement);
        if (jobsFromRegionSlice.length > 0) {
          setCarouselJobs(jobsFromRegionSlice);
        }
      }
    } else if (task) {
      const foundTask = tasks.find((t) => t.id === parseInt(task));
      const taskName = foundTask.name;
      const jobsFromTask = jobs.filter(
        (j) =>
          j.jobAdvertisement &&
          j.jobAdvertisement.taskArea &&
          j.jobAdvertisement.taskArea.includes(taskName.trim())
      );
      const jobsFromTaskSlice = jobsFromTask
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((j) => j.jobAdvertisement);
      if (jobsFromTaskSlice.length > 0) {
        setCarouselJobs(jobsFromTaskSlice);
      }
    } else {
      const jobsSlice = jobs
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((j) => j.jobAdvertisement);
      setCarouselJobs(jobsSlice);
    }
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

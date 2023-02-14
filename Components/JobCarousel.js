import Carousel from 'simple-carousel-react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../styles/colors';
import JobCarouselItem from './JobCarouselItem';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { LOCATION_KEY } from '../hooks/usepersonalisation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useJobLocations } from '../hooks/usejoblocations';

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
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location !== null) {
      findLocationName(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  const findLocationName = (location) => {
    const foundLocation = locations.find((l) => l.id === parseInt(location));
    const locationName = foundLocation ? foundLocation.name : null;
    const jobsFromLocation = jobs.filter((j) => j.jobAdvertisement.region === locationName);
    const jobsFromLocationSlice = jobsFromLocation
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((j) => j.jobAdvertisement);
    setCarouselJobs(jobsFromLocationSlice);
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

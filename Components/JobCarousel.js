import Carousel from 'simple-carousel-react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../styles/colors';
import JobCarouselItem from './JobCarouselItem';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function JobCarousel() {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { width } = useWindowDimensions();
  const { jobs } = useJobAdvertisements();
  const carouselJobs = jobs ? jobs.slice(0, 3).map((j) => j.jobAdvertisement) : [];

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

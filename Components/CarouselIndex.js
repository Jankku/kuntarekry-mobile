import Carousel from 'simple-carousel-react-native';
import { Text, useWindowDimensions } from 'react-native';
import { colors } from '../styles/colors';
import JobCarouselItem from './JobCarouselItem';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';

export default function CarouselIndex() {
  const { width } = useWindowDimensions();
  const { jobs } = useJobAdvertisements();
  const carouselJobs = jobs ? jobs.slice(0, 3).map((j) => j.jobAdvertisement) : [];

  return carouselJobs.length === 0 ? (
    <Text>No Jobs</Text>
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

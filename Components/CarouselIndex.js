import Carousel from 'simple-carousel-react-native';
import { Text, useWindowDimensions } from 'react-native';
import { colors } from '../styles/colors';
import JobCarouselItem from './JobCarouselItem';

export default function CarouselIndex({ carouselJobs }) {
  const { width } = useWindowDimensions();

  return carouselJobs.length === 0 ? (
    <Text>No Jobs</Text>
  ) : (
    <Carousel backgroundColor={colors.background} color="#009978" height={100} width={width}>
      {carouselJobs.map((job, index) => (
        <JobCarouselItem key={index} job={job} />
      ))}
    </Carousel>
  );
}

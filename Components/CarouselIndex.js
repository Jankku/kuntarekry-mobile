import Carousel from 'simple-carousel-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function CarouselIndex({ carouselJobs }) {
  return carouselJobs.length === 0 ? (
    <Text>No Jobs</Text>
  ) : (
    <Carousel height={'15%'}>
      {carouselJobs.map((jobs, index) => {
        return (
          <View key={index}>
            <Text style={styles.text}>{jobs.title}</Text>
            <Text>{jobs.organization}</Text>
          </View>
        );
      })}
    </Carousel>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

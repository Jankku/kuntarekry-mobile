import Carousel from 'simple-carousel-react-native';
import { View, Text, StyleSheet } from 'react-native';

function CarouselIndex({ carouselJobs }) {
  return carouselJobs > 0 ? (
    <Text>No Jobs</Text>
  ) : (
    <Carousel height={'15%'}>
      {carouselJobs.map((Jobs, index) => {
        return (
          <View key={index}>
            <Text style={styles.text}>{Jobs.title}</Text>
            <Text>{Jobs.organization}</Text>
          </View>
        );
      })}
    </Carousel>
  );
}
export default CarouselIndex;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

import Carousel from 'simple-carousel-react-native';
import { View, Text, StyleSheet } from 'react-native';

function CarouselIndex({ carouselJobs, carouselJobs2, carouselJobs3 }) {
  return (
    <Carousel height={'15%'}>
      <View>
        <Text style={styles.text}>{carouselJobs.title}</Text>
        <Text>{carouselJobs.organization}</Text>
      </View>

      <View>
        <Text style={styles.text}>{carouselJobs2.title}</Text>
        <Text>{carouselJobs.organization}</Text>
      </View>

      <View>
        <Text style={styles.text}>{carouselJobs3.title}</Text>
        <Text>{carouselJobs.organization}</Text>
      </View>
    </Carousel>
  );
}
export default CarouselIndex;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

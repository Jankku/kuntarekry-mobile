import Carousel from 'simple-carousel-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../styles/colors';

export default function CarouselIndex ({ carouselJobs }) {
  return carouselJobs.length === 0 ? (
    <Text>No Jobs</Text>
  ) : (
    <Carousel backgroundColor={colors.background} height={150}>
      {carouselJobs.map((jobs, index) => {
        return (
          <View style={styles.container} key={index}>
            <Button style={styles.button} icon='heart-outline'></Button>
            <View>
              <Text style={styles.text}>Sijainti</Text>
              <Text style={styles.header}>{jobs.title}</Text>
              <Text style={styles.text2}>{jobs.organization}</Text>
            </View>
          </View>
        );
      })}
    </Carousel>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  text: {
    fontSize: 13,
  },
  text2: {
    fontSize: 14,
  },
  header: {
    fontSize: 20,
  },
  button: {
    justifyContent: 'center',
  },
});

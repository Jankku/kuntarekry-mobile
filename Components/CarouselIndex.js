import Carousel from 'simple-carousel-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CarouselIndex({ navigation, carouselJobs }) {
  return carouselJobs.length === 0 ? (
    <Text>No Jobs</Text>
  ) : (
    <Carousel
      // eslint-disable-next-line no-undef
      onPress={() => navigation.navigate('Job', { job: jobs })}
      backgroundColor={colors.background}
      height={150}
    >
      {carouselJobs.map((jobs, index) => {
        return (
          <View style={styles.container} key={index}>
            <Button style={styles.button} icon="heart-outline"></Button>
            <TouchableOpacity onPress={() => navigation.navigate('Job', { job: jobs })}>
              <View>
                <Text style={styles.text}>Sijainti</Text>
                <Text style={styles.header}>{jobs.title}</Text>
                <Text style={styles.text2}>{jobs.organization}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </Carousel>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  header: {
    fontSize: 20,
  },
  text: {
    fontSize: 13,
  },
  text2: {
    fontSize: 14,
  },
});

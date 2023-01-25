import Carousel from 'simple-carousel-react-native';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';

export default function CarouselIndex({ navigation, carouselJobs }) {
  const { width } = useWindowDimensions();

  return carouselJobs.length === 0 ? (
    <Text>No Jobs</Text>
  ) : (
    <Carousel backgroundColor={colors.background} color="#009978" height={100} width={width}>
      {carouselJobs.map((job, index) => {
        return (
          <View style={styles.container} key={index}>
            <Button style={styles.button} icon="heart-outline"></Button>
            <TouchableOpacity onPress={() => navigation.navigate('Job', { job: job })}>
              <View>
                <Text style={styles.text}>{job.profitCenter}</Text>
                <Text style={styles.header}>{job.title}</Text>
                <Text style={styles.text2}>
                  Hakuaika päättyy {dayjs(job.publicationEnds).format('l LT')}
                </Text>
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
    paddingHorizontal: 8,
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

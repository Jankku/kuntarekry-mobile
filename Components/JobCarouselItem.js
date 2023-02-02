import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FavoriteButton from './FavoriteButton';
import { colors } from '../styles/colors';

export default function JobCarouselItem({ job, style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Job', { job: job })}>
      <View style={{ ...styles.itemContainer, ...style }}>
        <FavoriteButton
          jobId={job.id}
          size={20}
          buttonStyle={styles.button}
          buttonColor={colors.detailGreen}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{job?.profitCenter}</Text>
          <Text style={styles.title}>{job?.title}</Text>
          <Text style={styles.text}>
            Hakuaika päättyy {dayjs(job?.publicationEnds).format('l LT')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },
  contentContainer: { flexShrink: 1 },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 14,
  },
  title: {
    fontSize: 20,
  },
});

import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function JobCarouselItem({ job, style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Job', { job: job })}>
      <View style={{ ...styles.itemContainer, ...style }}>
        <Button style={styles.button} icon="heart-outline"></Button>
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
    justifyContent: 'center',
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

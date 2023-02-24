import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';
import FavoriteButton from './FavoriteButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function OrganizationJobItem({ job, link, publication, style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Job', { job: job, link: link, publication: publication })}
    >
      <View style={{ ...styles.itemContainer, ...style }}>
        <FavoriteButton
          job={job}
          size={24}
          buttonStyle={styles.button}
          buttonColor={colors.detailGreen}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{job?.title}</Text>
          <Text style={styles.text}>
            Hakuaika päättyy{'  '}
            <Text style={styles.dateText}>
              <Icon name="calendar" size={14} /> {dayjs(job.publicationEnds).format('l')}{' '}
              <Icon name="clock" size={14} /> {dayjs(job.publicationEnds).format('LT')}{' '}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#f8fafc',
    marginRight: 10,
  },
  contentContainer: { flexShrink: 1 },
  dateText: {
    color: colors.detail,
    fontSize: 14,
  },
  icon: {
    backgroundColor: 'transparent',
    height: 20,
    justifyContent: 'flex-end',
    marginBottom: 1,
    width: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  text: {
    color: '#8795a1',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
  },
});

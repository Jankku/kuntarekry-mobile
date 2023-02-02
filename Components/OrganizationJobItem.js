import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { colors } from '../styles/colors';
import FavoriteButton from './FavoriteButton';

export default function OrganizationJobItem({ job, style }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Job', { job: job })}>
      <View style={{ ...styles.itemContainer, ...style }}>
        <FavoriteButton
          jobId={job.id}
          size={24}
          buttonStyle={styles.button}
          buttonColor={colors.detailGreen}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{job?.title}</Text>
          <View style={styles.date}>
            <Text style={styles.text}>Hakuaika päättyy </Text>
            <Avatar.Icon style={styles.icon} size={24} color={colors.detail} icon="calendar" />
            <Text style={styles.dateText}>{dayjs(job?.publicationEnds).format('l LT')}</Text>
          </View>
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
  date: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
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

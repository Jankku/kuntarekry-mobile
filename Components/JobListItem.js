import { Card } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import FavoriteButton from './FavoriteButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

export default function JobListItem({ job }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Card style={styles.border} onPress={() => navigation.navigate('Job', { job: job })}>
      <Card.Content>
        <View style={styles.container}>
          <FavoriteButton
            job={job}
            size={24}
            buttonStyle={styles.button}
            buttonColor={colors.detailGreen}
          />
          <View>
            <Text style={styles.itemText}>{job.organization}</Text>
            <Text style={styles.itemHeaderText}>{job.title}</Text>
            <Text style={styles.itemText}>
              {t('jobItem.publicationEnds')}{' '}
              <Text style={styles.dateText}>
                <Icon name="calendar" size={14} /> {dayjs(job.publicationEnds).format('l')}{' '}
                <Icon name="clock" size={14} /> {dayjs(job.publicationEnds).format('LT')}{' '}
              </Text>
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  border: {
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 1,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#f8fafc',
    marginLeft: 0,
    marginRight: 20,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    width: '80%',
  },
  dateText: {
    color: colors.detail,
  },
  itemHeaderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemText: {
    color: '#8795a1',
    fontSize: 14,
    paddingVertical: 2,
  },
});

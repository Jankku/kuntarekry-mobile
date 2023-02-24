import { Text } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import FavoriteButton from '../FavoriteButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

export default function JobListItem({ job, publication, link }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Pressable
      android_ripple={{ borderless: false }}
      style={styles.container}
      onPress={() => navigation.navigate('Job', { job, publication, link })}
    >
      <FavoriteButton
        job={job}
        publication={publication}
        link={link}
        size={24}
        buttonStyle={styles.button}
        buttonColor={colors.detailGreen}
      />
      <View style={{ flex: 1, flexWrap: 'nowrap' }}>
        <Text variant="bodySmall">{job.organization}</Text>
        <Text variant="titleMedium">{job.title}</Text>
        <Text variant="bodyMedium">
          {t('jobItem.publicationEnds')}{' '}
          <Text style={styles.dateText}>
            <Icon name="calendar" size={14} /> {dayjs(job.publicationEnds).format('l')}{' '}
            <Icon name="clock" size={14} /> {dayjs(job.publicationEnds).format('LT')}{' '}
          </Text>
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginLeft: 0,
    marginRight: 16,
  },
  card: {
    border: 'none',
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  dateText: {
    color: colors.detail,
  },
  organization: {
    flexWrap: 'wrap',
  },
});

import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FavoriteButton from './FavoriteButton';
import { colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

export default function JobCarouselItem({ job, style, link, publication }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Job', { job: job, publication: publication, link: link })}
    >
      <View style={{ ...styles.itemContainer, ...style }}>
        <FavoriteButton
          job={job}
          publication={publication}
          link={link}
          size={24}
          buttonStyle={styles.button}
          buttonColor={colors.detailGreen}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{job?.profitCenter}</Text>
          <Text style={styles.title}>{job?.title}</Text>
          <Text style={styles.text}>
            {t('jobItem.publicationEnds')}{' '}
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
  },
  contentContainer: { flexShrink: 1 },
  dateText: {
    color: colors.detail,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  text: {
    color: '#8795a1',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
  },
});

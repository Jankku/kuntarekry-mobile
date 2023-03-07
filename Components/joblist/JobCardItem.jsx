import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { updateStoredList, useFavoriteList } from '../../hooks/usefavoritelist';
import { colors } from '../../styles/colors';
import { useRemovedJobs } from '../../hooks/useremovedjobs';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useReducer } from 'react';

export default function JobCardItem({ animationValue, jobItem }) {
  const { removeJob } = useRemovedJobs();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [showFullDescription, toggleDescription] = useReducer((prev) => !prev, false);
  const job = jobItem.jobAdvertisement;

  const onRemoveJob = () => removeJob(job.id);

  const onNavigateDetails = () => navigation.navigate('Job', { job });

  const maskStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(animationValue.value, [-1, 0, 1], [300, 0, -300]);

    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['transparent', 'transparent', 'rgba(0,0,0,0.1)']
    );

    return {
      backgroundColor,
      zIndex,
      height: '100%',
    };
  }, [animationValue]);

  return (
    <Card mode="elevated" style={styles.card}>
      <Animated.View style={maskStyle}>
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} variant="bodyMedium">
              {job.profitCenter}
            </Text>
            <Text numberOfLines={2} variant="titleLarge" style={{ paddingBottom: 8 }}>
              {job.title}
            </Text>
            <Text variant="bodyMedium">
              {t('jobItem.publicationEnds')}{' '}
              <Text style={styles.dateText}>
                <Icon name="calendar" size={14} /> {dayjs(job.publicationEnds).format('l')}{' '}
                <Icon name="clock" size={14} /> {dayjs(job.publicationEnds).format('LT')}{' '}
              </Text>
            </Text>
          </View>

          <Text
            variant="bodyMedium"
            numberOfLines={showFullDescription ? undefined : 10}
            onPress={toggleDescription}
            style={styles.description}
          >
            {job.jobDesc}
          </Text>

          <View style={styles.actionContainer}>
            <Button
              compact
              mode="outlined"
              icon="cancel"
              style={styles.button}
              onPress={onRemoveJob}
            >
              {t('remove', { ns: 'common' })}
            </Button>

            <FavoriteButton jobItem={jobItem} />

            <Button
              compact
              mode="outlined"
              icon="arrow-right"
              contentStyle={styles.detailButton}
              onPress={onNavigateDetails}
            >
              {t('details', { ns: 'common' })}
            </Button>
          </View>
        </ScrollView>
      </Animated.View>
    </Card>
  );
}

function FavoriteButton({ jobItem }) {
  const { t } = useTranslation();
  const { favorites, updateFavorites } = useFavoriteList();

  const handlePress = async () => {
    await updateStoredList('job', jobItem.jobAdvertisement, jobItem.publication, jobItem.link);
    updateFavorites();
  };

  const isFavorite =
    jobItem.jobAdvertisement !== null
      ? favorites.jobs.some((fav) => fav.id === jobItem.jobAdvertisement.id)
      : false;

  return (
    <Button
      compact
      mode="outlined"
      icon={isFavorite ? 'heart' : 'heart-outline'}
      style={styles.button}
      onPress={handlePress}
    >
      {t('like', { ns: 'common' })}
    </Button>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    overflow: 'scroll',
  },
  animatedView: { height: '100%', position: 'absolute', width: '100%' },
  button: { marginRight: 16 },
  card: { backgroundColor: 'white', height: '80%' },
  dateText: { color: colors.detail },
  description: { flexGrow: 2, paddingHorizontal: 16 },
  detailButton: { alignContent: 'center', flexDirection: 'row-reverse' },
  scrollViewContent: { overflow: 'scroll', paddingTop: 24 },
  titleContainer: { alignItems: 'center', paddingBottom: 16 },
});

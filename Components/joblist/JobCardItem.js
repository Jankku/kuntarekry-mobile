import { IconButton, Paragraph, Text } from 'react-native-paper';
import {
  ImageBackground,
  StyleSheet,
  View,
  Animated,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import FavoriteButton from '../FavoriteButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import KuntarekryPng from '../../assets/Kuntarekry.png';

export default function JobCardItem({ job, publication, link }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const [isHidden, setIsHidden] = useState(true);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(height));
  const subViewRef = useRef(null);

  const toggleSubview = () => {
    setIsHidden(!isHidden);
    const toValue = isHidden ? 0 : 100;
    Animated.spring(bounceValue, {
      useNativeDriver: true,
      toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();
  };

  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.imageContainer}
        imageStyle={styles.image}
        source={KuntarekryPng}
      >
        <View style={styles.bottomContainer}>
          <Pressable onPress={toggleSubview} android_ripple={{ color: 'white', borderless: true }}>
            <Icon size={28} name="chevron-up" style={styles.chevronUp} />
            <Text style={styles.title} variant="titleMedium">
              {job.title}
            </Text>
            <Text style={styles.title} variant="bodyMedium">
              {job.profitCenter}
            </Text>
            <Text style={styles.title} variant="bodyMedium">
              {job.location}, {job.region}
            </Text>
          </Pressable>
        </View>
        <Animated.View
          style={[
            styles.subView,
            {
              transform: [{ translateY: bounceValue }],
              opacity: bounceValue.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
            },
          ]}
          ref={subViewRef}
        >
          <Pressable onPress={toggleSubview}>
            <Paragraph style={styles.desc}>{job.jobDesc}</Paragraph>
          </Pressable>
        </Animated.View>
      </ImageBackground>
      <View style={styles.iconsRow}>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text variant="bodySmall">
            {t('jobItem.publicationEnds')}{' '}
            <Text style={styles.dateText}>
              <Icon name="calendar" size={14} /> {dayjs(job.publicationEnds).format('l')}{' '}
              <Icon name="clock" size={14} /> {dayjs(job.publicationEnds).format('LT')}{' '}
            </Text>
          </Text>
        </View>
        <FavoriteButton
          job={job}
          publication={publication}
          link={link}
          size={32}
          buttonStyle={styles.iconButton}
          buttonColor={colors.detailGreen}
        />
        <IconButton
          style={styles.iconButton}
          icon="chevron-right"
          iconColor={colors.detail}
          size={32}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 3,
    flex: 1,
    marginBottom: 32,
    marginHorizontal: 8,
    marginTop: 2,
  },
  chevronUp: {
    alignSelf: 'center',
    color: 'white',
  },
  dateText: {
    color: colors.detail,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  organization: {
    flexWrap: 'wrap',
  },
  title: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    marginHorizontal: 16,
  },
  bottomContainer: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  iconsRow: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 5,
    zIndex: 100,
  },
  desc: {
    color: 'white',
    margin: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flex: 1,
  },
  subView: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
  },
});

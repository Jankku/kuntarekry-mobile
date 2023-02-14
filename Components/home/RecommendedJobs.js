import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import JobCarousel from '../JobCarousel';
import kuvaPng from '../../assets/Rectangle90.png';
import PrimaryButton from '../PrimaryButton';
import { useTranslation } from 'react-i18next';

export default function RecommendedJobs() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <>
      <View style={styles.titleContainer}>
        <Text variant="titleLarge">{t('home.recommendedJobs.title')}</Text>
      </View>
      <JobCarousel />
      <ImageBackground source={kuvaPng} style={styles.imageBackground}>
        <View style={styles.centerText}>
          <ImageBackground style={styles.cardContainer}>
            <Text variant="titleLarge">{t('home.recommendedJobs.openApplication')}</Text>
            <Text variant="bodyLarge" style={styles.cardText}>
              {t('home.recommendedJobs.openApplicationText')}
            </Text>
            <PrimaryButton>{t('home.recommendedJobs.openApplication')}</PrimaryButton>
          </ImageBackground>

          <ImageBackground style={styles.cardContainer}>
            <Text variant="titleLarge">{t('home.recommendedJobs.substitutions')}</Text>
            <Text variant="bodyLarge" style={styles.cardText}>
              {t('home.recommendedJobs.substitutionsText')}
            </Text>
            <PrimaryButton>{t('home.recommendedJobs.substitutions')}</PrimaryButton>
          </ImageBackground>
        </View>
      </ImageBackground>
    </>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      marginVertical: 16,
      padding: 16,
      width: '80%',
    },
    cardText: {
      paddingBottom: 16,
      paddingTop: 8,
    },
    centerText: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    imageBackground: {
      backgroundColor: theme.colors.background,
      height: 450,
      marginTop: 8,
      width: '100%',
    },
    titleContainer: {
      backgroundColor: theme.colors.background,
      padding: 16,
    },
  });

import { StyleSheet, View, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Chip, Text, useTheme } from 'react-native-paper';

export default function News() {
  const { t } = useTranslation(['translations', 'common']);
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        {t('home.news.title')}
      </Text>
      <ImageBackground
        source={{ uri: 'https://reactjs.org/logo-og.png' }}
        style={styles.imageBackground}
      ></ImageBackground>
      <Text variant="titleMedium">Profiili kesäkuntoon</Text>
      <Text style={styles.description}>
        Kesä ja helteet ovat löytäneet Suomen. Siksi voi olla vaikeaa asennoitua vaikkapa
        työnhakuun...
      </Text>
      <View style={styles.chipContainer}>
        <Chip style={styles.chip}>{t('home.news.chips.now')}</Chip>
        <Chip style={styles.chip}>{t('home.news.chips.events')}</Chip>
      </View>
      <View style={styles.chipContainer}>
        <Chip style={styles.chip}>{t('home.news.chips.workLife')}</Chip>
        <Chip style={styles.chip}>{t('home.news.chips.lookingForWork')}</Chip>
      </View>
      <View style={styles.chipContainer}>
        <Chip style={styles.chip}>{t('showAll', { ns: 'common' })}</Chip>
      </View>
    </View>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    chip: {
      backgroundColor: theme.colors.chip,
      borderRadius: 8,
      marginHorizontal: '2%',
      margin: 5,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#EEFAFF',
      padding: 12,
    },
    description: {
      paddingVertical: 8,
    },
    imageBackground: {
      height: 200,
      width: '100%',
    },
    title: { paddingBottom: 16 },
  });

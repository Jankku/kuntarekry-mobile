import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function SearchButton({ onPress }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Button
      textColor="white"
      labelStyle={styles.labelStyle}
      style={styles.searchButton}
      onPress={onPress}
    >
      {t('home.header.searchButton')}
    </Button>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    labelStyle: { textTransform: 'uppercase' },
    searchButton: {
      backgroundColor: theme.colors.chip,
      borderRadius: 8,
      height: 52,
      justifyContent: 'center',
      width: '88%',
    },
  });
